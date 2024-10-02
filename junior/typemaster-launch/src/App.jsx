import React from "react";
import logo from "./assets/shared/logo.svg";
import mobileKeyboard from "./assets/mobile/image-keyboard.jpg";
import mobilePhoneKeyboard from "./assets/mobile/image-phone-and-keyboard.jpg";
import mobileGlassKeyboard from "./assets/mobile/image-glass-and-keyboard.jpg";
import tabletKeyboard from "./assets/tablet/image-keyboard.jpg";
import tabletPhoneKeyboard from "./assets/tablet/image-phone-and-keyboard.jpg";
import tabletGlassKeyboard from "./assets/tablet/image-glass-and-keyboard.jpg";
import desktopKeyboard from "./assets/desktop/image-keyboard.jpg";
import desktopPhoneKeyboard from "./assets/desktop/image-phone-and-keyboard.jpg";
import desktopGlassKeyboard from "./assets/desktop/image-glass-and-keyboard.jpg";
import patternSquare from "./assets/shared/pattern-square.svg";
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
                    <div className="highline__wrapper">
                        <div className="highline__content">
                            <h1 className="highline__title">Typemaster keyboard</h1>
                            <p className="highline__text">Improve your productivity and gaming without breaking the bank. Upgrade to a high quality
                            mechanical typing experience.</p>
                            <div className="highline__order-wrapper">
                                <button className="highline__btn btn-order" type="button">Pre-order now</button>
                                <span className="highline__release">Release on 5/27</span>
                            </div>
                        </div>
                        <div className="highline__images-wrapper">
                            <picture className="highline__photo-wrapper">
                                <source srcSet={mobileKeyboard} media="(max-width: 375px)"/>
                                <source srcSet={tabletKeyboard} media="(min-width: 376px) and (max-width: 768px)"/>
                                <source srcSet={desktopKeyboard} media="(min-width: 769px)"/>
                                <img className="highline__photo" src={mobileKeyboard} alt="black keyboard"/>
                            </picture> 
                            <div className="pattern">
                                <img className="pattern__square" src={patternSquare} alt="" width={255} height={240}/>
                            </div>
                        </div>
                    </div>
                </section>
             <section className="about-keyboard">
                    <div className="about-keyboard__wrapper">
                        <div className="about-keyboard__images-wrapper">
                            <div className="pattern">
                                <img className="pattern__square" src={patternSquare} alt="" width={255} height={240}/>
                            </div>
                            <picture className="about-keyboard__photo-phone-wrapper">
                                <source srcSet={mobilePhoneKeyboard} media="(max-width: 375px)"/>
                                <source srcSet={tabletPhoneKeyboard} media="(min-width: 376px) and (max-width: 768px)"/>
                                <source srcSet={desktopPhoneKeyboard} media="(min-width: 769px)"/>
                                <img className="about-keyboard__photo-phone" src={mobilePhoneKeyboard} alt="phone and keyboard"/>
                            </picture>
                            <picture className="about-keyboard__photo-glass-wrapper">
                                <source srcSet={mobileGlassKeyboard} media="(max-width: 375px)"/>
                                <source srcSet={tabletGlassKeyboard} media="(min-width: 376px) and (max-width: 768px)"/>
                                <source srcSet={desktopGlassKeyboard} media="(min-width: 769px)"/>
                                <img className="about-keyboard__photo-glass" src={mobileGlassKeyboard} alt="glass and keyboard"/>
                            </picture>   
                        </div>
                        <div className="about-keyboard__content">
                            <h2 className="about-keyboard__subtitle">Mechanical wireless keyboard</h2>
                            <p className="about-keyboard__text">The Typemaster keyboard boasts top-notch build and practical design. It offers a wide variety 
                            of switches and keycaps, along with reliable wireless connectivity.</p>
                        </div>  
                    </div> 
                </section>
            </main>
            <footer className="footer"></footer>
        </div>
    );
}