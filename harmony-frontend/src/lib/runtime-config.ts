const LOCAL_FRONTEND_URL = 'http://localhost:3000';
const LOCAL_API_URL = 'http://localhost:4000';

function trimTrailingSlashes(value: string): string {
  let trimmed = value;

  while (trimmed.endsWith('/') && trimmed.length > 1) {
    trimmed = trimmed.slice(0, -1);
  }

  return trimmed;
}

function normalizeBaseUrl(value: string | undefined, fallback: string, envVarName: string): string {
  const configuredValue = value?.trim();
  const candidate = configuredValue || fallback;

  try {
    const url = new URL(candidate);
    url.pathname = trimTrailingSlashes(url.pathname);
    url.search = '';
    url.hash = '';
    return trimTrailingSlashes(url.toString());
  } catch {
    if (configuredValue) {
      throw new Error(
        `Invalid ${envVarName} value "${configuredValue}". Expected an absolute URL including scheme, for example https://harmony.chat.`,
      );
    }

    return fallback;
  }
}

export function getPublicBaseUrl(): string {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_BASE_URL,
    LOCAL_FRONTEND_URL,
    'NEXT_PUBLIC_BASE_URL',
  );
}

export function getApiBaseUrl(): string {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL, LOCAL_API_URL, 'NEXT_PUBLIC_API_URL');
}

export function getPublicMetadataBase(): URL {
  return new URL(`${getPublicBaseUrl()}/`);
}

export function getChannelUrl(serverSlug: string, channelSlug: string): string {
  return `${getPublicBaseUrl()}/c/${encodeURIComponent(serverSlug)}/${encodeURIComponent(channelSlug)}`;
}
