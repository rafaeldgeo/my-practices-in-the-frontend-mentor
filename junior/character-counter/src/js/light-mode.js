const btnThemeMode = document.querySelector(".header__btn");
const icon = btnThemeMode.querySelector(".header__btn-icon");
const iconDark = icon.src;
const iconLight = icon.dataset.srcBtnLight;
const logo = document.querySelector(".header__logo-img");
const logoDark = logo.src;
const logoLight = logo.dataset.srcLogoLight;

// change the theme
function changeThemeMode() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    icon.src = isLight ? iconLight : iconDark;
    logo.src = isLight ? logoLight : logoDark;
}

btnThemeMode.addEventListener("click", changeThemeMode);



