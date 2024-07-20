import React, {useState} from "react";
import "../components/Calculator.css"
import RadioSelectUnit from "./RadioSelectUnit";
import FormMetric from "./FormMetric";
import FormImperial from "./FormImperial";

export default function Calculator(){

    const [unitShowed, setUnitShowed] =  useState(0);
        
    function getUnit(unit){
        setUnitShowed(unit);
    }

    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <RadioSelectUnit unitSelected={getUnit}/>
            {unitShowed === 0 ? <FormMetric /> : <FormImperial /> }
        </div>
    );
}
