import React from "react";
import { connect } from "react-redux";

const HideMessage = ({ character, comp_id }) => {
  /* Display Message */
  const displayMessage = () => {
    window.clearTimeout();
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    el.style.display = "none";
    el2.style.display = "none";
  };

  return (
    <div
      id={comp_id}
      onClick={() => displayMessage()}
      className="bg-purple-700 text-center text-white max-w-content p-1 my-3"
    >
      Hide Message
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(HideMessage);
