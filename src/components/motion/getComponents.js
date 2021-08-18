import React from "react";
import Move from "./components/Move";
import TurnAntiClockwise from "./components/TurnAntiClockwise";
import TurnClockwise from "./components/TurnClockwise";
import GotoXY from "./components/Goto";
import SayMessage from "./components/SayMessage";
import SayMessageWithTimer from "./components/SayMessageWithTimer";
import Size from "./components/Size";
import Show from "./components/Show";
import Hide from "./components/Hide";
import Wait from "./components/Wait";
import Repeat from "./components/Repeat";

export const getComponent = (key, id) => {
  switch (key) {
    case "MOVE":
      return <Move comp_id={id} />;

    case "TURN_CLOCKWISE":
      return <TurnClockwise comp_id={id} />;

    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockwise comp_id={id} />;

    case "GOTO_XY":
      return <GotoXY comp_id={id} />;

    case "SAY_MESSAGE":
      return <SayMessage comp_id={id} />;

    case "SAY_MESSAGE_WITH_TIMER":
      return <SayMessageWithTimer comp_id={id} />;

    case "SIZE":
      return <Size comp_id={id} />;

    case "SHOW":
      return <Show comp_id={id} />;

    case "HIDE":
      return <Hide comp_id={id} />;

    case "WAIT":
      return <Wait comp_id={id} />;

    case "REPEAT":
      return <Repeat comp_id={id} />;

    default:
      return React.null;
  }
};
