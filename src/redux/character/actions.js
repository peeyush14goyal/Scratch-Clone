import { SET_ANGLE } from "./actionTypes";

export const setCharacterAngle = (characterAngle) => {
  return {
    type: SET_ANGLE,
    angle: characterAngle,
  };
};
