import React, {useId} from "react";
import "../components/Calculator.css"

export default function Calculator(){

    const id = useId(); 
    
    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <div className="calculator__unit-btns">      
                <button className="btn" id={id + "metric"}>
                    <div className="btn__radio btn__radio--on">
                        <div className="btn__select btn__select--on"></div>
                    </div>
                    <span className="btn__label">Metric</span>
                </button>
                <button className="btn" id={id + "imperial"}>
                    <div className="btn__radio">
                        <div className="btn__select"></div>
                    </div>
                    <span className="btn__label">Imperial</span>
                </button>
            </div>
        </div>

    );
}
