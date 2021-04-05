import React from "react";

const LoggedOut = () => {
  return (
    <div className="rux-card">
      <h3 className="rux-card__header">You are now logged out.</h3>
      <a className="rux-card__content" href="/login">
        Return to the log in page
      </a>
    </div>
  );
};

export default LoggedOut;
