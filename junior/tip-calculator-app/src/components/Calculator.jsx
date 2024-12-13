import React, { useState, useRef } from "react";
import "./Calculator.css";
import FormBill from "./FormBill";
import ResultTip from "./ResultTip";

export function Calculator() {

    const [result, setResult] = useState({
        tip: "0.00",
        total: "0.00"
    });

    const inputRef = useRef(null);

    // it's gets results from FromBill Components and setState
    function handleResult(tipAmountPerson, totalPerson){
         setResult({
            tip: tipAmountPerson,
            total: totalPerson
         });
    }

    // reset the result state and change the states of the FormBill Components
    function handleReset(){
        setResult({
            tip: "0.00",
            total: "0.00"
         });
         // it's changes the states of the input FormBill Components using useRef
         if (inputRef.current) {
            inputRef.current.resetInputs();
        }
    }

    return(
        <div className="calculator">
            <FormBill onSubmit={handleResult} ref={inputRef}/>
            <ResultTip onResult={result} onReset={handleReset}/> 
        </div>
    );
}