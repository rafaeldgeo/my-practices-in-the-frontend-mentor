import React, { useState } from "react";
import "./Calculator.css";
import FormBill from "./FormBill";
import ResultTip from "./ResultTip";


export function Calculator() {

    return(
        <div className="calculator">
            <FormBill />
            <ResultTip />
        </div>
    );
}