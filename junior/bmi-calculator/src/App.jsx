import React from "react";
import "./App.css";
import logo from "./images/logo.svg";
import curvedRight from "./images/pattern-curved-line-right.svg";
import curvedLeft from "./images/pattern-curved-line-left.svg";
import man from "./images/image-man-eating.webp";
import Calculator from "./components/Calculator";
import Tips from "./components/Tips";
import Limitations from "./components/Limitations";
import AttributionFooter from "./components/AttributionFooter";

export default function App(){
    return(
        <div className="container">
            <header className="header">
               <div className="hero__content">
                    <div className="hero__logo-wrapper">
                        <img className="hero__logo" src={logo} alt="logo" width={58.75} height={58.75}/>
                    </div>
                    <div className="hero__content-wrapper">
                        <div className="hero__text-wrapper">
                            <h1 className="hero__title">Body Mass Index Calculator</h1>
                            <p className="hero__introduction">Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
                        </div>
                        <Calculator></Calculator> 
                    </div>
                </div> 
                <div className="hero__background"></div> 
            </header>
            <main className="main" style={{ backgroundImage: `url(${curvedLeft})`, backgroundRepeat: "no-repeat", backgroundPosition: "85% 0%", backgroundSize: "auto"}}>
                <section className="result-explanation">
                    <div className="result-explanation__img-wrapper">
                        <img className="result-explanation__img-man" src={man} alt="man eating" width={564} height={533} loading="lazy"/>
                    </div>
                    <div className="result-explanation__content">
                        <h2 className="result-explanation__title">What your BMI result means</h2>
                        <p className="result-explanation__text">A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</p>
                    </div>
                </section>
                <Tips />
                <Limitations />
            </main>
            <footer className="footer">
                <AttributionFooter></AttributionFooter>
            </footer>  
        </div>
    );
}