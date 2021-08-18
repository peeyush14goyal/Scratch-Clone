import React, { useState } from "react";
import { connect } from "react-redux";

// Move Component for Sidebar
const Move = ({ character, comp_id }) => {
  const [steps, setSteps] = useState(0);

  // Fucntion used for moiving Sprint
  const handleClick = () => {
    const el = document.getElementById(character.active);
    var viewportOffset = el.getBoundingClientRect();

    var left = viewportOffset.left + window.scrollX;
    el.style.position = "absolute";
    el.style.left = left + steps + "px";
  };

  return (
    <div
      id={comp_id}
      className={` bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto`}
      onClick={() => handleClick()}
    >
      Move{" "}
      <input
        type="number"
        className="text-black text-center w-10 mx-2"
        value={steps}
        onChange={(e) => setSteps(parseInt(e.target.value))}
      />{" "}
      steps
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(Move);
