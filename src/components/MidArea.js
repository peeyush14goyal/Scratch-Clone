import React from "react";
import { ItemTypes } from "../constants";
import { useDrop } from "react-dnd";

export default function MidArea() {
  const [props, drop] = useDrop(() => ({
    accept: ItemTypes.MOTION_ACTION,
    drop: (monitor) => console.log(props),
  }));
  return (
    <div ref={drop} className="flex-1 h-full overflow-auto">
      {"mid area"}
    </div>
  );
}
