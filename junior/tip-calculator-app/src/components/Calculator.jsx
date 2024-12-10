import React, { useState } from "react";
import "./Calculator.css";
import FormBill from "./FormBill";
import ResultTip from "./ResultTip";

export function Calculator() {

    const [result, setResult] = useState({
        tip: "0.00",
        total: "0.00"
    });

    function handleResult(tipAmountPerson, totalPerson){
         setResult({
            tip: tipAmountPerson,
            total: totalPerson
         });
    }

    function handleReset(){
        setResult({
            tip: "0.00",
            total: "0.00"
         });
    }

    return(
        <div className="calculator">
            <FormBill onSubmit={handleResult}/>
            <ResultTip onResult={result} onReset={handleReset}/> 
        </div>
    );
}