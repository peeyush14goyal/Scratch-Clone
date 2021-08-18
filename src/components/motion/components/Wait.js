import React, { useState } from "react";

const Wait = () => {
  const [wait, setWait] = useState(0);
  return (
    <div className="bg-red-400 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Wait:</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={wait}
          onChange={(e) =>
            parseInt(e.target.value) >= 0
              ? setWait(parseInt(e.target.value))
              : null
          }
        />
      </div>
      <div className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        Wait {wait} seconds
      </div>
    </div>
  );
};

export default Wait;
