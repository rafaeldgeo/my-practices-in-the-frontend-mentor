import React,{ useState, useEffect } from "react";
import "../components/Form.css";
import Result from "./Result";

export default function FormImperial(){

    const [formImperial, setFormImperial] = useState({
        height: "",
        weight: "",
        heightin: "",
        weightlbs: "",
    });

    const [resultBmi, setResultBmi] = useState("");
    const [welcome, setWelcome ] = useState(true);
    const [classficationBmi, setClassificationBmi ] = useState("");
    const [idealWeight, setIdealWeight] = useState({
        startrangest: "",
        startrangelbs: "",
        endrangest: "",
        endrangelbs: "",
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
        }
    },[resultBmi]);

    function handleChange(e){
        if (e.target.value >= 0) {
            setFormImperial({
                ...formImperial,
                [e.target.name]: e.target.value
            });
        } 
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
          validImput();
        }
    }

    function validImput(){ 
        if (formImperial.heightin.length > 0 && formImperial.weightlbs > 0) {
            if (formImperial.height > 0 && formImperial.height <= 8 && formImperial.weight > 0 && formImperial.weight <= 93 && formImperial.heightin >= 0 && formImperial.heightin <= 11 && formImperial.weightlbs >= 0 && formImperial.weightlbs <= 13) {
                let height = convertImperialHeightToMetric(formImperial.height, formImperial.heightin);
                let weight = convertImperialWeightToMetric(formImperial.weight,formImperial.weightlbs);
                calcBmi(height, weight);
                setWelcome(false)
            } else {
                setWelcome(true);
            }
        }
    }

    function calcBmi(height, weight){
        setResultBmi((weight / (height * height)).toFixed(1));
        calcIdealWeight(height.toFixed(2));
    }
    
    function calcIdealWeight(height){
        let startRangeMetric = 18.5 * (height * height);
        let endRangeMetric = 24.9 * (height * height);
        let startRangeImperia = convertResultWeight(startRangeMetric);
        let endRangeImperial = convertResultWeight(endRangeMetric);
        setIdealWeight({
            startrangest: startRangeImperia[0].toFixed(0),
            startrangelbs: startRangeImperia[1].toFixed(0),
            endrangest: endRangeImperial[0].toFixed(0),
            endrangelbs: endRangeImperial[1].toFixed(0),
        })
    }

    function convertImperialHeightToMetric(foot, inches){
        let heightInches = (Number(foot) * 12) + Number(inches);
        let heightMeters = (heightInches * 2.54) / 100;
        return heightMeters;
    }

    function convertImperialWeightToMetric(stone, libras){
        let weightLibras = (Number(stone) * 14) + Number(libras);
        let weightKg = weightLibras * 0.453592;
        return weightKg;
    }

   function convertResultWeight(rangeMetric){
        let weightConvertToLibras = rangeMetric * 2.20;
        let weightConvertToStones = weightConvertToLibras / 14;
        let weightFindLibras = weightConvertToStones.toFixed(0) * 14;
        let weightLibras = 0;
        if (weightConvertToLibras > weightFindLibras) {
            weightLibras = weightConvertToLibras - weightFindLibras;
        } else {
            weightLibras = weightFindLibras - weightConvertToLibras;
        }
        return [weightConvertToStones, weightLibras];
    }

    return(
        <>
            <form className="form" >
                <div className="form__field-wrapper form__field-wrapper-imperial form__field-wrapper-imperial--first">
                    <label className="form__field" htmlFor="height">
                        <span className="form__label">Height</span>
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="height" name="height" placeholder="0" tabIndex={0} onBlur={validImput} value={formImperial.height} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">ft</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="heightin">
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="heightin" name="heightin"  placeholder="0" tabIndex={0} onBlur={validImput} value={formImperial.heightin} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">in</span>
                        </div>
                    </label>
                </div>
                <div className="form__field-wrapper form__field-wrapper-imperial">
                    <label className="form__field" htmlFor="weight">
                        <span className="form__label">Weight</span>
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="weight" name="weight" placeholder="0" tabIndex={0} onBlur={validImput} value={formImperial.weight} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">st</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weightlbs">
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="weightlbs" name="weightlbs"  placeholder="0" tabIndex={0} onBlur={validImput} value={formImperial.weightlbs} onChange={handleChange} onKeyDown={handleEnter}/>
                            <span className="form__unit">lbs</span>
                        </div>
                    </label>
                </div> 
            </form>
            <Result show={welcome} bmi={resultBmi} classfication={classficationBmi} idealWeightStart={idealWeight.startrangest} idealWeightStartImperial={idealWeight.startrangelbs} idealWeightEnd={idealWeight.endrangest} idealWeightEndImperial={idealWeight.endrangelbs} unit="st" unitImperial="lbs"/>
        </>
    );
}