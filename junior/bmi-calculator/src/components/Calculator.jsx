import React, {useState} from "react";
import "../components/Calculator.css"
import RadioSelectUnit from "./RadioSelectUnit";
import InputMetric from "./FormMetric";
import InputImperial from "./FormImperial";

export default function Calculator(){

    const [unitShowed, setUnitShowed] =  useState("metric"); 

    function getUnit(unit){
        setUnitShowed(unit);
    }

    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <RadioSelectUnit unitSelected={getUnit}/>
            {unitShowed === "metric" ? <InputMetric /> : <InputImperial /> }
        </div>

    );
}
