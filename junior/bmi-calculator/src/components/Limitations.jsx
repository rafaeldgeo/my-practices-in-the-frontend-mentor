import React from "react";
import "../components/Limitation.css";
import { limitations } from "./data-limitations";

function Card({defineLimitation}){

    const result = limitations.filter(({limitation}) => limitation === defineLimitation);

    return(
        <>
            {result.map(limitation => (
                <div key={limitation.id} className="card">
                    <div className="card__header">
                        <div className="card__icon-wrapper">
                            <img className="card__icon" src={limitation.icon} alt="" width={32} height={32} loading="lazy" />
                        </div>
                        <div className="card__title-wrapper">
                            <h5 className="card__title">{limitation.title}</h5>
                        </div>
                    </div>
                    <div className="card__body">
                        <p className="card__text">{limitation.text}</p>
                    </div>
                </div>
            ))}
        </>
    );
}



export default function Limitations(){

    return(
            <section className="limitation">
                <svg className="pattern-right" xmlns="http://www.w3.org/2000/svg" width="94.664" height="122.518" viewBox="0 0 94.664 122.518"><path fill="none" stroke="#ACC1DE" d="M94.498 122.046C65.99 112.032 7.28 73.613.498.046"/></svg>
                <div className="limitation__introduce">
                    <h3 className="limitation__title">Limitations of BMI</h3>
                    <p className="limitation__text">Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</p>
                </div>
                <div className="limitation__card limitation__card-gender">
                    <Card defineLimitation = "gender" />
                </div>
                <div className="limitation__card limitation__card-age">
                    <Card defineLimitation = "age" />
                </div>
                <div className="limitation__card limitation__card-muscle">
                    <Card defineLimitation = "muscle" />
                </div>
                <div className="limitation__card limitation__card-pregnancy">
                    <Card defineLimitation = "pregnancy" />
                </div>
                <div className="limitation__card limitation__card-race">
                    <Card defineLimitation = "race" />
                </div>    
            </section>
    );
}