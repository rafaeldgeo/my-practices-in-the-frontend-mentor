import React, { useState } from "react";
import "./Calculator.css";
import FormBill from "./FormBill";
import ResultTip from "./ResultTip";


export function Calculator() {

    function getInputs(value){
        console.log(value);
    }
    
    return(
        <div className="calculator">
            <FormBill inputsCompleted={getInputs}/>
            <ResultTip />
        </div>
    );
}