import Keycloak from "keycloak-js";

const keycloakConfig = {
  realm: window.location.hostname.split(".")[0],
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: "starlly_frontend",
  publicClient: true,
  initOptions: {
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
    responseType: "code",
    flow: "standard",
    checkLoginIframe: false,
    scope: "openid profile email",
  },
};
class KeycloakService {
  constructor() {
    this.keycloak = null;
    this.realm = window.location.hostname.split(".")[0];
  }

  initKeycloak = () => {
    // Update the Keycloak configuration with the dynamic realm
    const dynamicKeycloakConfig = {
      ...keycloakConfig,
      realm: this.realm,
    };

    this.keycloak = new Keycloak(dynamicKeycloakConfig);

    return this.keycloak
      .init(dynamicKeycloakConfig.initOptions)
      .then((authenticated) => {
        return authenticated;
      })
      .catch((error) => {
        console.error("Keycloak initialization error:", error);
        throw error;
      });
  };

  fetchApps = async () => {
    const token = this.keycloak.token;

    // Fetch app list from Keycloak
    const response = await fetch(
      `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${this.realm}/clients`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch apps");
    }

    const data = await response.json();

    return data.map((app) => ({
      id: app.id,
      name: app.name,
      url: app.url,
    }));
  };

  // Fetch admin token
  validateDomain = async () => {
    try {
      const payload = {
        realm: this.realm,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v2/validateDomain`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  };

  // Login function
  doLogin = () => {
    return this.keycloak.login({
      redirectUri: window.location.origin,
      scope: "openid profile email",
    });
  };

  // Logout function
  doLogout = () => this.keycloak.logout();

  // Check if logged in
  isLoggedIn = () => !!this.keycloak?.token;

  // Get token
  getToken = () => this.keycloak?.token;

  // Get parsed token
  getTokenParsed = () => this.keycloak?.tokenParsed;

  // Update token function (and fetch user details)
  updateToken = (minValidity = 5) => {
    return this.keycloak
      .updateToken(minValidity)
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token updated");
        }
      })
      .catch(() => {
        console.log("Token update failed");
        return this.doLogin();
      });
  };

  // Get username
  getUsername = () => {
    return this.keycloak?.tokenParsed?.preferred_username;
  };
}

export default new KeycloakService();
