import React from "react";
import "./Header.css";
import keycloakService from "../services/keycloakService";

const Header = ({ onLogout }) => {
  const domain = keycloakService.realm;
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">{domain}</div>
        <div className="header-logout">
          <button
            className="header-logout-btn"
            onClick={onLogout}
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="header-logout-icon"
              viewBox="0 0 16 16"
            >
              <path d="M6.146 11.354a.5.5 0 0 1 .708 0L10.5 15l.354-.354-4.5-4.5a.5.5 0 0 1 0-.708l4.5-4.5L10.5 1l-3.646 3.646a.5.5 0 0 1-.708 0L6.146 2.854l-4.5 4.5a.5.5 0 0 1 0 .708l4.5 4.5z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
