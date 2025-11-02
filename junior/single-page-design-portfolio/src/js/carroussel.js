"use strict";

const carouselList = document.querySelector(".carousel__list");
let slides = carouselList.querySelectorAll(".carousel__item");
const nextBtn = document.querySelector(".carousel__control-btn--next");
const previousBtn = document.querySelector(".carousel__control-btn--previous");

if (!carouselList || !nextBtn || !previousBtn) {
    throw new Error("Carousel, button next, button previous, first image or last image not found");
}

if (carouselList.childElementCount === 0) {
    throw new Error("Imagens not found");
}

let currentIndex = 0;
updateCarouselPosition();

function getSlideWidth() {
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(carouselList).columnGap) || 0;
    return slide.offsetWidth + gap;
}

function updateCarouselPosition() {
    const offset = - getSlideWidth() * currentIndex;
    carouselList.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 3) {
        carouselList.style.transition = "transform 0.5s ease";
        currentIndex++;
    }
    updateCarouselPosition()
});

previousBtn.addEventListener("click", () => {
    carouselList.style.transition = "transform 0.5s ease";
    if (currentIndex > 0) {
        currentIndex--;
    }
    updateCarouselPosition();
});

// recalc the size view of the slide
window.addEventListener("resize", updateCarouselPosition);
