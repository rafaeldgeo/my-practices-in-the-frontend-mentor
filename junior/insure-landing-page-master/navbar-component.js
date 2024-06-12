"use strict";

class NavBar extends React.Component {

    constructor(){
        super();
        this.state = {
            iconmenu: "./images/icon-hamburger.svg",
            alt: "open menu",
            typemenu: "navbar__menu-desktop",
        }
        this.toogleMenu = this.toogleMenu.bind(this);
    }

    toogleMenu(){
        const body = document.querySelector("body");
        if (this.state.alt === "open menu") {
            this.setState({
                iconmenu: "./images/icon-close.svg",
                alt:"close menu",
                typemenu: "navbar__menu-mobile",
            });
            body.style.overflowY = "hidden";
        } else {
            this.setState({
                iconmenu: "./images/icon-hamburger.svg",
                alt:"open menu",
                typemenu: "navbar__menu-desktop",
            });
            body.style.overflowY = "auto";
        }
       
        window.addEventListener("resize", () => {
            const widthView = window.innerWidth;
            if (widthView > 576 && this.state.alt === "close menu") {
                this.setState({
                    iconmenu: "./images/icon-hamburger.svg",
                    alt:"open menu",
                    typemenu: "navbar__menu-desktop",
                });
                body.style.overflowY = "auto";
            } 
          });
    }

    render(){
        return(
            <div className="navbar__menu">
                <img className="navbar__img-logo" src="./images/logo.svg" alt="logo insure" width="112" height="18"/>
                <nav className={this.state.typemenu}>
                    <ul className="navbar__list-menu">
                        <li className="navbar__item-menu"><a className="navbar__item-link" href="#">How we work</a></li>
                        <li className="navbar__item-menu"><a className="navbar__item-link" href="#">Blog</a></li>
                        <li className="navbar__item-menu"><a className="navbar__item-link" href="#">Account</a></li>
                        <li className="navbar__item-menu"><a className="navbar__item-link navbar__item-link--button" href="#">View plans</a></li>
                    </ul>
                </nav>
                <button onClick={this.toogleMenu} className="navbar__btn-menu" type="button" aria-label="open menu">
                    <img className="navbar__icon-menu" src={this.state.iconmenu} alt={this.state.alt} width="32" height="32"/>
                </button> 
            </div>
        );
    }
}
const navBar = document.getElementById("navbar__component");
ReactDOM.render(<NavBar />, navBar)