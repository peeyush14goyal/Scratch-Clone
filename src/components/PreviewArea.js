import React from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";
import { addCharacter, setActive } from "../redux/character/actions";

function PreviewArea({ character, add_character, set_active }) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    console.log("Inside this");
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    console.log("ElemX is ", e.clientX);
    console.log("ElemY is ", e.clientY);
  }

  function closeDragElement() {
    console.log("Closed");
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  return (
    <div
      className="w-full flex-none h-full overflow-y-auto p-2"
      id="preview_area"
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
            <div
              id={`${x.id}-${i}`}
              key={i}
              className="absolute"
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
            >
              <div id={`${x.id}-div`}>
                <div
                  className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap"
                  id={x.id + "-message-box"}
                ></div>
                <div
                  className="hidden border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
                  id={x.id + "-message-box1"}
                ></div>
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
