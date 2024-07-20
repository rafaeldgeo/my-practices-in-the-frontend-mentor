import React,{ useState, useEffect } from "react";
import "../components/Form.css";

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
          calcMetric();
        }
    }

    function calcMetric(){
        if (formMetric.height > 0 && formMetric.weight > 0) {
            let height = Number(formMetric.height) / 100;
            let weight = Number(formMetric.weight);
            setResultBmi((weight / (height * height)).toFixed(1));
            calcIdealWeight(height);
        } else {
            setResultBmi("-");
            setIdealWeight({
                startrange: "...", 
                endrange: "..."
            });
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
        <>
            <form className="form" >
                <div className="form__field-metric-wrapper">
                    <label className="form__field" htmlFor="height">
                        Height
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="height" name="height" placeholder="0" tabIndex={0} onBlur={calcMetric} value={formMetric.height} onChange={handleChange}/>
                            <span className="form__unit">cm</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weight">
                        Weight
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="weight" name="weight"  placeholder="0" tabIndex={0} onBlur={calcMetric} value={formMetric.weight} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">kg</span>
                        </div>
                    </label>
                </div>
            </form>
            <div className="result">
                <div className="result__score">
                    <h5 className="result__title">Your BMI is...</h5>
                    <span className="result__bmi">{resultBmi}</span>
                </div>
                <div className="result__comment-wrapper">
                    <p className="result__comment">Your BMI suggests you're a {classficationBmi}. Your ideal weight is between <strong>{idealWeight.startrange}kgs - {idealWeight.endrange}kgs.</strong></p>
                </div>
            </div>
        </>
        
        
    );
}