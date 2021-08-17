import React, {useState} from "react";
import { connect } from "react-redux";

const GotoXY = () => {
  const gotoXY = (id, x, y) => {
    const el = document.getElementById(id);
    el.style.position = "relative";
    el.style.left = x + "px";
    el.style.top = y + "px";
    setState({ ...state, curr_x: x, curr_y: y });
  };
  return (
    <div className="grid grid-cols-2 my-2">
      <div className="text-white">Y:</div>
      <input
        className="mx-2 p-1 py-0 text-center"
        type="number"
        value={state.goto_y}
        onChange={(e) => {
          parseInt(e.target.value) != 0 &&
            setState({ ...state, goto_y: parseInt(e.target.value) });
        }}
      />
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(GotoXY);
