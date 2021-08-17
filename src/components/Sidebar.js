import React, { useState } from "react";
import Icon from "./Icon";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./motion/getComponents";

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
    motionComponents: ["MOVE", "TURN_CLOCKWISE", "TURN_ANTI_CLOCKWISE"],
  });

  /* Motion Functions */

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

  const onDragEnd = (result) => {
    console.log("Sidebar Result is ", result);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>

      {/* Motion */}
      <div className="font-bold"> {"Motion"} </div>
      <Droppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.motionComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
