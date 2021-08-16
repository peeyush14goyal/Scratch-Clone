import React from "react";
import { ItemTypes } from "../constants";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function MidArea() {
  return (
    <div className="flex-1 h-full overflow-auto">
      <DragDropContext>
        <Droppable droppableId="mid-area">
          {(provided) => {
            <ul
              className="mid-area"
              {...provided.droppableProps}
              ref={provided.innerRef}
            ></ul>;
          }}
        </Droppable>
      </DragDropContext>
      {"mid area"}
    </div>
  );
}
