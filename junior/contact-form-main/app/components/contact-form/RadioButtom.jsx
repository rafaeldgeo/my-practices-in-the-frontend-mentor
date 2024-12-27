import { useId } from "react";

function BtnRadio({labelRadio, valueRadio, onSelect, isSelect}){

    return(
        <div className={"radio-button " + (isSelect ? "radio-button--selected" : "")} role="radio" name="querytype" aria-checked={isSelect ? "true" : "false"} tabIndex="0"
        aria-labelledby={labelRadio} data-value={valueRadio} onClick={onSelect} onKeyDown={onSelect}>
            <div className={"radio-button__circle " + (isSelect ? "radio-button__circle--selected" : "")}></div>
            <span className="radio-button__label" id={labelRadio}>{labelRadio}</span>
        </div>
    );
}

export default function RadioButtom({onSelected, isSelected, isChecked}){

    return(
        <>
            <BtnRadio labelRadio="General Enquiry" valueRadio="general enquiry" onSelect={(e) => onSelected(e.target.closest(".radio-button"))} isSelect={isSelected === "general enquiry"} isCheck={isChecked}></BtnRadio>
            <BtnRadio labelRadio="Suport Request" valueRadio="suport request" onSelect={(e) => onSelected(e.target.closest(".radio-button"))} isSelect={isSelected === "suport request"}></BtnRadio>
        </>
    );
}