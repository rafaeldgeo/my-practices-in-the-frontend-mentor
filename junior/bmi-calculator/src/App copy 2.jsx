import React from "react";
import "./App.css";
import logo from "./images/logo.svg";
import Calculator from "./components/Calculator";
import AttributionFooter from "./components/AttributionFooter";

export default function App(){
    return(
        <div className="container">
            <header className="header">
                <div className="hero">
                    <div className="hero__content">
                        <div className="hero__content-wrapper">
                            <div className="hero__logo-wrapper">
                                <img className="hero__logo" src={logo} alt="logo" width={58.75} height={58.75}/>
                            </div>
                            <div className="hero__text-wrapper">
                                <h1 className="hero__title">Body Mass Index Calculator</h1>
                                <p className="hero__introduction">Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
                            </div>
                        </div>
                    <Calculator></Calculator> 
                    </div>
                </div>
            </header>
            <main className="main">teste</main>
            <footer className="footer">
                <AttributionFooter></AttributionFooter>
            </footer>
        </div>
    );
}