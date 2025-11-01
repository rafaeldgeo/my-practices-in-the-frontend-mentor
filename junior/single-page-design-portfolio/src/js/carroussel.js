"use strict";

const carouselListUl = document.querySelector(".carousel__list");
const slidesLi = carouselListUl.querySelectorAll(".carousel__item");
const nextBtn = document.querySelector(".carousel__control-btn--next");
const previousBtn = document.querySelector(".carousel__control-btn--previous");
const firstItemLi = carouselListUl.firstElementChild.cloneNode(true);
const lastItemLi = carouselListUl.lastElementChild.cloneNode(true);

if (!carouselListUl || !nextBtn || !previousBtn || !firstItemLi || !lastItemLi) {
    throw new Error("Carousel, button next, button previous, first image or last image not found");
}

if (carouselListUl.childElementCount === 0 || slidesLi.length === 0) {
    throw new Error("Imagens not found");
}

// Append the last image in begin and first image in end of the list. This made the transition of carousel infinite
lastItemLi.classList.add("carousel__item--last-clone");
carouselListUl?.insertBefore(lastItemLi, carouselListUl.firstElementChild);
firstItemLi.classList.add("carousel__item--first-clone");
carouselListUl?.appendChild(firstItemLi);


// CAROUSEL RESPONSIVE AND INFINIT TRANSITION
let currentIndex = 3;
updateCarouselPosition();

// Get width imagem(slide) and column-gap. It's necessary when it will define the translateX, because when view reduce or increase the translateX changes
function getSlideWidth() {
    const slide = slidesLi[0];
    const slideWidth = slide.offsetWidth;
    const gap = parseFloat(getComputedStyle(carouselListUl).columnGap) || 0;
    return slideWidth + gap;
}

// Update de position of slide
function updateCarouselPosition() {
    const offset = - getSlideWidth() * currentIndex;
    carouselListUl.style.transform = `translateX(${offset}px)`;
}

// control of the navigation for carousel
nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= slidesLi.length) {
        currentIndex = 0;
        handleLoop();
    }
    updateCarouselPosition();
});

previousBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        handleLoop();
        updateCarouselPosition();
    }
    
});

// recalc the size view of the slide
window.addEventListener("resize", updateCarouselPosition);

function handleLoop() {
    carouselListUl.addEventListener("transitionend", () => {
        if (slidesLi[currentIndex].classList.contains("carousel__item--first-clone")) {
            carouselListUl.style.transition = "none"; // off transition
            currentIndex = 1;
            carouselListUl.style.transform = `translateX(${-getSlideWidth() * currentIndex}px)`;
        }

        if (slidesLi[currentIndex].classList.contains("last-clone")) {
            carouselListUl.style.transition = "none";
            currentIndex = slidesLi.length - 2;
            carouselListUl.style.transform = `translateX(${-getSlideWidth() * currentIndex}px)`;
        }
    }, {once: true}); // shoot once
}










