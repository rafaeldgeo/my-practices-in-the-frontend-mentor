import React from "react";
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

export default function SelectTip({onSelectValue, onSelectBtn, inputValue, onChangeInput, onBlurCheck}){
    
    return(
        <div className="select-tip" role="radiogroup" aria-labelledby="group-label">
            <BtnRadio label="5%" valueTip="5" isSelected={onSelectBtn === 0} onSelectRadio={(e) => onSelectValue(e.target.value)}/>
            <BtnRadio label="10%" valueTip="10" isSelected={onSelectBtn === 1} onSelectRadio={(e) => onSelectValue(e.target.value)}/>
            <BtnRadio label="15%" valueTip="15" isSelected={onSelectBtn === 2} onSelectRadio={(e) => onSelectValue(e.target.value)}/>
            <BtnRadio label="25%" valueTip="25" isSelected={onSelectBtn === 3} onSelectRadio={(e) => onSelectValue(e.target.value)}/>
            <BtnRadio label="50%" valueTip="50" isSelected={onSelectBtn === 4} onSelectRadio={(e) => onSelectValue(e.target.value)}/>
            <input className="select-tip__custom-input" type="text" value={inputValue} placeholder="custom" onChange={(e) => onChangeInput(e.target.value)} onBlur={onBlurCheck}/>   
        </div>
    );
}