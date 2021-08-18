import {
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  SET_LIST,
  REMOVE_LIST,
  ADD_LIST,
} from "./types";

export const updateList = (id, new_list) => {
  return {
    type: SET_LIST,
    list: new_list,
    id: id,
  };
};

export const addList = () => {
  return {
    type: ADD_LIST,
  };
};
