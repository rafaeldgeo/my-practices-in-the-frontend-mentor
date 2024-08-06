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
                            <h3 className="card__title">{limitation.title}</h3>
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
                <div className="limitation__introduce">
                    <h2>Limitations of BMI</h2>
                    <p>Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</p>
                </div>
                <div className="limitation__gender">
                    <Card defineLimitation = "gender" />
                </div>
                <div className="limitation__age">
                    <Card defineLimitation = "age" />
                </div>
                <div className="limitation__muscle">
                    <Card defineLimitation = "muscle" />
                </div>
                <div className="limitation__pregnancy">
                    <Card defineLimitation = "pregnancy" />
                </div>
                <div className="limitation__race">
                    <Card defineLimitation = "race" />
                </div>
            </section>
    );
}