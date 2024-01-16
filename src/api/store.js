import { useNavigate } from "react-router-dom";

class Store {
  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  setTokens(token) {
    localStorage.setItem("token", token.jwt);
    this.setUser(token.user);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    window.location = "/";
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getRoles() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)?.roles?.map((r) => r.authority) : null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRefreshToken() {
    return localStorage.getItem("refresh");
  }

  setPersonalizationSettings(settings) {
    localStorage.setItem("personalizationSettings", JSON.stringify(settings));
  }

  getPersonalizationSettings() {
    const settings = localStorage.getItem("personalizationSettings");
    return settings ? JSON.parse(settings) : null;
  }
}

export default new Store();
