import React,{ useState } from "react";
import "../components/Form.css";

export default function Form({show, valuesInput}){

    const [formMetric, setFormMetric] = useState({
        height: "",
        weight: "",
    });

    const [formImperial, setFormImperial] = useState({
        height: "",
        weight: "",
        heightin: "",
        weightlbs: "",
    });

    function handleSendValues(){
        if (show === 0) {
            valuesInput(formMetric);
        } else {
            valuesInput(formImperial);
        }
    }

    function handleChange(e){
        if (show === 0) {
            setFormMetric({
                ...formMetric,
                [e.target.name]: e.target.value
            });
        } else {
            setFormImperial({
                ...formImperial,
                [e.target.name]: e.target.value
            });
        }
    }

    return(
        <form className="form" >
            {show === 0 ? 
            (<>
                 {/* metric */}
                <div className="form__field-metric-wrapper">
                    <label className="form__field" htmlFor="height">
                        Height
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="height" name="height" placeholder="0" tabIndex={0} min={0} max={251} onBlur={handleSendValues} value={formMetric.height} onChange={handleChange}/>
                            <span className="form__unit">cm</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weight">
                        Weight
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="weight" name="weight"  placeholder="0" tabIndex={0} min={0} max={600} onBlur={handleSendValues} value={formMetric.weight} onChange={handleChange}/>
                            <span className="form__unit">kg</span>
                        </div>
                    </label>
                </div>
            </>) : 
            (<>
                {/* imperial */}
                <div className="form__field-imperial-wrapper">
                <label className="form__field" htmlFor="height">
                        Height
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="height" name="height" placeholder="0" tabIndex={0} min={0} max={10} onBlur={handleSendValues} value={formImperial.height} onChange={handleChange}/>
                            <span className="form__unit">ft</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="heightin">
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="heightin" name="heightin"  placeholder="0" tabIndex={0} min={0} onBlur={handleSendValues} value={formImperial.heightin} onChange={handleChange}/>
                            <span className="form__unit">in</span>
                        </div>
                    </label>
                </div>
                <div className="form__field-imperial-wrapper">
                    <label className="form__field" htmlFor="weight">
                        Weight
                        <div className="form__input-wrapper" >
                            <input className="form__input" type="number" id="weight" name="weight" placeholder="0" tabIndex={0} min={0} max={50} onBlur={handleSendValues} value={formImperial.weight} onChange={handleChange}/>
                            <span className="form__unit">st</span>
                        </div>
                    </label>
                    <label className="form__field" htmlFor="weightlbs">
                        <div className="form__input-wrapper">
                            <input className="form__input" type="number" id="weightlbs" name="weightlbs"  placeholder="0" tabIndex={0} min={0} onBlur={handleSendValues} value={formImperial.weightlbs} onChange={handleChange}/>
                            <span className="form__unit">lbs</span>
                        </div>
                    </label>
                </div> 
            </>)}
        </form>
    );
}