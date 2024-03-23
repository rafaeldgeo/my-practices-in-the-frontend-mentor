"use strict";

const getUrl = window.location.href.trim();
const position = getUrl.indexOf("=");
const emailSliced = getUrl.slice(position+1);
const email = emailSliced.replace("%40", "@");
 
const sucessMensageEmail = document.querySelector(".sucess-mensage__email");
sucessMensageEmail.innerText = email;
  



