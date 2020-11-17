/** @format */

import React from "react";

const Rocket = () => {
  return (
    <div>
      <div
        style={{
          width: "10rem",
          borderRadius: "50%",
        }}
      >
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_tAECiC.json"
          background="transparent"
          speed=".2"
          style={{ width: "10rem" }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
};

export default Rocket;
