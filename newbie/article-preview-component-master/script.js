"use strict"

const articleDivShare = document.querySelector(".article__div-share");
const articleBtn = document.querySelector(".article__btn");
const articleDivUser = document.querySelector(".article__div-user");
const articleDivMidias = document.querySelector(".article__div-midias");
const articleDivFooter = document.querySelector(".article__div-footer");
const articleSvgArrow = document.querySelector(".article__svg-arrow");

if (!articleDivShare || !articleBtn || !articleDivUser || !articleDivMidias || !articleDivFooter || !articleSvgArrow) {
  throw new Error ("Some component not found");
}

// change the style of footer for the card
const share = function() {
  articleDivUser.classList.toggle("article__div-user--changeview");
  articleDivMidias.classList.toggle("article__div-midias--show");
  articleDivFooter.classList.toggle("article__div-footer--changecolor");
  articleBtn.classList.toggle("article__btn--dark");
  articleSvgArrow.classList.toggle("article__svg-arrow--white");
}

articleDivShare.addEventListener("click", share);
