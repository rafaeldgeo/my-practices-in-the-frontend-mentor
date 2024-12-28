"use client";

import { Karla } from "next/font/google";
import { useState } from "react";
import CheckBox from "@/app/components/contact-form/Checkbox";
import RadioButtom from "@/app/components/contact-form/RadioButtom";
import Dialog from "@/app/components/dialog/Dialog";

const karla = Karla({
    weight: ["400", "700"],
    subsets: ["latin"],
    fallback: ['sans-serif']
  });
 
export default function ContactForm(){

    const [isCheckedCheckBox, setIsCheckedCheckBox] = useState(false);
    const [isSelectedRadio, setIsSelecedRadio] = useState("");
    const [formInputs, setFormInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        querytype: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [dialogShow, setDialogShow] = useState("");

    // handle Checkbox Component
    const handleCheckBox = () => {
        const isCheck = !isCheckedCheckBox ? true : false;
        setIsCheckedCheckBox(isCheck);
    }

    // handle RadioButton Component
    const handleRadioButton = (e) => {
        const selectedValue = e.dataset.value;
        setIsSelecedRadio(selectedValue);
        setFormInputs({...formInputs, querytype: selectedValue });
    }

    // handle inputs
    const handleChange = (e) => {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        });
    }

    // validate the email when happens blur
    const handleBlurValidEmail = () => {
        const newErrors = {};
        const email = formInputs.email;
        const messageErrorEmail = "Please enter a valid email address";
        if (email.length > 0 && !email.includes("@")) newErrors.email = messageErrorEmail;  
        setErrors(newErrors);
    }

    // validate the inputs
    const validForm = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        const messageError = "This field is required";
        
        const messageErrorRadioButton = "Please select a query type";
        const messageErroCheckBox = "To submit this form, please consent to being contacted";

        if (!formInputs.firstname) newErrors.firstname = messageError;
        if (!formInputs.lastname) newErrors.lastname = messageError;
        if (!formInputs.email) newErrors.email = messageError;
        if (!formInputs.querytype) newErrors.querytype = messageErrorRadioButton;
        if (!formInputs.message) newErrors.message = messageError;
        if (!isCheckedCheckBox) newErrors.isCheckedCheckBox = messageErroCheckBox;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } 
        setErrors({});
        setFormInputs({
                firstname: "",
                lastname: "",
                email: "",
                querytype: "",
                message: "",
        });
        setIsSelecedRadio("");
        setIsCheckedCheckBox(false);
        showDialog();
    }

    // handle dialog after sent
    const showDialog = () => {
        setDialogShow("open");
        setTimeout(() => {
            setDialogShow("");
        }, 2000);
    }

    return(
        <div className="form-contact">
            <Dialog onShow={dialogShow}></Dialog> 
            <h1 className="form-contact__title">Contact Us</h1>
            <form className="form" onSubmit={validForm} noValidate>
                <div className="form__input-name">
                    <div className="form__input-wrapper">
                        <label className="form__label" htmlFor="firstname">First Name <span className="form__required">*</span>
                        </label>
                        <input className={"form__input " + (errors.firstname && "form__input--error")} type="text" name="firstname" id="firstname" autoComplete="given-name" onChange={handleChange} value={formInputs.firstname}/>
                        {errors.firstname && <span className="form__error">{errors.firstname}</span>} 
                    </div>
                    <div className="form__input-wrapper">
                        <label className="form__label" htmlFor="lastname">Last Name <span className="form__required">*</span></label>
                        <input className={"form__input " + (errors.lastname && "form__input--error")} type="text" name="lastname" id="lastname" autoComplete="family-name" onChange={handleChange} value={formInputs.lastname}/>
                        {errors.lastname && <span className="form__error">{errors.lastname}</span>} 
                    </div>
                </div>
                <div className="form__input-wrapper">
                    <label className="form__label" htmlFor="email">Email Address<span className="form__required">*</span></label>
                    <input  className={"form__input " + (errors.email && "form__input--error")} type="text" name="email" id="email" autoComplete="email" onChange={handleChange} onBlur={handleBlurValidEmail} value={formInputs.email}/>
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
                    <textarea className={"form__input " + (errors.message && "form__input--error")} name="message" id="message" rows="3" autoComplete="off" onChange={handleChange} value={formInputs.message}></textarea>
                    {errors.message && <span className="form__error">{errors.message}</span>} 
                </div>
                <div className="form__input-wrapper">
                    <CheckBox onCheck={handleCheckBox} isChecked={isCheckedCheckBox}></CheckBox>
                    {errors.isCheckedCheckBox && <span className="form__error">{errors.isCheckedCheckBox}</span>} 
                </div>
                <input className={`${karla.className} form__btn`} type="submit" value="Submit" />
            </form>
        </div>
    );
}