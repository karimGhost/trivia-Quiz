import React from "react"


export default function Blobs(props){
    


    
    return(
       
       

     <div className="blobs">
{props.isfetched && !props.isLoading &&
 <div>
<span className="fblob"> </span>
<span className="sblob2"> </span>
</div>

}
 
 { !props.isfetched &&
<div>
<span className="blob1"> </span>
<span className="blob2"> </span>
</div>

}
       </div>
       

    )
}

