import React, {useState} from "react";
import "../components/RadioSelectUnit.css";

function BtnRadio({label, isSelected, onSelect}){

    return(
        <>
            <button className="btn" aria-label={label}>
                <div className={"btn__radio " + (isSelected ? "btn__radio--selected" : "")} onClick={onSelect}>
                    <div className={isSelected ? "btn__indicator" : ""}></div>
                </div>
                <span className="btn__label">{label}</span>
            </button>
        </>
    );
}

export default function RadioSelectUnit(){

    const [selectedIndex, setSelectedIndex] = useState(0);

    return(
        <div className="btn__wrapper">  
            <BtnRadio label="Metric" isSelected={selectedIndex === 0} onSelect={() => setSelectedIndex(0)}></BtnRadio>
            <BtnRadio label="Imperial" isSelected={selectedIndex === 1} onSelect={() => setSelectedIndex(1)}></BtnRadio>
        </div>
    );
}




