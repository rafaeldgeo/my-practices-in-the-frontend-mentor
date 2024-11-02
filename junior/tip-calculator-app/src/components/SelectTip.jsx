import React, { useEffect, useState } from "react";
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

    const [selectIndex, setSelectIndex] = useState("");
    const [selectTip, setSelectTip] = useState("");
    const [customTip, setCustomTip] = useState("");
    const [defineTip, setDefineTip] = useState("");

     // check with delay if the value in input is a radio button
     useEffect(() => {
        const timer = setTimeout(() => {
            const index = selectPercentTip(customTip);
            if (index !== -1) {
                setSelectIndex(index);
                setSelectTip(customTip);
            } else {
                setSelectTip("");
                setSelectIndex("");
            }
        }, 500);
        
        return () => clearTimeout(timer);

    }, [customTip]);

    useEffect(() => {
        if (selectTip !== "") {
            setDefineTip(selectTip);
        } else if (customTip !== "") {
            setDefineTip(customTip);
        }

    }, [selectTip, customTip]);


    useEffect(() => {
        percentTipChosen(defineTip);
    });

    // select the radio button
    function handleClick(e) {
        
        const value = Number(e.target.value);
        const index = selectPercentTip(value);
        setSelectIndex(index);
        setSelectTip(value);
        setCustomTip(""); // clear input custom
    }

    // check if the value there is in radio button
    function selectPercentTip(value) {
         const tipList = [5, 10, 15, 25, 50];
         return tipList.findIndex((element) => element === value);
    }

    // show the value in the input
    function handleChange(e){
        const value = Number(e.target.value);
        if (value >= 0) {
            setCustomTip(value);
        } 
    }

    return(
        <div className="select-tip" role="radiogroup" aria-labelledby="group-label">
            <BtnRadio label="5%" valueTip="5" isSelected={selectIndex === 0} onSelectRadio={handleClick}/>
            <BtnRadio label="10%" valueTip="10" isSelected={selectIndex === 1} onSelectRadio={handleClick}/>
            <BtnRadio label="15%" valueTip="15" isSelected={selectIndex === 2} onSelectRadio={handleClick}/>
            <BtnRadio label="25%" valueTip="25" isSelected={selectIndex === 3} onSelectRadio={handleClick}/>
            <BtnRadio label="50%" valueTip="50" isSelected={selectIndex === 4} onSelectRadio={handleClick}/>
            <input className="select-tip__custom-input" type="text" value={customTip} placeholder="custom" onChange={handleChange}/>  
        </div>
    );
}