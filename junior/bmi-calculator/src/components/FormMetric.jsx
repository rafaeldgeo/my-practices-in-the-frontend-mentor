import React, { useState } from "react";
import "../components/Form.css";

export default function InputMetric(){

    const [focus, setFocus] = useState(false);

    function handleFocus(e){
        const formInputWrapper = e.target.parentElement;
        if (focus === false) {
            setFocus(true);
            formInputWrapper.style.borderColor = "var(--blue)";
        } else {
            setFocus(false);
            formInputWrapper.style.borderColor = "var(--dark-eletric-blue)";
        }
    }

    return(
        <form className="form">
            <label className="form__field" htmlFor= "height">
                Height
                <div className="form__input-wrapper" tabIndex={0}>
                    <input className="form__input" type="number" id="height" placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus}/>
                    <span className="form__unit">cm</span>
                </div> 
            </label>
            <label className="form__field" htmlFor= "weight">
                Weight
                <div className="form__input-wrapper" tabIndex={0}>
                    <input className="form__input" type="number" id="weight" placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus}/>
                    <span className="form__unit">kg</span>
                </div> 
            </label>
        </form>
    );
}