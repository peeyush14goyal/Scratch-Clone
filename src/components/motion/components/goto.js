import React from "react";
import { connect } from "react-redux";

const GotoXY = () => {
  const gotoXY = (id, x, y) => {
    const el = document.getElementById(id);
    el.style.position = "relative";
    el.style.left = x + "px";
    el.style.top = y + "px";
    setState({ ...state, curr_x: x, curr_y: y });
  };
  return <div></div>;
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(GotoXY);
