import React from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";

function PreviewArea({ character }) {
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
      {character.characters.map((x, i) => {
        console.log("X is ", x);
        return (
          <div id={`dragme-${i}`} key={i}>
            <div
              className="hidden border-2 p-2 w-auto whitespace-nowrap"
              id="message-box"
            ></div>
            <div>
              {console.log(x.id)}
              <CatSprite charac_id={x.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(PreviewArea);
