import React, { useState, useEffect } from "react";
import SelectTip from "./SelectTip";
import "./FormBill.css";

export default function FormBill(){

    const [valueBill, setValueBill] = useState("");
    const [numberPeople, setNumberPeople] = useState("");
    const [valueTip, setValueTip] = useState({
        select: "",
        input: ""
    });
    const [selectBtnIndex, setSelectBtnIndex] = useState("");

    // check if all input was complete and send to Calculator Component
    useEffect(() => {
        let percentTip = getPercentTip(valueTip);
        const timer = setTimeout(() => {
            if (valueBill > 0 && percentTip >= 0 && numberPeople > 0) {
                const valueBillFloat = parseFloat(valueBill);
                const tipAmount = valueBillFloat * percentTip;
                const tipAmountPerson = tipAmount / numberPeople;
                const totalPerson = (valueBillFloat + tipAmount) / numberPeople;
                console.log(tipAmountPerson);
                console.log(totalPerson);
            }
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [valueBill, valueTip, numberPeople]);


     // catch percent tip from Select Tip Component
     function getPercentTip(value) { 
        if (value.select !== "") {
            return value.select;
        } else {
            return value.input / 100;
        }
    }

     // show the value in the input Bill
    function handleChangeBill(e){
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        
        const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });
        const valueFormated = formatter.format(value / 100).replace(",", ".")

        setValueBill(valueFormated);
    }

    // show the value in the input People
    function handleChangePeople(e){
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        setNumberPeople(Number(value));
    }

    // ---------- SELECTTIP COMPONENT -----------

    // RADIO BUTTON > select the radio button and set percent value of tip
    function handleClick(e) {
        const valueTip = Number(e);
        const btnIndex = selectPercentTip(valueTip);
        setValueTip({
            select: valueTip / 100,
            input: ""
        });
        setSelectBtnIndex(btnIndex);
     }

     // RADIO BUTTON > check if the value there is in radio button
    function selectPercentTip(valueTip) {
        const tipList = [5, 10, 15, 25, 50];
        return tipList.findIndex((tip) => tip === valueTip);
   }

    // INPUT > show the value in the input
    function handleChange(e){
        const valueTip = Number(e);
        if (valueTip >= 0) {
            setValueTip({
                select: "",
                input: valueTip,
            });
        }
    }

    // INPUT > check if the value in input is same that a radio button and select it if be
     function handleBlurCheckInput(){
         const btnIndex = selectPercentTip(valueTip.input);
         if (btnIndex !== -1) {
             setSelectBtnIndex(btnIndex);
         } else {
             setSelectBtnIndex("");
         }
    }

    return(
        <form className="form-bill">
            <div className="bill">
                <label className="bill__label" htmlFor="bill">Bill</label>
                <input className="bill__value-input" type="text" name="bill" id="bill" placeholder="0" value={valueBill} onChange={handleChangeBill}/>
            </div>
            <div className="tip">
                <label className="tip__label" id="group-label">Select Tip %</label>
                <SelectTip onSelectValue={handleClick} onSelectBtn={selectBtnIndex} inputValue={(valueTip.input) === "" ? "" : valueTip.input} onChangeInput={handleChange} onBlurCheck={handleBlurCheckInput}/>
            </div>
            <div className="people">
                <div className="people__label-error-wrapper">
                    <label className="people__label" htmlFor="people">Number of People</label>
                    <span className="people__msg-error">{numberPeople === 0 ? "can't be zero" : ""}</span>
                </div>
                <input className={"people__number-input " + (numberPeople === 0 ? "people__number-input--error" : "")} type="text" name="people" id="people" placeholder="0" value={numberPeople} onChange={handleChangePeople}/>
            </div>
        </form>
    );
}