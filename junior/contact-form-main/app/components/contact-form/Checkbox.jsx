export default function CheckBox({onCheck, isChecked}){
    return(
        <div className="checkbox" onClick={onCheck} onKeyDown={onCheck}>
            <div className={"checkbox__square " + (isChecked ? "checkbox__square--checked" : "")} role="checkbox" aria-checked={(isChecked ? "true" : "false")} aria-labelledby="checkbox" tabIndex="0">
            </div>
            <span className="form__label" id="checkbox">I consent to being contacted by the team <span className="form__required">*</span></span> 
        </div>
    );
}