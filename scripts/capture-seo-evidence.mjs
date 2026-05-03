#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FRONTEND_URL = (
  process.env.FRONTEND_URL ?? "https://harmony-dun-omega.vercel.app"
).replace(/\/$/, "");
const BACKEND_URL = (
  process.env.BACKEND_URL ?? "https://harmony-production-13e3.up.railway.app"
).replace(/\/$/, "");
const OUT_DIR = process.env.OUT_DIR ?? "docs/submission/seo-evidence";

const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function extractFirst(html, regex) {
  return html.match(regex)?.[1]?.trim() ?? null;
}

function extractMeta(html, attr, value) {
  const nameFirst = new RegExp(
    `<meta[^>]+${attr}=["']${value}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const contentFirst = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${value}["'][^>]*>`,
    "i",
  );
  return extractFirst(html, nameFirst) ?? extractFirst(html, contentFirst);
}

function extractJsonLd(html) {
  const matches = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  return matches.map((match) => {
    const raw = match[1].trim();
    try {
      return { validJson: true, value: JSON.parse(raw), raw };
    } catch (error) {
      return { validJson: false, error: String(error), raw };
    }
  });
}

async function fetchText(url, init = {}) {
  const res = await fetch(url, init);
  const text = await res.text();
  return {
    url,
    status: res.status,
    ok: res.ok,
    headers: Object.fromEntries(res.headers.entries()),
    text,
    sha256: sha256(text),
  };
}

async function fetchJson(url, init = {}) {
  const response = await fetchText(url, init);
  let json = null;
  let jsonParseError = null;
  try {
    json = JSON.parse(response.text);
  } catch (error) {
    jsonParseError = String(error);
  }
  return { ...response, json, jsonParseError };
}

