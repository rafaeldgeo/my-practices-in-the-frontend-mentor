import React from "react";
import "./ResultTip.css";


export default function ResultTip(){

    return(
        <div className="result-tip">
            <div className="result">
                <div className="result__tip">
                    <div>
                        <h2 className="result__label">Tip Amount</h2>
                        <span className="result__per-person">/ person</span>
                    </div>
                    <div><span className="result__value">$ 4.27</span></div>
                </div>
                {/* <div className="result__tip">
                    <h2 className="result__label">Tip Amount<span className="result__per-person">/ person</span></h2>
                    <span className="result__value">$ 32.79</span>
                </div> */}
            </div>
            <div className="btn">
                <button className="btn__reset" type="button">Reset</button>
            </div>
        </div>
    );
}