import React from "react";
import logo from "./assets/shared/logo.svg";
import mobileKeyboard from "./assets/mobile/image-keyboard.jpg";
import tabletKeyboard from "./assets/tablet/image-keyboard.jpg";
import desktopKeyboard from "./assets/desktop/image-keyboard.jpg";
import "./App.css";

export default function App(){

    return(
        <div className="container">
            <header className="header">
                <img className="header__logo" src={logo} alt="orange square containing the letters tm" width={40} height={40} />
                <button className="header__btn btn-order"
                 type="button">Pre-order now</button>
            </header>
            <main className="main">
                <section className="highline">
                    <div className="highline__content">
                        <h1 className="highline__title">Typemaster keyboard</h1>
                        <p className="highline__text">Improve your productivity and gaming without breaking the bank. Upgrade to a high quality 
                        mechanical typing experience.</p>
                        <div className="highline__order-wrapper">
                            <button className="highline__btn btn-order" type="button">Pre-order now</button>
                            <span className="highline__release">Release on 5/27</span>
                        </div>
                    </div>
                    <picture className="highline__image-wrapper">
                        <source srcSet={mobileKeyboard} media="(max-width: 375px)"/>
                        <source srcset={tabletKeyboard} media="(min-width: 376px) and (max-width: 768px)"/>
                        <source srcset="https://placehold.co/1080x960" media="(min-width: 769px)"/>
                        <img className="highline__image" src={mobileKeyboard} alt="black keyboard"/>
                    </picture>
                </section>
            </main>
            <footer className="footer"></footer>
        </div>
    );
}