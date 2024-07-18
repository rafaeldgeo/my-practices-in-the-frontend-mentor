import React, {useState, useEffect} from "react";
import "../components/Calculator.css"
import RadioSelectUnit from "./RadioSelectUnit";
import Form from "./Form";

export default function Calculator(){

    const [unitShowed, setUnitShowed] =  useState("metric"); 
    const [resultBmi, setResultBmi] = useState("-");
    const [classficationBmi, setClassificationBmi ] = useState("...");
    const [idealWeight, setIdealWeight] = useState({
        startrange: "...",
        endrange: "..."
    });
    
    useEffect(()=> {
        if (resultBmi < 18.5) {
            setClassificationBmi("underweight");
        } else if (resultBmi < 25){
            setClassificationBmi("healthy weight");
        } else if (resultBmi < 30) { 
            setClassificationBmi("overweight");
        } else if (resultBmi > 30) {
            setClassificationBmi("obese");
        } else {
            setClassificationBmi("...");
        }
    },[resultBmi]);
    
    function getUnit(unit){
        setUnitShowed(unit);
    }

    function getValues(values){
        if (unitShowed === 0) {
            calcMetric(values);
        } else if (unitShowed === 1) {
            calcImperial(values);
        } 
    }

    function calcMetric(values){
        if (values.height > 0 && values.weight > 0) {
            let height = Number(values.height) / 100;
            let weight = Number(values.weight);
            setResultBmi((weight / (height * height)).toFixed(1));
            calcIdealWeight(height);
        } else {
            setResultBmi("-");
        }
    }

    function calcImperial(values){
        if (values.height > 0 && values.weight > 0 && values.heightin !== "" && values.weightlbs !== "" ) {
            let heightIn = 12 * Number(values.height) + Number(values.heightin);
            let weightLbs = (Number(values.weight) * 14) + Number(values.weightlbs);
            setResultBmi((weightLbs / (heightIn * heightIn) * 703).toFixed(1));
        } else {
            setResultBmi("-");
        }
    }

    function calcIdealWeight(height){
        let startRange = 18.5 * (height * height);
        let endRange = 24.9 * (height * height);
        setIdealWeight({
            startrange: startRange.toFixed(1), endrange: endRange.toFixed(1)
        })
    }

    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <RadioSelectUnit unitSelected={getUnit}/>
            <Form show={unitShowed} valuesInput={getValues}></Form>
            <div className="result">
                <div className="result__score">
                    <h5 className="result__title">Your BMI is...</h5>
                    <span className="result__bmi">{resultBmi}</span>
                </div>
                <div className="result__comment-wrapper">
                    <p className="result__comment">Your BMI suggests you're a {classficationBmi} Your ideal weight is between <strong>{idealWeight.startrange}-{idealWeight.endrange}.</strong></p>
                </div>
            </div>
        </div>
    );
}
