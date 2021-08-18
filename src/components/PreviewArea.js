import React from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";
import { addCharacter, setActive } from "../redux/character/actions";

function PreviewArea({ character, add_character, set_active }) {
  function drag_start(event) {
    console.log("Event 1 called");
    // var style = window.getComputedStyle(event.target, null);
    // event.dataTransfer.setData(
    //   "text/plain",
    //   parseInt(style.getPropertyValue("left"), 10) -
    //     event.clientX +
    //     "," +
    //     (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
    // );
  }
  function drag_over(event) {
    event.preventDefault();
    return false;
  }
  function drop(event, i) {
    console.log("Event 3 called ", event);
    var offset = event.dataTransfer.getData("text/plain").split(",");
    var dm = document.getElementById(`dragme-${i}`);
    dm.style.left = event.clientX + parseInt(offset[0], 10) + "px";
    dm.style.top = event.clientY + parseInt(offset[1], 10) + "px";
    event.preventDefault();
    return false;
  }
  return (
    <div
      className="w-full flex-none h-full overflow-y-auto p-2"
      id="preview_area"
      onDragStart={(e) => drag_start(e)}
      onDragOver={(e) => drag_over(e)}
    >
      <div className="flex justify-between">
        <div className="font-bold">Preview Area</div>
        <div>
          <label>Active:</label>

          <select
            name="active_character"
            id="active_character"
            onChange={(e) => set_active(e.target.value)}
          >
            {character.characters.map((x, i) => {
              const first = x.id.charAt(0).toUpperCase();
              const name = first + x.id.substr(1);
              return (
                <option
                  key={i}
                  value={x.id}
                  className="text-gray-700 block px-4 py-2 text-sm"
                >
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="p-2 bg-purple-500 text-white rounded m-2"
          onClick={() => add_character()}
        >
          Add
        </button>
      </div>
      <div className="flex justify-around">
        {character.characters.map((x, i) => {
          return (
            <div id={`dragme-${i}`} key={i}>
              <div
                className="hidden border-2 p-2 w-auto whitespace-nowrap"
                id="message-box"
              ></div>
              <div>
                <CatSprite charac_id={x.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_character: () => dispatch(addCharacter()),
    set_active: (ch_id) => dispatch(setActive(ch_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
