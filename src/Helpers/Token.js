import jwtDecode from "jwt-decode";
import config from "../config";

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.REACT_APP_API_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.REACT_APP_API_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.REACT_APP_API_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  parseAuthToken() {
    const authToken = TokenService.getAuthToken();
    // console.log('authtoekn is', authToken);
    // console.log('tokenservice.parsejwt(authtoken) is', TokenService.parseJwt(authToken));

    if (authToken) return TokenService.parseJwt(authToken);
    else return undefined;
  },
  _getMsUntilExpiry(payload) {
    console.log("payload", payload);
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken()
    );
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
    console.log("timeout msuntilexpiry", msUntilExpiry);
    console.log("timeout tenseconds", _TEN_SECONDS_IN_MS);
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
