import React,{ useState } from "react";
import "../components/Form.css";

export default function Form({show}){

    const [focus, setFocus] = useState(false);
    const [heightMetric, setHeightMetric] = useState("");
    const [weightMetric, setWeightMetric] = useState("");
    const [heightImperialFt, setHeightImperialFt] = useState("");
    const [heightImperialIn, setHeightImperialIn] = useState("");
    const [weightImperialSt, setWeightImperialSt] = useState("");
    const [weightImperialLbs, setWeightImperialLbs] = useState("");

    function handleFocus(e){
        const formInputWrapper = e.target.parentElement;
        if (focus === false) {
            setFocus(true);
            formInputWrapper.classList.add("form__input-wrapper--focus");
        } else {
            setFocus(false);
            formInputWrapper.classList.remove("form__input-wrapper--focus");
        }
    }

    return(
        <form className="form">
            {show === "metric" ? 
            (<>
                 {/* metric */}
                <div className="form__field-metric-wrapper">
                    <label className="form__field" htmlFor="height">
                        Height
                        <div className="form__input-wrapper" tabIndex={0}>
                            <input
                                className="form__input" type="number" id="height" name="height"  placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus}
                                value={heightMetric}
                                onChange={e => setHeightMetric(e.target.value)}/>
                            <span className="form__unit">cm</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weight">
                        Weight
                        <div className="form__input-wrapper" tabIndex={0}>
                            <input
                                className="form__input" type="number" id="weight" name="weight"  placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus} value={weightMetric}
                                onChange={e => setWeightMetric(e.target.value)}/>
                            <span className="form__unit">kg</span>
                        </div>
                    </label>
                </div>
            </>) : 
            (<>
                {/* imperial */}
                <div className="form__field-imperial-wrapper">
                    <label className="form__field" htmlFor="heightft">
                        Height
                        <div className="form__input-wrapper" tabIndex={0}>
                            <input
                                className="form__input" type="number" id="heightft" name="heightft"  placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus}
                                value={heightImperialFt}
                                onChange={e => setHeightImperialFt(e.target.value)}/>
                            <span className="form__unit">ft</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="heightin">
                        <div className="form__input-wrapper" tabIndex={0}>
                            <input
                                className="form__input" type="number" id="heightin" name="heightin"  placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus}
                                value={heightImperialIn}
                                onChange={e => setHeightImperialIn(e.target.value)}/>
                            <span className="form__unit">in</span>
                        </div>
                    </label>
                </div>
                <div className="form__field-imperial-wrapper">
                    <label className="form__field" htmlFor="weightst">
                        Weight
                        <div className="form__input-wrapper" tabIndex={0}>
                            <input 
                                className="form__input" type="number" id="weightst" name="weightst"  placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus} 
                                value={weightImperialSt}
                                onChange={e => setWeightImperialSt(e.target.value)}/>

                            <span className="form__unit">st</span>
                        </div> 
                    </label>
                    <label className="form__field" htmlFor="weightlbs">
                        <div className="form__input-wrapper" tabIndex={0}>
                            <input 
                                className="form__input" type="number" id="weightlbs" name="weightlbs"  placeholder="0" min={0} onFocus={handleFocus} onBlur={handleFocus} 
                                value={weightImperialLbs}
                                onChange={e => setWeightImperialLbs(e.target.value)}/>

                            <span className="form__unit">lbs</span>
                        </div> 
                    </label>
                </div>
                
            </>)}
        </form>
    );
}