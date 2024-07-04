import React, { useReducer } from "react";
import "../components/SelectUnit.css";

export default function SelectUnit({choice}){

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

    function defineStyleRadio(unit) {
        const style = {
            border: unit ? "none" : "1px solid #5E6E85",
            backgroundColor: unit ? "#CED8FD" : "transparent"
        };
        return style;
    }

    const styleRadioMetric = defineStyleRadio(state.metricSelected);
    const styleRadioImperial = defineStyleRadio(state.imperialSelected);

    function defineRadioSelect(unit){
        const style = { backgroundColor: unit ? "#345FF6" : "transparent" };
        return style;
    }

    const styleSelectMetric = defineRadioSelect(state.metricSelected);
    const styleSelectImperial = defineRadioSelect(state.imperialSelected);
        
    return(
        <div className="btn__wrapper">      
            <button className="btn" onClick={handleClickMetric} aria-label="Metric">
                <div className="btn__radio" style={styleRadioMetric}>
                    <div className="btn__select" style={styleSelectMetric}></div>
                </div>
                <span className="btn__label">Metric</span>
            </button>
            <button className="btn" onClick={handleClickImperial} aria-label="Imperial">
                <div className="btn__radio" style={styleRadioImperial}>
                    <div className="btn__select" style={styleSelectImperial}></div>
                </div>
                <span className="btn__label">Imperial</span>
            </button>
        </div>
    );
}