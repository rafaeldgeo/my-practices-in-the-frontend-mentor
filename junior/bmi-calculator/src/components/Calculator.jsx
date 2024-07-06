import React, {useState} from "react";
import "../components/Calculator.css"
import RadioSelectUnit from "./RadioSelectUnit";
import InputMetric from "./FormMetric";
import InputImperial from "./FormImperial";

export default function Calculator(){

    const [unit, setUnit] =  useState("metric"); 

    function showInput(unitSelected){
        setUnit(() => {
            return unitSelected === "metric" ? "metric" : "imperial";
        });
    }
    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <RadioSelectUnit choice={showInput} />
            {unit === "metric" ? <InputMetric /> : <InputImperial/>}
        </div>

    );
}
