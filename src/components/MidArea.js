import React from "react";
import { connect } from "react-redux";
import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./motion/getComponents";

function MidArea({ area_list, add_list }) {
  return (
    <div className="flex-1 h-full overflow-auto">
      <button onClick={() => add_list()}>Add List</button>
      <div className="grid gap-2">
        {area_list.midAreaLists.map((l) => {
          console.log("L is ", l);
          return (
            <div key={l.id} className="border border-2 border-black m-4">
              <Droppable droppableId={l.id} type="COMPONENTS">
                {(provided) => {
                  return (
                    <ul
                      className={`${l.id} w-48 h-48 max-h-full`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {l.comps &&
                        l.comps.map((x, i) => {
                          let str = `${x}`;
                          return (
                            <Draggable
                              key={`${str}-${l.id}`}
                              draggableId={`${str}-${l.id}`}
                              index={i}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {getComponent(str)}
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
      {"mid area"}
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
