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
            <div className="calculator__result">
                <div className="calculator__score">
                    <h5 className="calculator__subtitle">Your BMI is...</h5>
                    <span className="calculator__bmi">23.4</span>
                </div>
                <div className="calculator__comment-wrapper">
                    <p className="calculator__comment">Your BMI suggests you're a healthy weight Your ideal weight is between <strong>63.3kgs-85.2kgs</strong></p>
                </div>

            </div>
        </div>

    );
}
