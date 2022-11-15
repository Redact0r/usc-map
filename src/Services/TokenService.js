const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(process.env.API_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(process.env.API_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(process.env.API_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  parseAuthToken() {
    const authToken = TokenService.getAuthToken();
    if (authToken) return TokenService.parseJwt(authToken);
    else return undefined;
  },
};

export default TokenService;
