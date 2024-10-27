import React from "react";
import "./SelectTip.css";

export default function SelectTip(){

    function handleClick(e){
        console.log(e.target.value);
    }
    



    return(
        <div className="select-tip" role="radiogroup" aria-labelledby="group-label">
            <button className="select-tip__btn select-tip__btn--selected" type="button" role="radio" aria-checked="false" value={5} onClick={handleClick}>5%</button>
            <button className="select-tip__btn" type="button" role="radio" aria-checked="false" value={10}>10%</button>
            <button className="select-tip__btn" type="button" role="radio" aria-checked="false" value={15}>15%</button>
            <button className="select-tip__btn" type="button" role="radio" aria-checked="false" value={25}>25%</button>
            <button className="select-tip__btn" type="button" role="radio" aria-checked="false" value={50}>50%</button>
            <input className="select-tip__custom-input" type="text" placeholder="custom"/>  
        </div>
    );
}