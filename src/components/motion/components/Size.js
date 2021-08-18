import React, { useState } from "react";
import { connect } from "react-redux";

const Size = ({ character, comp_id }) => {
  const [state, setState] = useState({
    curr_size: 0,
    scale: 1,
  });
  // To change Size of Sprint
  const changeSize = () => {
    const el = document.getElementById(character.active);
    el.style.transform = `scale(${state.curr_size + state.scale})`;
    setState({ ...state, curr_size: state.curr_size + state.scale });
  };

  return (
    <div className="bg-purple-500 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Size:</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={state.scale}
          onChange={(e) =>
            setState({ ...state, scale: parseInt(e.target.value) })
          }
        />
      </div>
      <div
        id={comp_id}
        className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => changeSize()}
      >
        Scale By {state.scale}
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

export default connect(mapStateToProps)(Size);
