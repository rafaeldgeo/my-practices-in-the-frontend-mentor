import React from "react";
import "./ResultTip.css";


export default function ResultTip(){

    return(
        <div className="result-tip">
            <div className="result">
                <div className="result__tip">
                    <h2 className="result__label">Tip Amount<span className="result__by-person" aria-label="division by person">/ person</span></h2>
                    <span className="result__value" aria-label="value">0.00</span>
                </div>
                <div className="result__tip">
                    <h2 className="result__label">Total<span className="result__by-person" aria-label="division by person">/ person</span></h2>
                    <span className="result__value" aria-label="value">0.00</span>
                </div>
            </div>
            <div className="btn">
                <button className="btn__reset" type="button">Reset</button>
            </div>
        </div>
    );
}