import React from "react";
import "./Card.css";
import { icons } from "./data-cards.js";


export default function Card(){

    const iconList = icons.map( item =>
        <div key={item.id} className="card__item">
            <div className="card__icon-wrapper">
                <img className="card__icon" src={item.icon} alt=""/>
            </div>
            <div className="card__content">
                <h3 className="card__title">{item.title}</h3>
                <p className="card_desc">{item.desc}</p>
            </div>
        </div>
     );

    return(
        <div className="card">{iconList}</div>
    );


}