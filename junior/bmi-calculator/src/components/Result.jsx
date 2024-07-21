import React from "react";
import "../components/Result.css";

export default function Result({bmi, classfication, idealWeightStart, idealWeightStartImperial, idealWeightEnd, idealWeightEndImperial, unit, unitImperial}){

    return(
        <div className="result">
                <div className="result__score">
                    <h5 className="result__title">Your BMI is...</h5>
                    <span className="result__bmi">{bmi}</span>
                </div>
                <div className="result__comment-wrapper">
                    <p className="result__comment">Your BMI suggests you're a {classfication}. Your ideal weight is between <strong>{idealWeightStart}{unit} {idealWeightStartImperial}{unitImperial} - {idealWeightEnd}{unit} {idealWeightEndImperial}{unitImperial}.</strong></p>
                </div>
            </div>
    );
}