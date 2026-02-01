let accessToken = null;
let logoutFn = null;

export const authStore = {
  setAccessToken(token) {
    accessToken = token;
  },
  getAccessToken() {
    return accessToken;
  },
  bindLogout(fn) {
    logoutFn = fn;
  },
  logout() {
    accessToken = null;
    logoutFn && logoutFn();
  }
};
