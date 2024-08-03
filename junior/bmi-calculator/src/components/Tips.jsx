import React from "react";
import "../components/Tips.css";
import { tips } from "./data-tips.js";

export default function Tips(){

    const listTips = tips.map(tip => 
        <div key={tip.id} className="tips__card">
            <div className="tips__icon-wrapper">
                <img className="tips__icon" src={tip.icon} alt="" width={64} height={64} loading="lazy"/></div>
            <div className="tips__content">
                <h3 className="tips__title">{tip.title}</h3>
                <p className="tips__text">{tip.text}</p>
            </div>
        </div>
    );

    return(
        <div className="tips">{listTips}</div>
    );
}


