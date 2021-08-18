import React from "react";
import { connect } from "react-redux";
import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";

function MidArea({ area_list, add_list, event_values }) {
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let repeat = 0;

    let str1 = `comp${arr[i]}-${id}-${i}`;
    if (arr[i] != "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    var cnt = setInterval(() => {
      if (i == arr.length) {
        clearInterval(cnt);
      }

      if (arr[i] == "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2]) {
          curr_time = new Date().getTime();
        }
        i++;
      } else if (arr[i] == "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      } else if (arr[i - 1] == "REPEAT" && repeat > 1) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };
  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between">
        <div className="font-bold">Mid Area</div>
        <button
          className="p-2 bg-purple-500 text-white rounded m-2"
          onClick={() => add_list()}
        >
          Add List
        </button>
      </div>
      <div className="grid grid-flow-col">
        {area_list.midAreaLists.map((l) => {
          return (
            <div
              key={l.id}
              className="w-52 border border-2 border-black m-4 p-1"
            >
              <Droppable droppableId={l.id} type="COMPONENTS">
                {(provided) => {
                  return (
                    <ul
                      className={`${l.id} w-48 h-full`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div className="w-20 mx-auto">
                        <button
                          className="p-1 px-3 text-white bg-green-600 mx-auto rounded"
                          onClick={() => handleClick(l.comps, l.id)}
                        >
                          Run
                        </button>
                      </div>
                      {l.comps &&
                        l.comps.map((x, i) => {
                          let str = `${x}`;
                          let component_id = `comp${str}-${l.id}-${i}`;

                          return (
                            <Draggable
                              key={`${str}-${l.id}-${i}`}
                              draggableId={`${str}-${l.id}-${i}`}
                              index={i}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {getComponent(str, component_id)}
                                  {provided.placeholder}
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </ul>
                  );
                }}
              </Droppable>
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
    area_list: state.list,
    event_values: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
