"use client";

import { useState } from "react";
import CheckBox from "@/app/components/contact-form/Checkbox";
import RadioButtom from "@/app/components/contact-form/RadioButtom";
import { Karla } from "next/font/google";

const karla = Karla({
    weight: ["400", "700"],
    subsets: ["latin"],
    fallback: ['sans-serif']
  });
 
export default function ContactForm(){

    const [isCheckedCheckBox, setIsCheckedCheckBox] = useState(false);
    const [isSelectedRadio, setIsSelecedRadio] = useState("");
    const [formInputs, setFormInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleCheckBox = () => {
        const isCheck = !isCheckedCheckBox ? true : false;
        setIsCheckedCheckBox(isCheck);
    }

    const handleRadioButton = (e) => {
        const selectedValue = e.dataset.value;
        setIsSelecedRadio(selectedValue);
        const querytype = selectedValue;
        setFormInputs({...formInputs, querytype });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // get inputs
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        let email = formData.get("email");
        const message = formData.get("message");

        // valid inputs
        const newErrors = {}
        const messageError = "This field is required";
        if (!firstname) newErrors.firstname = messageError;
        if (!lastname) newErrors.lastname = messageError;
        if (!email) {
            newErrors.email = messageError;
        } else if (!email.includes("@")) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!isSelectedRadio) newErrors.querytype = messageError;
        if (!message) newErrors.message = messageError;

        // if there are errors, update erros and don't send
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // if there aren't errors, clear the errors and upadate inputs
        setErrors({});
        setFormInputs({...formInputs, firstname, lastname, email, message});
    }

    return(
        <div className="form-contact">
            <h1 className="form-contact__title">Contact Us</h1>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="form__inputs">
                    <div className="form__input-name">
                        <div className="form__input-wrapper">
                            <label className="form__label" htmlFor="firstname">First Name <span className="form__required">*</span>
                            </label>
                            <input className={"form__input " + (errors.firstname && "form__input--error")} type="text" name="firstname" id="firstname" autoComplete="given-name"/>
                            {errors.firstname && <span className="form__error">{errors.firstname}</span>}
                        </div>
                        <div className="form__input-wrapper">
                            <label className="form__label" htmlFor="lastname">Last Name <span className="form__required">*</span></label>
                            <input className={"form__input " + (errors.lastname && "form__input--error")} type="text" name="lastname" id="lastname" autoComplete="family-name"/>
                            {errors.lastname && <span className="form__error">{errors.lastname}</span>}
                        </div>
                    </div>
                    <div className="form__input-wrapper">
                        <label className="form__label" htmlFor="email">Email Address<span className="form__required">*</span></label>
                        <input className={"form__input " + (errors.email && "form__input--error")} type="text" name="email" id="email" autoComplete="email"/>
                        {errors.email && <span className="form__error">{errors.email}</span>}
                    </div>
                    <div className="form__input-query" role="radiogroup" aria-labelledby="group-label">
                        <h2 className="form__label" id="group-label">Query Type<span className="form__required">*</span></h2>
                        <div className="form__query-wrapper">
                            <RadioButtom onSelected={handleRadioButton} isSelected={isSelectedRadio}></RadioButtom>
                        </div>
                        {errors.querytype && <span className="form__error">{errors.querytype}</span>}
                    </div>
                    <div className="form__input-wrapper">
                        <label className="form__label" htmlFor="message">Message<span className="form__required">*</span></label>
                        <textarea className={"form__input " + (errors.message && "form__input--error")} name="message" id="message" rows="3" autoComplete="off"></textarea>
                        {errors.message && <span className="form__error">{errors.message}</span>}
                    </div>
                </div>
                <CheckBox onCheck={handleCheckBox} isChecked={isCheckedCheckBox}></CheckBox>
                <input className={`${karla.className} form__btn`} type="submit" />
                <p>{formInputs.firstname}</p>
            </form>
        </div>
    );
}