import React, { useReducer } from "react";
import "../components/RadioSelectUnit.css";

export default function RadioSelectUnit({choice}){

    const [state, dispatch] = useReducer(reducer, {
        metricSelected: true,
        imperialSeleced: false
    });

    function reducer(state, action) {
        switch(action.type) {
            case "metric":
                return {
                    metricSelected: true,
                    imperialSelected: false
                }
            case "imperial":
                return {
                    metricSelected: false,
                    imperialSelected: true
                }
            default:
        }
    }

    function handleClickMetric(){
        dispatch({type: "metric"});
        choice("metric");
    }

    function handleClickImperial(){
        dispatch({type: "imperial"});
        choice("imperial");
    }
   
    return(
        <div className="btn__wrapper">      
            <button className="btn" onClick={handleClickMetric} aria-label="Metric">
                <div className={state.metricSelected ? "btn__radio btn__radio--checked": "btn__radio"}>
                    <div className={state.metricSelected ? "btn__selected": ""}></div>
                </div>
                <span className="btn__label">Metric</span>
            </button>
            <button className="btn" onClick={handleClickImperial} aria-label="Imperial">
                <div className={state.imperialSelected ? "btn__radio btn__radio--checked": "btn__radio"}>
                    <div className={state.imperialSelected ? "btn__selected": ""}></div>
                </div>
                <span className="btn__label">Imperial</span>
            </button>
        </div>
    );
}