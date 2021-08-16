import React, { useState } from "react";
import Icon from "./Icon";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
      <DragDropContext>
        <Droppable droppableId="sidebar__events">
          {(provided) => (
            <ul
              className="sidebar__events"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key="1" draggableId="1" index={1}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto">
                      {"When "}
                      <Icon
                        name="flag"
                        size={15}
                        className="text-green-600 mx-2"
                      />
                      {"clicked"}
                    </div>
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {/* Motion */}
      <div className="font-bold"> {"Motion"} </div>

      <DragDropContext>
        <Droppable droppableId="sidebar__motion">
          {(provided) => (
            <ul
              className="sidebar__events"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key="1" draggableId="1" index={1}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      className="bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
                      onClick={() => moveByXY("sprite1", 10, 0)}
                    >
                      Move 10 steps
                    </div>
                  </li>
                )}
              </Draggable>
              <Draggable key="2" draggableId="2" index={2}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="bg-blue-500 p-2 my-3">
                      <div className="grid grid-cols-2">
                        <div className="text-white">Rotate By:</div>
                        <input
                          className="mx-2 p-1 py-0 text-center"
                          type="number"
                          value={state.anticlockwise_rotation_angle}
                          onChange={(e) =>
                            parseInt(e.target.value) > 0 &&
                            setState({
                              ...state,
                              anticlockwise_rotation_angle: parseInt(
                                e.target.value
                              ),
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
                          <Icon
                            name="undo"
                            size={15}
                            className="text-white mx-2"
                          />{" "}
                          {state.anticlockwise_rotation_angle} degrees
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
