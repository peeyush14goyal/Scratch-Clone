import React, { useState } from "react";
import Icon from "./Icon";

export default function Sidebar() {
  const [state, setState] = useState({
    curr_angle: 0,
    clockwise_rotation_angle: 15,
    anticlockwise_rotation_angle: 15,
    goto_x: 0,
    goto_y: 0,
    curr_x: 0,
    curr_y: 0,
    message: "",
    show_msg: false,
    timer_for_msg: 0,
    timer_message: "",
    scale: 1,
    curr_size: 1,
    wait: 0,
    repeat: 10,
  });

  /* Motion Functions */

  // To move by x and y amount
  const moveByXY = (id, x, y) => {
    const el = document.getElementById(id);
    var viewportOffset = el.getBoundingClientRect();
    var top = viewportOffset.top + window.scrollY;
    var left = viewportOffset.left + window.scrollX;
    el.style.position = "absolute";
    el.style.left = left + x + "px";
    el.style.top = top + y + "px";
    setState({ ...state, curr_x: left + x, curr_y: top + y });
  };

  // To rotate Sprint by an angle
  const rotate = (id, clock) => {
    const angle = clock
      ? state.clockwise_rotation_angle
      : -1 * state.anticlockwise_rotation_angle;
    const el = document.getElementById(id);
    el.style.transform = `rotate(${state.curr_angle + angle}deg)`;
    setState({ ...state, curr_angle: (state.curr_angle + angle) % 360 });
  };

  // Goto specified x and y
  const gotoXY = (id, x, y) => {
    const el = document.getElementById(id);
    el.style.position = "relative";
    el.style.left = x + "px";
    el.style.top = y + "px";
    setState({ ...state, curr_x: x, curr_y: y });
  };

  /* Looks Functions */

  /* Display Message */
  const displayMessage = (timer) => {
    const el = document.getElementById("message-box");
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

    if (timer) {
      el.innerHTML = state.timer_message;
      window.setTimeout(() => {
        setState({ ...state, show_msg: false });
        el.style.display = "none";
      }, state.timer_for_msg * 1000);
    } else {
      window.clearTimeout();
      el.innerHTML = state.message;
    }
  };

  // To handle show and hide
  const handleDisplay = (show) => {
    const el = document.getElementById("sprite1");
    if (show) {
      el.style.display = "inline-block";
    } else {
      el.style.display = "none";
    }
  };

  // To change Size of Sprint
  const changeSize = (id) => {
    const el = document.getElementById(id);
    el.style.transform = `scale(${state.curr_size + state.scale / 100.0})`;
    setState({ ...state, curr_size: state.curr_size + state.scale / 100.0 });
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {/* Events */}
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>

      {/* Motion */}
      <div className="font-bold"> {"Motion"} </div>
      <div
        className="bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => moveByXY("sprite1", 10, 0)}
      >
        Move 10 steps
      </div>

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
          onClick={() => rotate("sprite1", false)}
        >
          <div className="flex mx-auto">
            Turn
            <Icon name="undo" size={15} className="text-white mx-2" />{" "}
            {state.anticlockwise_rotation_angle} degrees
          </div>
        </div>
      </div>

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
          onClick={() => rotate("sprite1", true)}
        >
          <div className="flex mx-auto">
            Turn
            <Icon name="redo" size={15} className="text-white mx-2" />
            {state.clockwise_rotation_angle} degrees
          </div>
        </div>
      </div>

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
          onClick={() => gotoXY("sprite1", state.goto_x, state.goto_y)}
        >
          goto X: {state.goto_x} Y: {state.goto_y}
        </div>
      </div>

      {/* Looks */}
      <div className="font-bold"> {"Looks"} </div>
      <div className="bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <text className="text-white">Message</text>
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
          <text className="text-white">Timer:</text>
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
          className="flex flex-row flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => displayMessage(true)}
        >
          {`say ${state.timer_message}`}
        </div>
      </div>

      <div className="bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <text className="text-white">Message</text>
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
          className="flex flex-row flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => displayMessage(false)}
        >
          {`say ${state.message}`}
        </div>
      </div>
      <div
        className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto w-1/2"
        onClick={() => handleDisplay(true)}
      >
        Show
      </div>
      <div
        className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto w-1/2"
        onClick={() => handleDisplay(false)}
      >
        Hide
      </div>
      <div className="bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <text className="text-white">Size:</text>
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
          className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeSize("sprite1")}
        >
          Scale By {state.scale}
        </div>
      </div>

      {/* Control */}
      <div className="font-bold"> {"Control"} </div>
      <div className="bg-red-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <text className="text-white">Wait:</text>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.wait}
            onChange={(e) =>
              setState({ ...state, wait: parseInt(e.target.value) })
            }
          />
        </div>
        <div
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeSize("sprite1")}
        >
          Wait {state.wait} seconds
        </div>
      </div>

      <div className="bg-red-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <text className="text-white">Repeat:</text>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.repeat}
            onChange={(e) =>
              setState({ ...state, repeat: parseInt(e.target.value) })
            }
          />
        </div>
        <div
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeSize("sprite1")}
        >
          Repeat By {state.repeat}
        </div>
      </div>
      <div
        className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer w-1/2 mx-auto"
        onClick={() => changeSize("sprite1")}
      >
        if
      </div>

      <div
        className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer w-1/2 mx-auto"
        onClick={() => changeSize("sprite1")}
      >
        else
      </div>

      <div
        className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer w-1/2 mx-auto"
        onClick={() => changeSize("sprite1")}
      >
        forever
      </div>

      <div
        className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer w-10/12 mx-auto"
        onClick={() => changeSize("sprite1")}
      >
        when I start as a clone
      </div>
    </div>
  );
}
