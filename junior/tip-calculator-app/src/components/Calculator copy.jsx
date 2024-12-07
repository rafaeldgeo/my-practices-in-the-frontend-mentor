import React, { useState } from "react";
import "./Calculator.css";
import FormBill from "./FormBill";
import ResultTip from "./ResultTip";


export function Calculator() {

    const [inputs, setInputs] = useState("");
    // const [result, setResult] = useState({
    //     tipAmountPerson: 0.00,
    //     totalPerson: 0.00
    // });

    function getInputs(values){
        setInputs(values);
    }

    // function tipCalcule(values){
    //     const [valueBill, percentTip, numberPeople] = values;
    //     const tipAmount = valueBill * percentTip;
    //     const tipAmountPerson = tipAmount / numberPeople;
    //     const totalPerson = valueBill + tipAmount;
    //     setResult({
    //         tipAmountPerson: tipAmountPerson,
    //         totalPerson: totalPerson,
    //     });
    //     console.log(result);
    // }
    
    return(
        <div className="calculator">
            <FormBill inputsCompleted={getInputs}/>
            <ResultTip />
        </div>
    );
}