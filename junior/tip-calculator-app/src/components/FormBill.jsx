import React, { useState, useEffect } from "react";
import SelectTip from "./SelectTip";
import "./FormBill.css";

export default function FormBill(){

    const [percentTip, setPercentTip] = useState("");
    const [valueBill, setValueBill] = useState("");
    const [numberPeople, setNumberPeople] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (percentTip !== "" && valueBill !== "" && numberPeople > 0) {
                console.log("calcular");
            }
        }, 1000);

        return () => clearTimeout(timer);

    }, [percentTip, valueBill, numberPeople])

    function getPercentTip(value) { setPercentTip(value); }

     // show the value in the input Bill
    function handleChangeBill(e){
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        
        const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });
        const valueFormated = formatter.format(value / 100).replace(",", ".")

        setValueBill(valueFormated);

    }

    // show the value in the input People
    function handleChangePeople(e){
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        setNumberPeople(Number(value));
    }
 
    return(
        <form className="form-bill">
            <div className="bill">
                <label className="bill__label" htmlFor="bill">Bill</label>
                <input className="bill__value-input" type="text" name="bill" id="bill" placeholder="0" value={valueBill} onChange={handleChangeBill}/>
            </div>
            <div className="tip">
                <label className="tip__label" id="group-label">Select Tip %</label>
                <SelectTip percentTipChosen={getPercentTip}/>
            </div>
            <div className="people">
                <div className="people__label-error-wrapper">
                    <label className="people__label" htmlFor="people">Number of People</label>
                    <span className="people__msg-error">{numberPeople === 0 ? "can't be zero" : ""}</span>
                </div>
                <input className={"people__number-input " + (numberPeople === 0 ? "people__number-input--error" : "")} type="text" name="people" id="people" placeholder="0" value={numberPeople} onChange={handleChangePeople}/>
            </div>
        </form>
    );
}