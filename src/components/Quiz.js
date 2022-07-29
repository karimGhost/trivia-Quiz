import React from "react";
import { nanoid } from "nanoid";
export default function Quiz(props) {
  const [choice, setchoice] = React.useState(false);

  const handl = () => {
    const btss = [...props.bts];

    btss.splice(props.index, 0, props.id);

    props.setbts(btss);

    const quis = [...props.collects];
    quis.splice(props.index, 0, props.choices);

    props.setcollects(quis);
  };

  

  const style = {
    backgroundColor: props.choice ? "goldenrod" : "rgb(255, 215, 0, 0.4)",
  };

  return (
    <div className="contai">
      <button
        className={`btnchoice   ${props.choice && "btnchoice_selected"}  ${
          props.answer && props.iscorrect && "re"
        }  
 ${props.answer && props.choice && !props.iscorrect && "wrong"}`}
        onClick={handl}
        disabled={props.disabled}
      >
        {props.choices}
      </button>
    </div>
  );
}
