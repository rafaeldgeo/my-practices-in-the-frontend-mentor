import React, { useState, useEffect } from "react";
import SelectTip from "./SelectTip";
import "./FormBill.css";

export default function FormBill(){

    const [percentTip, setPercentTip] = useState("");
    const [valueBill, setValueBill] = useState("");
    const [numberPeople, setNumberPeople] = useState("");

    useEffect(() => {
        if (numberPeople === 0) {
            console.log("erro");
        }
    }, [numberPeople])

    function getPercentTip(value) {
        setPercentTip(value);
    }

     // show the value in the input Bill
    function handleChangeBill(e){
        const value = e.target.value;
        if (value >= 0) {
            setValueBill(value);
        }
    }

    // show the value in the input People
    function handleChangePeople(e){
        const value = Number(e.target.value);
        if (value >= 0) {
             setNumberPeople(value);
        }
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
                <label className="people__label" htmlFor="people">Number of People</label>
                <input className="people__number-input" type="text" name="people" id="people" placeholder="0" value={numberPeople} onChange={handleChangePeople}/>
            </div>
        </form>
    );
}