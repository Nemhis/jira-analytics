import {
  ATLASSIAN_AUDIENCE,
  ATLASSIAN_AUTH_URL,
  ATLASSIAN_CLIENT_ID,
  ATLASSIAN_REDIRECT_URI,
  ATLASSIAN_SCOPE,
} from '@/config';

export const buildAuthUrl = (): URL => {
  const url = new URL(ATLASSIAN_AUTH_URL);
  const search = url.searchParams;
  search.append('audience', ATLASSIAN_AUDIENCE);
  search.append('client_id', ATLASSIAN_CLIENT_ID);
  search.append('scope', ATLASSIAN_SCOPE);
  search.append('state', 'test');
  search.append('redirect_uri', ATLASSIAN_REDIRECT_URI);
  search.append('response_type', 'code');
  search.append('prompt', 'consent');

  return url;
};
