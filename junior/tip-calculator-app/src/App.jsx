import React from "react";
import "./App.css";
import logo from "./assets/images/logo.svg";
import { Calculator } from "./components/Calculator";
import AttributionFooter from "./components/AttributionFooter";

export default function App() {

    return(
        <div className="container">
            <main className="main">
                <h1 class="sr-only">Tip Calculator</h1>
                <div className="logo">
                    <img className="logo__img" src={logo} alt="logo" width={87} height={54} />
                </div>
                <Calculator />
            </main>
            <footer className="footer">
                <AttributionFooter />
            </footer>
        </div>
    );
}