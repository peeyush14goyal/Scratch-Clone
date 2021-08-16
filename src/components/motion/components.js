import React from "react";
import Icon from "./Icon";

export const MoveStepsComponent = (handleClick) => {
  return (
    <div
      className="bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
      onClick={() => handleClick}
    >
      Move <input type="number" /> steps
    </div>
  );
};

export const TurnClockWise = (handleClick) => {
  return (
    <div className="bg-blue-500 p-2 my-3">
      <div className="grid grid-cols-2">
        <text className="text-white">Rotate By:</text>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={state.anticlockwise_rotation_angle}
          onChange={(e) =>
            parseInt(e.target.value) > 0 &&
            setState({
              ...state,
              anticlockwise_rotation_angle: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div
        className="flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer text-center"
        onClick={() => handleClick}
      >
        <div className="flex mx-auto">
          Turn
          <Icon name="undo" size={15} className="text-white mx-2" />{" "}
          {state.anticlockwise_rotation_angle} degrees
        </div>
      </div>
    </div>
  );
};

export const TurnAntiClockWise = (handleClick) => {
  return (
    <div className="bg-blue-500 p-2 my-3">
      <div className="grid grid-cols-2">
        <text className="text-white">Rotate By:</text>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={state.clockwise_rotation_angle}
          onChange={(e) => {
            parseInt(e.target.value) > 0 &&
              setState({
                ...state,
                clockwise_rotation_angle: parseInt(e.target.value),
              });
          }}
        />
      </div>
      <div
        className="flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer"
        onClick={() => handleClick}
      >
        <div className="flex mx-auto">
          Turn
          <Icon name="redo" size={15} className="text-white mx-2" />
          {state.clockwise_rotation_angle} degrees
        </div>
      </div>
    </div>
  );
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
