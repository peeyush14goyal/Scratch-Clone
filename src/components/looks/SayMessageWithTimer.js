import React, { useState } from "react";
import { connect } from "react-redux";

const SayMessageWithTimer = ({ character, comp_id }) => {
  const [state, setState] = useState({
    show_msg: false,
    timer_message: "",
    timer_for_msg: 0,
  });

  /* Display Message */
  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    if (state.show_msg) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "inline-block";
    el.style.position = "relative";
    el.style.top = state.curr_y - 15 + "px";
    el.style.left = state.curr_x + 40 + "px";

    el.innerHTML = state.timer_message;
    window.setTimeout(() => {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
    }, state.timer_for_msg * 1000);
  };

  return (
    <div className="bg-purple-500 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Message</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="text"
          value={state.timer_message}
          onChange={(e) => {
            e.target.value.length > 0 &&
              setState({ ...state, timer_message: e.target.value });
          }}
        />
      </div>
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Timer:</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={state.timer_for_msg}
          onChange={(e) => {
            parseInt(e.target.value) > 0 &&
              setState({ ...state, timer_for_msg: parseInt(e.target.value) });
          }}
        />
      </div>
      <div
        id={comp_id}
        className="flex flex-row flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => displayMessage()}
      >
        {`Say ${state.timer_message}`}
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

export default connect(mapStateToProps)(SayMessageWithTimer);