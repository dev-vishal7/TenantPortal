import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AppCard from "../components/AppCard";
import keycloakService from "../services/keycloakService";

export const LandingPage = () => {
  const [apps, setApps] = useState([
    {
      id: 1,
      name: "Spectra",
      url: "/spectra",
      icon: "https://bbs.oppo.com/upload/image/20210528/429906854/811363344094330881.jpeg",
      allow: true,
    },
    {
      id: 2,
      name: "Servy",
      url: "/servy",
      icon: "https://www.pagetraffic.in/wp-content/uploads/2023/06/CRM-software.jpg",
      allow: true,
    },
  ]);

  const tenantName = "Tenant Name";

  const handleAppContinue = (appUrl) => {
    window.location.href = appUrl;
  };

  const handleLogout = () => {
    try {
      keycloakService.doLogout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <Header tenantName={tenantName} onLogout={handleLogout} />

      <main className="app-card-container">
        {apps
          .filter((app) => app.allow)
          .map((app) => (
            <AppCard
              key={app.id}
              appName={app.name}
              appUrl={app.url}
              imageUrl={app.icon}
              onContinue={handleAppContinue}
            />
          ))}
      </main>
    </div>
  );
};
