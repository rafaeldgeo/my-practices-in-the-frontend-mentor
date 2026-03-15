export function createView(controller) {

    const pageviewsValue = document.querySelector(".price-group__pageviews-value");
    const price = document.querySelector(".price-group__price");
    const period = document.querySelector(".price-group__period");
    const pageviews = document.querySelector(".pageviews-slider");
    const range = document.querySelector(".pageviews-slider__range");
    const radios = document.querySelectorAll(".billing-switch__radio");
    const switchBtn = document.querySelector(".switch");
    let periodSelected = null;
    const sliderFake = document.createElement("div");
    sliderFake.classList.add("slider-fake");

    controller.bindView({
        renderUI
    });

    range.addEventListener("input", function () {
        const tierIndex = Number(this.value);
        controller.onChangePageviewsSlider(tierIndex);
    });

    radios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const period = e.target.value;
            controller.onToggleBilling(period);
        })
    });


    // pertence algo estado
    switchBtn.addEventListener("click", function() {
        const period = periodSelected === "monthly" ? "yearly" : "monthly";
         controller.onToggleBilling(period);
    });

    function checkPeriod(snapshot){
        periodSelected = snapshot.billingPeriod;
    }

    function renderPageViews(snapshot){
        pageviewsValue.textContent = snapshot.pageviews;
        price.textContent = snapshot.price.toFixed(2);
        period.textContent = `/${snapshot.billingPeriod}`;
    }

    function renderSliderFake(snapshot) {
        const currentIndex = snapshot.tierIndex;
        const progressBarValue = currentIndex / 4 * 100;
        sliderFake.innerHTML = buildSliderFake(progressBarValue);
        pageviews.appendChild(sliderFake);
    }

    function renderUI(snapshot){
        renderPageViews(snapshot);
        renderSliderFake(snapshot);
        checkPeriod(snapshot);
    }

    return {
        renderUI
    }
}

function buildSliderFake(progressBarValue) {
    return `
        <div class="slider-fake__bar-progress" style="--slider-progress: ${progressBarValue}%">
            <div class="slider-fake__thumb">
            <img
                class="slider-fake__icon-slider"
                src="./public/images/icon-slider.svg"
                alt=""
                width="22"
                height="13"
            />
            </div>
        </div>
    `;
}


