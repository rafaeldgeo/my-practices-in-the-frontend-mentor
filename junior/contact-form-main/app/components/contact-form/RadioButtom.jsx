function BtnRadio(){

    return(
        <div className="radio-button" role="radio" aria-checked="false" tabIndex="0" data-value="valor" id="radio" name="query_type">
            <div className="radio-button__circle"></div>
            <label className="radio-button__label" htmlFor="radio">General Enquiry</label>
        </div>
    );
}

export default function RadioButtom(){

    return(
        <>
            <BtnRadio></BtnRadio>
            <BtnRadio></BtnRadio>
        </>
    );
}