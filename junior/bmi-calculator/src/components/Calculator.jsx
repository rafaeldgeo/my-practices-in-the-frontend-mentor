import React, {useState} from "react";
import "../components/Calculator.css"
import SelectUnit from "./SelectUnit";
import InputMetric from "./InputMetric";
import InputImperial from "./InputImperial";

export default function Calculator(){

    const [teste, setTeste] =  useState("metric"); 

   /*  const [state, dispatch] = useReducer(reducer, {
        metric: true,
        imperial: false
    });

    const btnRadio = {
            metric: {
                border: state.metric ? "none" : "1px solid #5E6E85",
                backgroundColor: state.metric ? "#CED8FD" : "transparent"
            },
            imperial: {
                border: state.imperial ? "none" : "1px solid #5E6E85",
                backgroundColor: state.imperial ? "#CED8FD" : "transparent"
            }
    };

    const radioSelect = {
        metric: {
            backgroundColor: state.metric ? "#345FF6" : "transparent"
        },
        imperial: {
            backgroundColor: state.imperial ? "#345FF6" : "transparent"
        }
    }

    function reducer(state, action) {
        switch(action.type) {
            case "metric":
                return {
                    metric: true,
                    imperial: false
                }
            case "imperial":
                return {
                    metric: false,
                    imperial: true
                }
            default:
        }
    }

    function handleClickMetric(){
        dispatch({type: "metric"});
    }

    function handleClickImperial(){
        dispatch({type: "imperial"});
    }
 */  

    function mensagem(valor){
        setTeste(() => {
            return valor === "metric" ? "metric" : "imperial";
        });
    }
    return(
        <div className="calculator">
            <h4 className="calculator__title">Enter your details below</h4>
            <SelectUnit choice={mensagem}></SelectUnit>
            {/* <div className="calculator__unit-btns">      
                <button className="btn" onClick={handleClickMetric} aria-label="Metric">
                    <div className="btn__radio" style={btnRadio.metric}>
                        <div className="btn__select" style={radioSelect.metric}></div>
                    </div>
                    <span className="btn__label">Metric</span>
                </button>
                <button className="btn" onClick={handleClickImperial} aria-label="Imperial">
                    <div className="btn__radio" style={btnRadio.imperial}>
                        <div className="btn__select" style={radioSelect.imperial}></div>
                    </div>
                    <span className="btn__label">Imperial</span>
                </button>
            </div> */}
            {teste === "metric" ? <InputMetric /> : <InputImperial/>}
        </div>

    );
}
