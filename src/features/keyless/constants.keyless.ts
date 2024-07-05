export const googleRedirectUri =
  process.env.REACT_APP_GOOGLE_REDIRECT_URI ?? ""
export const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""

export const getGoogleOath2Url = (nonce: string) =>
    `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&scope=openid+email+profile&nonce=${nonce}&redirect_uri=${googleRedirectUri}&client_id=${googleClientId}`

export enum OpenIdProvider {
  Google,
}

export interface OpenIdProviderInfo {
  redirectUri: string;
  clientId: string;
  getUrl: (nonce: string) => string;
}

export const providerMap: Record<OpenIdProvider, OpenIdProviderInfo> = {
    [OpenIdProvider.Google]: {
        clientId: googleClientId,
        redirectUri: googleRedirectUri,
        getUrl: getGoogleOath2Url,
    },
}
