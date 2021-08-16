import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../../redux/character/actions";
import Icon from "../../Icon";

const TurnAntiClockWise = ({ character, characterAngle }) => {
  const [angle, setAngle] = useState(0);

  const handleClick = () => {
    let anti_angle = -1 * angle;
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + anti_angle}deg)`;
      characterAngle(character_angle.angle + anti_angle);
    }
  };

  return (
    <div className="bg-blue-500 p-2 my-3">
      <div className="grid grid-cols-2">
        <text className="text-white">Rotate By:</text>
        <input
          className="mx-2 p-1 py-0 text-center"
          type="number"
          value={angle}
          onChange={(e) => {
            setAngle(parseInt(e.target.value));
          }}
        />
      </div>
      <div
        className="flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer"
        onClick={() => handleClick()}
      >
        <div className="flex mx-auto">
          Turn
          <Icon name="undo" size={15} className="text-white mx-2" />
          {angle} degrees
        </div>
      </div>
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnAntiClockWise);
