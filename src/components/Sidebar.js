import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import {
  motionComponents,
  looksComponents,
  controlComponents,
} from "./SidebarConstants";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {/* Motion */}
      <div className="font-bold"> {"Motion"} </div>
      <Droppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {motionComponents.map((x, i) => {
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

      {/* Looks */}
      <div className="font-bold"> {"Looks"} </div>
      <Droppable droppableId="sideArea-looks" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-looks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {looksComponents.map((x, i) => {
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

      {/* Control */}
      <div className="font-bold"> {"Control"} </div>
      <Droppable droppableId="sideArea-control" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-control"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {controlComponents.map((x, i) => {
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
