const selectLanguage = document.querySelector(".selected-language");
const optionList = document.querySelector(".options-list");
const option = document.querySelectorAll(".option");

selectLanguage.addEventListener("click", () => {
  optionList.classList.toggle("active");
});

option.forEach((item) => {
  item.addEventListener("click", (e) => {
    const lang = e.target.getAttribute("data-language");
    selectLanguage.setAttribute("data-language", lang);
    activateLanguage();
  });
});

function activateLanguage() {
  const text = selectLanguage.querySelector("span");
  text.innerText = selectLanguage.getAttribute("data-language");
  const lang = selectLanguage.getAttribute("data-language").toLowerCase();

  const languages = document.querySelectorAll(".language-select");
  languages.forEach((item) => {
    if (
      item.classList.contains("active") &&
      !item.classList.contains(`${lang}`)
    ) {
      item.classList.remove("active");
    } else {
      item.classList.add("active");
    }
  });
  optionList.classList.toggle("active");
}

let current = 1;

function activateGlobe() {
  const globe = document.querySelectorAll(".globe-container .image-container");

  if (current >= globe.length) {
    current = 1;
  }

  globe.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });

  globe[current - 1].classList.add("active");
}

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

arrowRight.addEventListener("click", () => {
  current++;
  activateGlobe(current);
});
arrowLeft.addEventListener("click", () => {
  current--;
  activateGlobe(current);
});
