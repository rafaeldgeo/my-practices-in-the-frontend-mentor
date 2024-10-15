import React from "react";
import "./App.css";
import AttributionFooter from "./components/AttributionFooter";

export default function App() {

    return(
        <div className="container">
            <header className="header"></header>
            <main className="main"></main>
            <footer className="footer">
                <AttributionFooter />
            </footer>
        </div>
    );
}