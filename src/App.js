import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { updateList } from "./redux/midarea/actions";

function App({ complist, update_list }) {
  const onDragEnd = (result) => {
    console.log("Result is ", result);
    let element = result.draggableId.split("-")[0];

    console.log("Data is ", complist);

    const old_list = complist.midAreaLists;
    console.log("orifinal list is ", old_list);
    let source_index = old_list.findIndex(
      (x) => x.id === result.source.droppableId
    );
    if (source_index > -1) {
      console.log("Source Old Old List vi s ", old_list);
      let comp_list = old_list[source_index].comps;
      comp_list.splice(result.source.index, 1);
      old_list[source_index].comps = comp_list;
      // update_list(result.source.droppableId, old_list);
    }

    let dest_index = old_list.findIndex(
      (x) => x.id === result.destination.droppableId
    );

    console.log("Source index is ", source_index);
    console.log("Destination Index is ", dest_index);
    if (dest_index > -1) {
      console.log("Old Old List vi s ", old_list);
      let dest_comp_list = old_list[dest_index].comps;
      console.log("List vi s ", dest_comp_list);
      dest_comp_list.splice(result.destination.index, 0, `${element}`);
      console.log("New List vi s ", dest_comp_list);
      console.log("Old New List vi s ", old_list);
      old_list[dest_index].comps = dest_comp_list;
      console.log("Old list is ", old_list);
      // update_list(result.source.droppableId, old_list);
    }
  };
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar /> <MidArea />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  console.log("State is ", state);
  return {
    complist: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_list: (id, new_list) => dispatch(updateList(id, new_list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
