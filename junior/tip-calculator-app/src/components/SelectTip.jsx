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

    const [selectBtnIndex, setSelectBtnIndex] = useState("");
    const [percentTip, setPercentTip] = useState({
        selectBtnValue: "",
        customInputValue: "",
    });
    

     // check with delay if the value in input is a radio button and select it if be
     useEffect(() => {
        const timer = setTimeout(() => {
            const btnIndex = selectPercentTip(percentTip.customInputValue);
            if (btnIndex !== -1) {
                setSelectBtnIndex(btnIndex);
                setPercentTip({
                    selectBtnValue: percentTip.customInputValue,
                    customInputValue: percentTip.customInputValue,
                });
            } else {
                setSelectBtnIndex("");
                setPercentTip({
                    selectBtnValue: "",
                    customInputValue: percentTip.customInputValue,
                });
            }
        }, 500);
                
        return () => clearTimeout(timer);

    }, [percentTip.customInputValue]);

     // send the value chose to the FormBill component
     useEffect(() => {
        const timer = setTimeout(() => {
            percentTipChosen(percentTip);
        }, 800);

        return () => clearTimeout(timer);
     });

    // select the radio button
    function handleClick(e) {
        const valueTip = Number(e.target.value);
        const btnIndex = selectPercentTip(valueTip);
        setSelectBtnIndex(btnIndex);
        setPercentTip({
            selectBtnValue: Number(valueTip),
            customInputValue: "",
        })
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
            setPercentTip({
                selectBtnValue: "",
                customInputValue: Number(valueTip),
            });
        } 
    }

    return(
        <div className="select-tip" role="radiogroup" aria-labelledby="group-label">
            <BtnRadio label="5%" valueTip="5" isSelected={selectBtnIndex === 0} onSelectRadio={handleClick}/>
            <BtnRadio label="10%" valueTip="10" isSelected={selectBtnIndex === 1} onSelectRadio={handleClick}/>
            <BtnRadio label="15%" valueTip="15" isSelected={selectBtnIndex === 2} onSelectRadio={handleClick}/>
            <BtnRadio label="25%" valueTip="25" isSelected={selectBtnIndex === 3} onSelectRadio={handleClick}/>
            <BtnRadio label="50%" valueTip="50" isSelected={selectBtnIndex === 4} onSelectRadio={handleClick}/>
            <input className="select-tip__custom-input" type="text" value={percentTip.customInputValue} placeholder="custom" onChange={handleChange}/>  
        </div>
    );
}