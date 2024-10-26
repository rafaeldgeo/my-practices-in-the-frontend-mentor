import React from "react";
import "./SelectTip.css";

export default function SelectTip(){

    return(
        <div className="select-tip">
            <button className="select-tip__btn select-tip__btn--selected" type="button">5%</button>
            <button className="select-tip__btn" type="button">10%</button>
            <button className="select-tip__btn" type="button">15%</button>
            <button className="select-tip__btn" type="button">25%</button>
            <button className="select-tip__btn" type="button">50%</button>
            <input className="select-tip__custom-input" type="text" placeholder="custom"/>  
        </div>
    );
}