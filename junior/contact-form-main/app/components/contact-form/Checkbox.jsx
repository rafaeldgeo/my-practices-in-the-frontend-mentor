export default function CheckBox({onCheck, isChecked}){
    return(
        <div className="checkbox">
            <div className={"checkbox__square " + (isChecked ? "checkbox__square--checked" : "")} role="checkbox" aria-checked={(isChecked ? "true" : "false")} aria-labelledby="checkbox" tabIndex="0" onClick={onCheck} onKeyDown={onCheck}>
            </div>
            <span className="form__label" id="checkbox" onClick={onCheck}>I consent to being contacted by the team <span className="form__required">*</span></span> 
        </div>
    );
}