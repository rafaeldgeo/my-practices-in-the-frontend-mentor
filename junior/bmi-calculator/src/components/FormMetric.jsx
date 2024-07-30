import React,{ useState, useEffect } from "react";
import "../components/Form.css";
import Result from "./Result";

export default function FormMetric(){

    const [formMetric, setFormMetric] = useState({
        height: "",
        weight: "",
    });
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
        } else if (resultBmi === "-") {
            setClassificationBmi("...");
        }
    },[resultBmi]);

    function handleChange(e){
        setFormMetric({
            ...formMetric,
            [e.target.name]: e.target.value
        });
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            validImput();
        }
    }

    function validImput(){
        if (formMetric.height > 0 && formMetric.weight > 0){
            let height = Number(formMetric.height) / 100;
            let weight = Number(formMetric.weight);
            calcBmi(height, weight);
        } else {
            setResultBmi("-");
            setIdealWeight({
                startrange: "...",
                endrange: "..."
            });
        }
    }

    function calcBmi(height, weight){
        setResultBmi((weight / (height * height)).toFixed(1));
        calcIdealWeight(height.toFixed(2));
    }

    function calcIdealWeight(height){
        let startRange = 18.5 * (height * height);
        let endRange = 24.9 * (height * height);
        setIdealWeight({
            startrange: startRange.toFixed(1), endrange: endRange.toFixed(1)
        })
    }

    return(
        <>
            <form className="form" >
                <div className="form__field-metric-wrapper">
                    <label className="form__field" htmlFor="height">
                        <span className="form__label">Height</span>
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="height" name="height" placeholder="0" tabIndex={0} onBlur={validImput} value={formMetric.height} onChange={handleChange}/>
                            <span className="form__unit">cm</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weight">
                        <span className="form__label">Weight</span>
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="weight" name="weight"  placeholder="0" tabIndex={0} onBlur={validImput} value={formMetric.weight} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">kg</span>
                        </div>
                    </label>
                </div>
            </form>
            <Result bmi={resultBmi} classfication={classficationBmi} idealWeightStart={idealWeight.startrange} idealWeightEnd={idealWeight.endrange} unit="kgs"/> 
        </>
    );
}