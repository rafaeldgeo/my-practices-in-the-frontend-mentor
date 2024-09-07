import React from "react";
import "./App.css";
import logo from "./assets/shared/logo.svg";
import keyboardMobile from "./assets/mobile/image-keyboard.jpg";
import keyboardDesktop from "./assets/desktop/image-keyboard.jpg";
import keyboardTablet from "./assets/tablet/image-keyboard.jpg";
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
                <section className="introduce">
                    <div className="introduce__content">
                        <h1 className="introduce__title">Typemaster keyboard</h1>
                        <p className="introduce__text">Improve your productivity and gaming without breaking the bank. Upgrade to a high quality mechanical typing experience.</p>
                        <div className="introduce__btn-wrapper">
                            <button className="btn__pre-order" type="button">Pre-order now</button>
                            <span className="introduce__release">Release on 5/27</span>
                        </div>
                    </div>
                    <picture className="introduce__img-wrapper">
                        <source media="(max-width: 375px)" srcset={keyboardMobile} width={372} height={331} />
                        <source media="(min-width: 376px) and (max-width: 768px)" srcset={keyboardTablet} width={478} height={425} />
                        <source media="(min-width: 769px)" srcset={keyboardDesktop} width={540} height={480} />
                        <img className="introduce__img" src={keyboardMobile} alt="keyboard" />
                    </picture>
                </section>
            </main>
            <footer className="footer">
                <p>Typemaster 2021 | All Rights Reserved</p>
                <AttributionFooter />
            </footer>
        </div>
    );
}