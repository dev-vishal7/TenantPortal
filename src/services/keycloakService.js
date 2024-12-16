import Keycloak from "keycloak-js";

const keycloakConfig = {
  realm: "wyoxafp",
  url: "http://127.0.0.1:8080",
  clientId: "spectra-frontend",
  publicClient: true,
  initOptions: {
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
    responseType: "code", // Add this
    flow: "standard",
    checkLoginIframe: false,
    scope: "openid profile email", // Add this
  },
};

const keycloak = new Keycloak(keycloakConfig);

class KeycloakService {
  constructor() {
    this.keycloak = null;
    this.realm = "wyoxafp"; // Store the dynamic realm name
  }

  // Initialize Keycloak
  initKeycloak = () => {
    // Update the Keycloak configuration with the dynamic realm
    const dynamicKeycloakConfig = {
      ...keycloakConfig,
      realm: this.realm, // Set the dynamic realm
    };

    this.keycloak = new Keycloak(dynamicKeycloakConfig);

    return this.keycloak
      .init(dynamicKeycloakConfig.initOptions)
      .then((authenticated) => {
        console.log("authenticated", authenticated);
        // if (!authenticated) this.doLogin();
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
      `http://127.0.0.1:8080/admin/realms/${this.realm}/clients`,
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
    const payload = {
      realm: "wyoxafp",
    };
    const response = await fetch(
      `http://localhost:8085/api/v2/validateDomain`,
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
