interface RouteContext {
  params: Promise<{ serverSlug: string }>;
}

/**
 * Legacy sitemap URLs without the `.xml` suffix redirect to the canonical
 * route so existing links keep working while crawlers converge on one shape.
 */
export async function GET(request: Request, context: RouteContext) {
  const { serverSlug } = await context.params;
  const redirectUrl = new URL(`/sitemap/${encodeURIComponent(serverSlug)}.xml`, request.url);
  return new Response(null, {
    status: 308,
    headers: { Location: redirectUrl.toString() },
  });
}
