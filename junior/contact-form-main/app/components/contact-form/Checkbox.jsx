export default function CheckBox({onCheck, isChecked}){
    return(
        <div className="checkbox">
            <div className={"checkbox__square " + (isChecked ? "checkbox__square--checked" : "")} id="checkbox" role="checkbox" aria-checked={(isChecked ? "true" : "false")} tabIndex="0" onClick={onCheck} onKeyDown={onCheck}>
            </div>
            <label className="form__label" htmlFor="checkbox" onClick={onCheck}>I consent to being contacted by the team <span className="form__required">*</span></label> 
        </div>
    );
}