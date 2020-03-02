import config from "../config";
import TokenService from './Token'

const AuthHelper = {
  createAccount(newAccount) {
    return fetch(`${config.API_ENDPOINT}/accounts`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newAccount)
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      );
  },
  deleteAccount(user_name) {
    return fetch(`${config.API_ENDPOINT}/accounts/${user_name}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    });
  },
  getCurrentUser(token) {
    return fetch(`${config.API_ENDPOINT}/accounts`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.dbUser;
      });
  },
  getPublicAccountData(user_name) {
    return fetch(`${config.API_ENDPOINT}/accounts/${user_name}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.dbUser;
      });
  },
  login(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`

      },
      body: JSON.stringify(credentials)
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  refreshToken() {
    console.trace('refreshToken spam?');
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default AuthHelper;