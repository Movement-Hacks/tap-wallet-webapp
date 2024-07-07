const AUTHENTICATED = "authenticated"

export const setAuthenticated = (authenticated: boolean) => {
    localStorage.setItem(AUTHENTICATED, String(authenticated))
}

export const getAuthenticated = () => {
    const authenticated = localStorage.getItem(AUTHENTICATED)
    return authenticated ? Boolean(authenticated) : false
}
