import React from "react";
import "./Calculator.css";
import InputBill from "./InputBill";
import ResultTip from "./ResultTip";


export function Calculator() {

    return(
        <div className="calculator">
            <InputBill />
            <ResultTip />
        </div>
    );
}