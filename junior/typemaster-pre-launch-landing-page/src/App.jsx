import React from "react";
import "./App.css";
import logo from "./assets/shared/logo.svg";
import AttributionFooter from "./components/AttributionFooter";

export default function App(){

    return(
        <div className="container">
            <header className="header">
                <img className="header__logo" src={logo} alt="logo TM" width={40} height={40}/>
                <div className="header__btn-wrapper">
                    <button className="btn__pre-order" type="button">Pre-order now</button>
                </div>
            </header>
            <main className="main">

            </main>
            <footer className="footer">
                <p>Typemaster 2021 | All Rights Reserved</p>
                <AttributionFooter />
            </footer>
        </div>
    );
}