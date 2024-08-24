import React from "react";
import "../components/Result.css";

export default function Result({show, bmi, classfication, idealWeightStart, idealWeightStartImperial, idealWeightEnd, idealWeightEndImperial, unit, unitImperial}){

    const score = (
        <div className="result result--score">
                <div className="result__value">
                        <h5 className="result__title">Your BMI is...</h5>
                        <span className="result__bmi">{bmi}</span>
                    </div>
                    <div className="result__comment-wrapper">
                        <p className="result__comment">Your BMI suggests you're a {classfication}. Your ideal weight is between <strong>{idealWeightStart}{unit} {idealWeightStartImperial}{unitImperial} - {idealWeightEnd}{unit} {idealWeightEndImperial}{unitImperial}.</strong></p>
                </div>
           </div>
    );

    const welcome = (
        <div className="result result--welcome">
                <span className="result__title result__title--welcome">Welcome!</span>
                <p className="result__comment">Enter your height and weight and you’ll see your BMI result here</p>
        </div>
    );


    return(show ? welcome : score);
}