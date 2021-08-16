import React, { useState } from "react";
import Icon from "../../Icon";

const TurnClockWise = () => {
  const [angle, setAngle] = useState(0);
  return (
    <div className="bg-blue-500 p-2 my-3">
      <div className="grid grid-cols-2">
        <text className="text-white">Rotate By:</text>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
        />
      </div>
      <div
        className="flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer text-center"
        onClick={() => handleClick}
      >
        <div className="flex mx-auto">
          Turn
          <Icon name="redo" size={15} className="text-white mx-2" /> {angle}{" "}
          degrees
        </div>
      </div>
    </div>
  );
};

export default TurnClockWise;
