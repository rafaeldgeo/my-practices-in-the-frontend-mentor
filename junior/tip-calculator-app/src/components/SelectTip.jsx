import React, { useState } from "react";
import "./SelectTip.css";

function BtnRadio({label, valueTip, isSelected, onSelectRadio }) {

    return(
        <>
         <button className={"select-tip__btn " + (isSelected ? "select-tip__btn--selected" : "")} 
         type="button" role="radio" aria-checked={(isSelected ? "true" : "false")} aria-label={label} value={valueTip} 
         onClick={onSelectRadio}>{label}</button>
        </>
    );
}

export default function SelectTip(){

    const [selecIndex, setSelectIndex] = useState(0);
    
    return(
        <div className="select-tip" role="radiogroup" aria-labelledby="group-label">
            <BtnRadio label="5%" value={5} isSelected={selecIndex === 1} onSelectRadio={() => setSelectIndex(1)}/>
            <BtnRadio label="10%" value="10" isSelected={selecIndex === 2} onSelectRadio={() => setSelectIndex(2)}/>
            <BtnRadio label="15%" value="15" isSelected={selecIndex === 3} onSelectRadio={() => setSelectIndex(3)}/>
            <BtnRadio label="25%" value="25" isSelected={selecIndex === 4} onSelectRadio={() => setSelectIndex(4)}/>
            <BtnRadio label="50%" value="50" isSelected={selecIndex === 5} onSelectRadio={() => setSelectIndex(5)}/>
            <input className="select-tip__custom-input" type="text" placeholder="custom"/>  
        </div>
    );
}