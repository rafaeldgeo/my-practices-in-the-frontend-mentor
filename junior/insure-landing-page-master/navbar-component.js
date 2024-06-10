"use strict";

class NavBar extends React.Component {

    render(){
        return(
            <div className="navbar__menu">
                <img className="navbar__img-logo" src="./images/logo.svg" alt="logo insure" width="112" height="18"/>
                <nav className="navbar__menu-desktop">
                    <ul className="navbar__list-menu">
                        <li className="navbar__item-menu"><a className="navbar__item-link" href="#">How we work</a></li>
                        <li className="navbar__item-menu"><a className="navbar__item-link" href="#">Blog</a></li>
                        <li className="navbar__item-menu"><a className="navbar__item-link" href="#">Account</a></li>
                        <li className="navbar__item-menu"><a className="navbar__item-link navbar__item-link--button" href="#">View plans</a></li>
                    </ul>
                </nav>
                <button className="navbar__btn-menu" type="button" aria-label="open menu">
                    <img className="navbar__icon-menu" src="./images/icon-hamburger.svg" alt="menu" width="32" height="32"/>
                </button> 
            </div>
        );
    }
}
const navBar = document.getElementById("navbar__component");
ReactDOM.render(<NavBar />, navBar)