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

// it gets size of image with gap. It's important for fluid responsive and position
function getSlideWidth() {
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(carouselList).columnGap) || 0;
    return slide.offsetWidth + gap;
}

// Update position of slides acordin with view
function updateCarouselPosition() {
    const offset = - getSlideWidth() * currentIndex;
    carouselList.style.transform = `translateX(${offset}px)`;    
}

// listen button and next slide
nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 3) currentIndex++;
    updateCarouselPosition()
});

// listen button and next slide
previousBtn.addEventListener("click", () => {
    if (currentIndex >= -1) currentIndex--;
    updateCarouselPosition();
});

// recalc the size view of the slide
window.addEventListener("resize", updateCarouselPosition);
