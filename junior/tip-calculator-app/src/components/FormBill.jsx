import React from "react";
import SelectTip from "./SelectTip";
import "./FormBill.css";

export default function FormBill(){

    return(
        <form className="form-bill">
            <div className="bill">
                <label className="bill__label" htmlFor="bill">Bill</label>
                <input className="bill__value-input" type="text" name="bill" id="bill" placeholder="0"/>
            </div>
            <div className="tip">
                <label className="tip__label">Select Tip %</label>
                <SelectTip />
            </div>
            <div className="people">
                <label className="people__label" htmlFor="people">Number of People</label>
                <input className="people__number-input" type="text" name="people" id="people" placeholder="0"/>
            </div>
        </form>
    );
}