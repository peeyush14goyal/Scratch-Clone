import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea() {
  return (
    <div
      className="flex-none h-full overflow-y-auto p-2 w-full "
      id="preview_area"
    >
      <div
        className="hidden border-2 p-2 w-auto whitespace-nowrap"
        id="message-box"
      ></div>
      <div>
        <CatSprite />
      </div>
    </div>
  );
}
