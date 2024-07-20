import React,{ useState, useEffect } from "react";
import "../components/Form.css";

export default function FormImperial(){

    const [formImperial, setFormImperial] = useState({
        height: "",
        weight: "",
        heightin: "",
        weightlbs: "",
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
        setFormImperial({
            ...formImperial,
            [e.target.name]: e.target.value
        });
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
          calcImperial();
        }
    }

    function calcImperial(){
        if (formImperial.height > 0 && formImperial.weight > 0 && formImperial.heightin !== "" && formImperial.weightlbs !== "" ) {
            let heightIn = 12 * Number(formImperial.height) + Number(formImperial.heightin);
            let weightLbs = (Number(formImperial.weight) * 14) + Number(formImperial.weightlbs);
            setResultBmi((weightLbs / (heightIn * heightIn) * 703).toFixed(1));
            calcIdealWeight(heightIn)
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
            startrange: startRange.toFixed(2), endrange: endRange.toFixed(2)
        })
    }

    return(
        <>
            <form className="form" >
                <div className="form__field-imperial-wrapper">
                    <label className="form__field" htmlFor="height">
                        Height
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="height" name="height" placeholder="0" tabIndex={0} onBlur={calcImperial} value={formImperial.height} onChange={handleChange}/>
                            <span className="form__unit">ft</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="heightin">
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="heightin" name="heightin"  placeholder="0" tabIndex={0} onBlur={calcImperial} value={formImperial.heightin} onChange={handleChange}/>
                            <span className="form__unit">in</span>
                        </div>
                    </label>
                </div>
                <div className="form__field-imperial-wrapper">
                    <label className="form__field" htmlFor="weight">
                        Weight
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="weight" name="weight" placeholder="0" tabIndex={0} onBlur={calcImperial} value={formImperial.weight} onChange={handleChange}/>
                            <span className="form__unit">st</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weightlbs">
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="weightlbs" name="weightlbs"  placeholder="0" tabIndex={0} onBlur={calcImperial} value={formImperial.weightlbs} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">lbs</span>
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
                    <p className="result__comment">Your BMI suggests you're a {classficationBmi}. Your ideal weight is between <strong>{idealWeight.startrange}lbs - {idealWeight.endrange}lbs.</strong></p>
                </div>
            </div>
        </>
        
        
    );
}