import React from "react";
import { RuxModal } from "@astrouxds/rux-modal/rux-modal.js";

const Modal = () => {
  return (
    <div>
      <rux-modal
        title="Log In"
        message="Please log in to see the dashboard"
        confirmText="Submit"
        denyText="Cancel"
        customEvent="listen-for-me"
      ></rux-modal>
    </div>
  );
};

export default Modal;
