import React from "react";
import "./AppCard.css"; // Import the CSS file

const AppCard = ({ appName, onContinue, imageUrl }) => {
  return (
    <div className="app-card">
      <div className="app-card-image-container">
        <img src={imageUrl} alt={`${appName}`} className="app-card-image" />
      </div>
      <h2 className="app-card-title">{appName}</h2>{" "}
      {/* Title in top left corner */}
      <div className="app-card-gradient">
        <button className="app-card-button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AppCard;
