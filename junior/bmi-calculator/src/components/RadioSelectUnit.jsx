import React, { useState, useEffect } from "react";
import "../components/RadioSelectUnit.css";

function BtnRadio({label, isSelected, onSelectRadio}){

    return(
        <>
            <button className="btn" aria-label={label} onClick={onSelectRadio} >
                <div className={"btn__radio " + (isSelected ? "btn__radio--selected" : "")}>
                    <div className={isSelected ? "btn__indicator" : ""}></div>
                </div>
                <span className="btn__label">{label}</span>
            </button>
        </>
    );
}

export default function RadioSelectUnit({unitSelected}){

    const [selectIndex, setSelectIndex] = useState(0);

    useEffect(() => {
        unitSelected(selectIndex);
    });
    
    return(
        <div className="btn__wrapper">  
            <BtnRadio label="Metric" isSelected={selectIndex === 0} onSelectRadio={() => setSelectIndex(0)}></BtnRadio>
            <BtnRadio label="Imperial" isSelected={selectIndex === 1} onSelectRadio={() => setSelectIndex(1)}></BtnRadio>
        </div>
    );
}



