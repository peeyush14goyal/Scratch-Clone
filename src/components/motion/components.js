import React from "react";
import Move from "../motion/components/move";
import TurnAntiClockwise from "./components/turnAntiClockwise";
import TurnClockwise from "./components/turnClockwise";

export const getComponent = (key) => {
  switch (key) {
    case "MOVE":
      return <Move />;

    case "TURN_CLOCKWISE":
      return <TurnClockwise />;

    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockwise />;

    default:
      return React.null;
  }
};

export const GotoPosition = (handleClick) => {
  return (
    <div className="bg-blue-500 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <text className="text-white"> X:</text>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={state.goto_x}
          onChange={(e) => {
            parseInt(e.target.value) != 0 &&
              setState({ ...state, goto_x: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="grid grid-cols-2 my-2">
        <text className="text-white">Y:</text>
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
      <div
        className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => handleClick}
      >
        goto X: {state.goto_x} Y: {state.goto_y}
      </div>
    </div>
  );
};