async function main() {
  const dirs = [
    "crawler-html",
    "api-responses",
    "headers",
    "sitemaps",
    "structured-data",
  ].map((subdir) => path.join(OUT_DIR, subdir));
  await Promise.all(dirs.map((dir) => mkdir(dir, { recursive: true })));

  const generatedAt = new Date().toISOString();
  const serversResponse = await fetchJson(`${BACKEND_URL}/api/public/servers`);
  const servers = Array.isArray(serversResponse.json)
    ? serversResponse.json
    : [];
  const serverFixtures = [];

  for (const server of servers) {
    if (!server?.slug) continue;
    const channelsResponse = await fetchJson(
      `${BACKEND_URL}/api/public/servers/${server.slug}/channels`,
    );
    const channels = Array.isArray(channelsResponse.json?.channels)
      ? channelsResponse.json.channels
      : [];
    const publicChannels = channels
      .filter(
        (channel) =>
          typeof channel?.slug === "string" && channel.slug.length > 0,
      )
      .slice(0, 3);
    if (publicChannels.length > 0) {
      serverFixtures.push({
        id: server.id,
        slug: server.slug,
        name: server.name,
        publicChannels,
        channelsResponse: {
          status: channelsResponse.status,
          headers: channelsResponse.headers,
          sha256: channelsResponse.sha256,
        },
      });
    }
  }

  if (serverFixtures.length === 0) {
    throw new Error(
      "No public server/channel fixture found via production public API",
    );
  }

  const primaryServer = serverFixtures.reduce((best, candidate) =>
    candidate.publicChannels.length > best.publicChannels.length
      ? candidate
      : best,
  );
  const crawlerTargets = [];
  for (const fixture of [
    primaryServer,
    ...serverFixtures.filter((s) => s.slug !== primaryServer.slug),
  ]) {
    for (const channel of fixture.publicChannels) {
      if (crawlerTargets.length >= 3) break;
      crawlerTargets.push({
        serverSlug: fixture.slug,
        channelSlug: channel.slug,
        channelName: channel.name,
      });
    }
    if (crawlerTargets.length >= 3) break;
  }

  const healthSamples = [];
  for (let i = 0; i < 20; i += 1) {
    const sample = await fetchJson(`${BACKEND_URL}/health`);
    healthSamples.push({
      sample: i + 1,
      status: sample.status,
      xInstanceId: sample.headers["x-instance-id"] ?? null,
      bodyInstanceId: sample.json?.instanceId ?? null,
      body: sample.json,
    });
  }

  const metaReplicaSamples = [];
  const primaryChannel = primaryServer.publicChannels[0];
  const metaUrl = `${BACKEND_URL}/api/public/servers/${primaryServer.slug}/channels/${primaryChannel.slug}/meta-tags`;
  for (let i = 0; i < 20; i += 1) {
    const sample = await fetchJson(metaUrl);
    metaReplicaSamples.push({
      sample: i + 1,
      status: sample.status,
      xInstanceId: sample.headers["x-instance-id"] ?? null,
      bodySha256: sample.sha256,
      body: sample.json,
    });
  }

  const crawlerCaptures = [];
  for (const target of crawlerTargets) {
    const slug = `${target.serverSlug}__${target.channelSlug}`;
    const pageUrl = `${FRONTEND_URL}/c/${target.serverSlug}/${target.channelSlug}`;
    const capture = await fetchText(pageUrl, {
      headers: { "User-Agent": GOOGLEBOT_UA },
    });
    await writeFile(
      path.join(OUT_DIR, "crawler-html", `${slug}.html`),
      capture.text,
    );
    const jsonLd = extractJsonLd(capture.text);
    await writeFile(
      path.join(OUT_DIR, "structured-data", `${slug}.json`),
      JSON.stringify(
        {
          url: pageUrl,
          status: capture.status,
          validJsonLdBlocks: jsonLd.filter((block) => block.validJson).length,
          invalidJsonLdBlocks: jsonLd.filter((block) => !block.validJson)
            .length,
          blocks: jsonLd,
        },
        null,
        2,
      ),
    );
    crawlerCaptures.push({
      ...target,
      url: pageUrl,
      status: capture.status,
      htmlFile: `crawler-html/${slug}.html`,
      htmlSha256: capture.sha256,
      title: extractFirst(capture.text, /<title[^>]*>([^<]*)<\/title>/i),
      description: extractMeta(capture.text, "name", "description"),
      robots: extractMeta(capture.text, "name", "robots"),
      canonical: extractFirst(
        capture.text,
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i,
      ),
      jsonLdFile: `structured-data/${slug}.json`,
      jsonLdValidBlocks: jsonLd.filter((block) => block.validJson).length,
      jsonLdTypes: jsonLd
        .filter((block) => block.validJson)
        .map((block) => block.value?.["@type"] ?? null),
    });
  }

  const robots = await fetchText(`${FRONTEND_URL}/robots.txt`);
  const sitemap = await fetchText(`${FRONTEND_URL}/sitemap.xml`);
  const frontendServerSitemap = await fetchText(
    `${FRONTEND_URL}/sitemap/${primaryServer.slug}.xml`,
  );
  const backendSitemap = await fetchText(
    `${BACKEND_URL}/sitemap/${primaryServer.slug}.xml`,
  );
  await writeFile(
    path.join(OUT_DIR, "sitemaps", "frontend-robots.txt"),
    robots.text,
  );
  await writeFile(
    path.join(OUT_DIR, "sitemaps", "frontend-sitemap.xml"),
    sitemap.text,
  );
  await writeFile(
    path.join(
      OUT_DIR,
      "sitemaps",
      `${primaryServer.slug}-frontend-sitemap.xml`,
    ),
    frontendServerSitemap.text,
  );
  await writeFile(
    path.join(OUT_DIR, "sitemaps", `${primaryServer.slug}-backend-sitemap.xml`),
    backendSitemap.text,
  );

  await writeFile(
    path.join(OUT_DIR, "headers", "health-replica-samples.json"),
    JSON.stringify(
      {
        generatedAt,
        backendUrl: BACKEND_URL,
        distinctHeaderInstanceIds: [
          ...new Set(healthSamples.map((s) => s.xInstanceId).filter(Boolean)),
        ],
        distinctBodyInstanceIds: [
          ...new Set(
            healthSamples.map((s) => s.bodyInstanceId).filter(Boolean),
          ),
        ],
        samples: healthSamples,
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.join(OUT_DIR, "api-responses", "meta-tags-replica-samples.json"),
    JSON.stringify(
      {
        generatedAt,
        url: metaUrl,
        distinctHeaderInstanceIds: [
          ...new Set(
            metaReplicaSamples.map((s) => s.xInstanceId).filter(Boolean),
          ),
        ],
        distinctBodyHashes: [
          ...new Set(
            metaReplicaSamples.map((s) => s.bodySha256).filter(Boolean),
          ),
        ],
        samples: metaReplicaSamples,
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.join(OUT_DIR, "api-responses", "public-fixture-discovery.json"),
    JSON.stringify(
      {
        generatedAt,
        frontendUrl: FRONTEND_URL,
        backendUrl: BACKEND_URL,
        serversResponse: {
          status: serversResponse.status,
          headers: serversResponse.headers,
          sha256: serversResponse.sha256,
        },
        discoveredServerCount: serverFixtures.length,
        selectedPrimaryServer: {
          id: primaryServer.id,
          slug: primaryServer.slug,
          name: primaryServer.name,
          publicChannels: primaryServer.publicChannels,
        },
        crawlerTargets,
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.join(OUT_DIR, "api-responses", "sitemap-robots-captures.json"),
    JSON.stringify(
      {
        generatedAt,
        robots: {
          url: robots.url,
          status: robots.status,
          headers: robots.headers,
          sha256: robots.sha256,
          file: "sitemaps/frontend-robots.txt",
        },
        frontendSitemap: {
          url: sitemap.url,
          status: sitemap.status,
          headers: sitemap.headers,
          sha256: sitemap.sha256,
          file: "sitemaps/frontend-sitemap.xml",
          containsServerSitemap: sitemap.text.includes(
            `/sitemap/${primaryServer.slug}.xml`,
          ),
        },
        frontendServerSitemap: {
          url: frontendServerSitemap.url,
          status: frontendServerSitemap.status,
          headers: frontendServerSitemap.headers,
          sha256: frontendServerSitemap.sha256,
          file: `sitemaps/${primaryServer.slug}-frontend-sitemap.xml`,
          containsPrimaryChannel: frontendServerSitemap.text.includes(
            `/c/${primaryServer.slug}/${primaryChannel.slug}`,
          ),
        },
        backendSitemap: {
          url: backendSitemap.url,
          status: backendSitemap.status,
          headers: backendSitemap.headers,
          sha256: backendSitemap.sha256,
          file: `sitemaps/${primaryServer.slug}-backend-sitemap.xml`,
          containsPrimaryChannel: backendSitemap.text.includes(
            `/c/${primaryServer.slug}/${primaryChannel.slug}`,
          ),
        },
      },
      null,
      2,
    ),
  );

  const summary = {
    generatedAt,
    frontendUrl: FRONTEND_URL,
    backendUrl: BACKEND_URL,
    primaryServer: {
      id: primaryServer.id,
      slug: primaryServer.slug,
      name: primaryServer.name,
    },
    crawlerCaptures,
    healthReplicaEvidence: {
      samples: healthSamples.length,
      distinctHeaderInstanceIds: [
        ...new Set(healthSamples.map((s) => s.xInstanceId).filter(Boolean)),
      ],
      distinctBodyInstanceIds: [
        ...new Set(healthSamples.map((s) => s.bodyInstanceId).filter(Boolean)),
      ],
    },
    metaTagReplicaEvidence: {
      samples: metaReplicaSamples.length,
      distinctHeaderInstanceIds: [
        ...new Set(
          metaReplicaSamples.map((s) => s.xInstanceId).filter(Boolean),
        ),
      ],
      distinctBodyHashes: [
        ...new Set(metaReplicaSamples.map((s) => s.bodySha256).filter(Boolean)),
      ],
    },
    sitemapEvidence: {
      frontendRobotsStatus: robots.status,
      frontendSitemapStatus: sitemap.status,
      frontendServerSitemapStatus: frontendServerSitemap.status,
      backendSitemapStatus: backendSitemap.status,
      frontendSitemapContainsServerSitemap: sitemap.text.includes(
        `/sitemap/${primaryServer.slug}.xml`,
      ),
      frontendServerSitemapContainsPrimaryChannel:
        frontendServerSitemap.text.includes(
          `/c/${primaryServer.slug}/${primaryChannel.slug}`,
        ),
      backendSitemapContainsPrimaryChannel: backendSitemap.text.includes(
        `/c/${primaryServer.slug}/${primaryChannel.slug}`,
      ),
    },
    stagingWritePath: {
      status: "not-run",
      reason:
        "Issue #360 documented that no isolated Sprint 5 staging environment was provisioned; write-path ACs fall back to local-only evidence per docs/deployment/deployment-architecture.md §12.2.",
    },
    richResults: {
      status: "not-run-automated",
      reason:
        "Google Rich Results Test requires an external interactive validator run. This bundle includes raw crawler HTML and machine-validated JSON-LD captures for each target.",
    },
  };

  await writeFile(
    path.join(OUT_DIR, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
