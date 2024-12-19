import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import KeycloakService from "./services/keycloakService";

const root = ReactDOM.createRoot(document.getElementById("root"));

const startApp = async () => {
  await KeycloakService.initKeycloak(); // Ensure initialization completes
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

startApp();
