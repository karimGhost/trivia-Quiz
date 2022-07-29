import React from "react"



 

export default function Ans(props){
    
function reset(){
    
}



    
    return(
        
        <div className="valid_container">
         {props.flip && <p>you scored {props.counted}/5 </p>}
  <button className="btn_validate"  onClick={!props.flip ? props.onclick : props.ifetch}><a className="ancor" href="#blue"> { props.flip ?  "play again" : "Check answers"} </a></button>
     
      
       </div>
        
    )
}

