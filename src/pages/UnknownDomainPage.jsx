import React from "react";
import styles from "./UnknownDomainPage.module.css"; // Import the CSS for styling

export const UnknownDomainPage = () => {
  return (
    <div className={styles["unknown-domain-container"]}>
      <div className={styles["unknown-domain-content"]}>
        <h1 className={styles["heading"]}>
          Oops! You don't have an account with Starlly
        </h1>
        <p className={styles["subheading"]}>
          Looks like you've visited an unknown domain. Don't worry, you're in
          the right place to learn more about our platform.
        </p>

        <div className={styles["info-container"]}>
          <h2>What is Starlly?</h2>
          <p>
            Starlly is a modern platform that connects businesses to advanced
            tools for their day-to-day operations. You can manage everything
            from projects, teams, and tasks all in one place.
          </p>

          <div className={styles["app-info"]}>
            <div className={styles["app-card"]}>
              <h3 className={styles["app-title"]}>Servy</h3>
              <p className={styles["app-description"]}>
                Servy is our innovative service management app that helps
                businesses manage customer inquiries, track service requests,
                and more.
              </p>
            </div>

            <div className={styles["app-card"]}>
              <h3 className={styles["app-title"]}>Spectra</h3>
              <p className={styles["app-description"]}>
                Spectra is a powerful web application designed to streamline
                your workflow and boost productivity with seamless integrations
                and real-time updates.
              </p>
            </div>
          </div>
        </div>

        <button
          className={styles["explore-button"]}
          onClick={() => (window.location = "https://starllysolutions.com/")}
        >
          Explore Starlly
        </button>
      </div>
    </div>
  );
};
