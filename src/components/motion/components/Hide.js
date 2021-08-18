import React from "react";
import { connect } from "react-redux";

const Hide = ({ character, comp_id }) => {
  // To handle show and hide
  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    el.style.display = "none";
  };
  return (
    <div
      id={comp_id}
      className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto w-1/2"
      onClick={() => handleDisplay()}
    >
      Hide
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(Hide);
