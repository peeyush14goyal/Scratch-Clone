import React, { useState } from "react";

const Repeat = () => {
  const [repeat, setRepeat] = useState(0);
  return (
    <div className="bg-red-400 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Repeat:</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={repeat}
          onChange={(e) => setRepeat(parseInt(e.target.value))}
        />
      </div>
      <div className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        Repeat By {repeat}
      </div>
    </div>
  );
};

export default Repeat;
