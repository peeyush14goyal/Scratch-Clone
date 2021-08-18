import React, { useState } from "react";
import { connect } from "react-redux";

const SayMessage = ({ character, comp_id }) => {
  const [state, setState] = useState({
    show_msg: false,
    message: "",
    character_id: "",
  });
  /* Display Message */
  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    if (state.show_msg && state.character_id === character.active) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "inline-block";
    el.style.position = "relative";

    el2.style.display = "block";
    el2.style.position = "relative";

    window.clearTimeout();
    el.innerHTML = state.message;
  };

  return (
    <div className="bg-purple-500 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Message</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="text"
          value={state.message}
          onChange={(e) => {
            e.target.value.length > 0 &&
              setState({ ...state, message: e.target.value });
          }}
        />
      </div>
      <div
        id={comp_id}
        className="flex flex-row flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => displayMessage()}
      >
        {`Say ${state.message}`}
      </div>
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(SayMessage);
