import React, { useState } from "react";
import SelectTip from "./SelectTip";
import "./FormBill.css";

export default function FormBill(){

    const [percentTip, setPercentTip] = useState("");

    function getPercentTip(value) {
        console.log(value);
        setPercentTip(value);
    }

    return(
        <form className="form-bill">
            <div className="bill">
                <label className="bill__label" htmlFor="bill">Bill</label>
                <input className="bill__value-input" type="text" name="bill" id="bill" placeholder="0"/>
            </div>
            <div className="tip">
                <label className="tip__label" id="group-label">Select Tip %</label>
                <SelectTip percentTipChosen={getPercentTip}/>
            </div>
            <div className="people">
                <label className="people__label" htmlFor="people">Number of People</label>
                <input className="people__number-input" type="text" name="people" id="people" placeholder="0"/>
            </div>
        </form>
    );
}