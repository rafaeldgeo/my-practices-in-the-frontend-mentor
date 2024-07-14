import React, {useState} from "react";
import "../components/Calculator.css"
import RadioSelectUnit from "./RadioSelectUnit";
import Form from "./Form";

export default function Calculator(){

    const [unitShowed, setUnitShowed] =  useState("metric"); 

    function getUnit(unit){
        setUnitShowed(unit);
    }

    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <RadioSelectUnit unitSelected={getUnit}/>
            <Form show={unitShowed}></Form>
            <div className="result">
                <div className="result__score">
                    <h5 className="result__title">Your BMI is...</h5>
                    <span className="result__bmi">23.4</span>
                </div>
                <div className="result__comment-wrapper">
                    <p className="result__comment">Your BMI suggests you're a healthy weight Your ideal weight is between <strong>63.3kgs-85.2kgs.</strong></p>
                </div>
            </div>
        </div>

    );
}
