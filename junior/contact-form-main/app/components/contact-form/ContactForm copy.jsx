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
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        querytype: "",
        messagem: ""
    });

    const handleCheckBox = () => {
        const isCheck = !isCheckedCheckBox ? true : false;
        setIsCheckedCheckBox(isCheck);
    }

    const handleRadioButton = (e) => {
        const selectedValue = e.dataset.value;
        setIsSelecedRadio(selectedValue);
        setInputs({...inputs,
            querytype: selectedValue,
        });
    }

    const handleInputs = (e) => {
        setInputs({
            firstname: e.trim(),
            lastname: "",
            email: teste(),
            messagem: ""
        })
        console.log(inputs.firstname);

        function teste() {
            console.log("teste")
        }
    } 


    return(
        <div className="form-contact">
            <h1 className="form-contact__title">Contact Us</h1>
            <form className="form" action="#" noValidate>
                <div className="form__inputs">
                    <div className="form__input-name">
                        <div className="form__firstName">
                            <label className="form__label" htmlFor="firstname">First Name <span className="form__required">*</span>
                            </label>
                            <input className="form__input" type="text" name="firstname" id="firstname" onChange={(e) =>  handleInputs(e.target.value)} value={inputs.firstname} autoComplete="given-name"/>
                        </div>
                        <div className="form__lastName">
                            <label className="form__label" htmlFor="lastname">Last Name <span className="form__required">*</span></label>
                            <input className="form__input" type="text" name="lastname" id="lastname" autoComplete="family-name"/>
                        </div>
                    </div>
                    <div className="form__input-email">
                        <label className="form__label" htmlFor="email">Email Address<span className="form__required">*</span></label>
                        <input className="form__input" type="text" name="email" id="email" autoComplete="email"/>
                    </div>
                    <div className="form__input-query" role="radiogroup" aria-labelledby="group-label">
                        <h2 className="form__label" id="group-label">Query Type<span className="form__required">*</span></h2>
                        <div className="form__query-wrapper">
                            <RadioButtom onSelected={handleRadioButton} isSelected={isSelectedRadio}></RadioButtom>
                        </div>
                    </div>
                    <div className="form__input-message">
                        <label className="form__label" htmlFor="message">Message<span className="form__required">*</span></label>
                        <textarea className="form__input" name="message" id="message" rows="3" autoComplete="off"></textarea>
                    </div>
                </div>
                <CheckBox onCheck={handleCheckBox} isChecked={isCheckedCheckBox}></CheckBox>
                <input className={`${karla.className} form__btn`} type="submit" value="Submit" />
            </form>
        </div>
    );
}