import React, { useState } from "react";
import { connect } from "react-redux";
import { setWait } from "../../redux/events/eventActions";

const Wait = ({ events, comp_id, set_wait }) => {
  const [wait, setStateWait] = useState(0);

  function handleChange(e) {
    let val = parseInt(e.target.value);
    setStateWait(val);
    let curr = events.wait;
    curr[comp_id] = val;
    set_wait(curr);
  }
  return (
    <div className="bg-red-400 p-2 my-3">
      <div className="grid grid-cols-2 my-2">
        <div className="text-white">Wait:</div>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={wait}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div
        id={comp_id}
        className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        Wait {wait} seconds
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_wait: (value) => dispatch(setWait(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wait);
