"use strict";

const carouselListUl = document.querySelector(".carousel__list");
const controlNextBtn = document.querySelector(".carousel__control-btn--next");
const controlPreviousBtn = document.querySelector(".carousel__control-btn--previous");
const firstItemLi = carouselListUl.firstChild.cloneNode(true);
const lastItemLi = carouselListUl.lastChild.cloneNode(true);

if (!carouselListUl || !controlNextBtn || !controlPreviousBtn || !firstItemLi || !lastItemLi) {
    throw new Error("Carousel, button next, button previous, first image or last image not found");
}

if (carouselListUl.childElementCount === 0) {
    throw new Error("Imagens not found");
}

carouselListUl.appendChild(firstItemLi);
carouselListUl.insertBefore(lastItemLi, carouselListUl.firstElementChild);








