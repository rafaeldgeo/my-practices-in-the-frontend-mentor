export function createView(controller) {

    const body = document.querySelector("body");
    const btnTheme = document.querySelector(".header__btn-theme");
    const img = document.querySelector(".header__btn-icon");
    const iconMoon = img.src;
    const iconSun = img.dataset.srcLogoDark;
    const btnFilters = document.querySelectorAll(".header-filters__btn");
    const extensionList = document.querySelector(".extensions-list__list");

    function renderUI({ theme, filter, filterExtension }) {
        renderTheme(theme);
        renderFilterBtns(filter);
        renderExtensions(filterExtension);
    }

    btnTheme.addEventListener("click", () => controller.onToggleTheme());

    btnFilters.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const selectedFilter = e.currentTarget.dataset.filter;
            controller.onSelectFilter(selectedFilter);
        });
    });



    function renderTheme(theme) {
        if (theme === "dark") {
            btnTheme.setAttribute("aria-label", "Toggle light mode");
            img.src = iconSun;
            body.dataset.theme = "dark";
        } else {
            btnTheme.setAttribute("aria-label", "Toggle dark mode");
            img.src = iconMoon;
            body.dataset.theme = "light";
        }
    }

    function renderFilterBtns(filter) {
        btnFilters.forEach((btn) => {
            const isSelected = btn.dataset.filter === filter;
            btn.classList.toggle("header-filters__btn--selected", isSelected);
            btn.setAttribute("aria-pressed", isSelected);
        });
    }

    function renderExtensions(extensions) {
        extensionList.innerHTML = "";
        extensions.forEach((extension) => {
            const card = buildExtension(extension);
            extensionList.appendChild(card);
        });    
    }

    extensionList.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".extension-card__btn-remove");

        if (!removeBtn) return;

        controller.onRemoveExtension(removeBtn.id);
    });

    extensionList.addEventListener("click", (e) => {
        const statusExtension = e.target.closest(".switch__input");

        if (!statusExtension) return;

        model.toggleStatusExtension(statusExtension.id);
    });

    function buildExtension(extension) {
        const li = document.createElement("li");
        li.classList.add("extension-card");
        li.innerHTML =
            `<div class="extension-card__content">
                  <div class="extension-card__logo-wrapper">
                    <img
                      class="extension-card__logo-icon"
                      src="${extension.logo}"
                      alt="${extension.name} logo"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div class="extension-card__info-wrapper">
                    <h2 class="extension-card__title">${extension.name}</h2>
                    <p class="extension-card__text">${extension.description}</p>
                  </div>
                </div>
                <div class="extension-card__actions">
                  <button class="extension-card__btn-remove" id="${extension.id}">Remove</button>
                  <label class="switch">
                    <input
                      class="switch__input"
                      id=${extension.id}
                      type="checkbox"
                      aria-label="Toggle extension status"
                      ${extension.isActive ? "checked" : ""}
                    />
                    <div class="switch__control">
                      <span class="switch__thumb"></span>
                    </div>
                  </label>
                </div>
                `
        return li;

    }

    return {
        renderUI,
    }
}