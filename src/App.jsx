import React, { useEffect, useState } from "react";
import { LandingPage } from "./pages/LandingPage.jsx";
import "./App.css";
import keycloakService from "./services/keycloakService";
import { UnknownDomainPage } from "./pages/UnknownDomainPage";

const App = () => {
  useEffect(() => {
    const validateDomain = async () => {
      try {
        if (!keycloakService.isLoggedIn()) {
          const isValid = await keycloakService.validateDomain();
          if (isValid) {
            keycloakService.doLogin();
            localStorage.setItem("isValidDomain", 1);
          } else {
            localStorage.setItem("isValidDomain", 0);
          }
        }
      } catch (error) {
        console.error("Error during Keycloak login process:", error);
      }
    };
    validateDomain();
  }, []);

  return (
    <div style={{ backgroundColor: "#f3f5f7", minHeight: "100vh" }}>
      {localStorage?.getItem("isValidDomain") == 1 ? (
        <LandingPage />
      ) : (
        <UnknownDomainPage />
      )}
    </div>
  );
};

export default App;
