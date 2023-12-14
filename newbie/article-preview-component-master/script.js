"use strict"

const articleDivShare = document.querySelector(".article__div-share");
const articleBtn = document.querySelector(".article__btn");

const share = function() {
  const articleDivUser = document.querySelector(".article__div-user");
  const articleDivMidias = document.querySelector(".article__div-midias");
  const articleDivFooter = document.querySelector(".article__div-footer");
  const articleBtn = document.querySelector(".article__btn");
  const articleSvgArrow = document.querySelector(".article__svg-arrow");
  
  articleDivUser.classList.toggle("article__div-user--changeview");
  articleDivMidias.classList.toggle("article__div-midias--show");
  articleDivFooter.classList.toggle("article__div-footer--changecolor");
  articleBtn.classList.toggle("article__btn--dark");
  articleSvgArrow.classList.toggle("article__svg-arrow--white");

}

articleDivShare.addEventListener("click", share);
