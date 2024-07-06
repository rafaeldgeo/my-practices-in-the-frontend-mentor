import React, { useId } from "react";
import "../components/Form.css";

export default function InputMetric(){

    const idInput = useId();

    return(
        <form className="form">
            <div className="form__field">
                <span className="form__label" htmlFor={idInput}>Height</span>
                <label className="form__input-wrapper" htmlFor={idInput} tabIndex={0}>
                    <input className="form__input" type="number" id={idInput} placeholder="0" min={0}/>
                    <span className="form__unit">cm</span>
                </label>
                
            </div>
            
        </form>
    );
}