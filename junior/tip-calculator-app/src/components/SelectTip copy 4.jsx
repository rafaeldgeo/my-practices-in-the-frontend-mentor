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

export default function SelectTip({percentTipChosen}){

    const [selectBtnIndex, setSelectBtnIndex] = useState("");
    const [inputTip, setinputTip] = useState("");
    
    // check if the value in input is a radio button and select it if be
    function handleBlurCheckInput(){
        const btnIndex = selectPercentTip(inputTip);
        if (btnIndex !== -1) {
            setSelectBtnIndex(btnIndex);
        } else {
            setSelectBtnIndex("");
        }
        percentTipChosen(Number(inputTip) / 100);
    }

    // select the radio button
    function handleClick(e) {
        const valueTip = Number(e.target.value);
        const btnIndex = selectPercentTip(valueTip);
        setSelectBtnIndex(btnIndex);
        setinputTip("");
        percentTipChosen(valueTip / 100);
    }

    // check if the value there is in radio button
    function selectPercentTip(valueTip) {
         const tipList = [5, 10, 15, 25, 50];
         return tipList.findIndex((tip) => tip === valueTip);
    }

    // show the value in the input
    function handleChange(e){
        const valueTip = Number(e.target.value);
        if (valueTip >= 0) {
            setinputTip(valueTip);
        } 
    }

    return(
        <div className="select-tip" role="radiogroup" aria-labelledby="group-label">
            <BtnRadio label="5%" valueTip="5" isSelected={selectBtnIndex === 0} onSelectRadio={handleClick}/>
            <BtnRadio label="10%" valueTip="10" isSelected={selectBtnIndex === 1} onSelectRadio={handleClick}/>
            <BtnRadio label="15%" valueTip="15" isSelected={selectBtnIndex === 2} onSelectRadio={handleClick}/>
            <BtnRadio label="25%" valueTip="25" isSelected={selectBtnIndex === 3} onSelectRadio={handleClick}/>
            <BtnRadio label="50%" valueTip="50" isSelected={selectBtnIndex === 4} onSelectRadio={handleClick}/>
            <input className="select-tip__custom-input" type="text" value={inputTip} placeholder="custom" onChange={handleChange} onBlur={handleBlurCheckInput}/>  
        </div>
    );
}