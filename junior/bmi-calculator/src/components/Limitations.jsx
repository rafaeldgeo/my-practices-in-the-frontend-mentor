import React from "react";
import { limitations } from "./data-limitations";

function Card({defineLimition}){

    const result = limitations.filter(({limitation}) => limitation === defineLimition);

    return(
        <>
            {result.map(limitation => (
                <div key={limitation.id}>
                    <div>
                        <img src={limitation.icon} alt="" />
                    </div>
                    <div>
                        <h3>{limitation.title}</h3>
                        <p>{limitation.text}</p>
                    </div>
                </div>
            ))}
        </>
    );
}



export default function Limitations(){

    return(
        <>
            <Card defineLimition = "gender"></Card>
            <Card defineLimition = "age"></Card>
            <Card defineLimition = "muscle"></Card>
            <Card defineLimition = "pregnancy"></Card>
            <Card defineLimition = "race"></Card>
        </>
    );
}