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

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, Observer, CustomEase);
  // gsap code here!
  var animation = gsap.timeline({
    scrollTrigger: {
      trigger: ".animated-area",
      scrub: true,
      pin: true,
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
      },
      start: "center center",
      end: "+=1000",
      ease: "power1.inOut",
      onUpdate: (self) => {
        startAnimation(self);
      },
    },
  });

  function startAnimation(self) {
    const progress = Math.floor(self.progress * 100);
    const engLen = $(".english .busjourney tbody tr").length;
    const tamilLen = $(".tamil .busjourney tbody tr").length;
    const MapLen = $(".map").length;
    const curEnglish =
      Math.round((progress * engLen) / 100) <= 1
        ? 1
        : Math.round((progress * engLen) / 100);
    const curTamil =
      Math.round((progress * tamilLen) / 100) <= 1
        ? 1
        : Math.round((progress * tamilLen) / 100);

    const curMap =
      Math.round((progress * MapLen) / 100) <= 1
        ? 1
        : Math.round((progress * MapLen) / 100);
    let engMin, engMax, tamilMin, tamilMax;

    if (curEnglish > 0 && curEnglish <= 10) {
      engMin = 0;
      engMax = 10;
    } else if (curEnglish > 10 && curEnglish <= 20) {
      engMin = 11;
      engMax = 20;
    } else if (curEnglish > 20 && curEnglish <= 30) {
      engMin = 21;
      engMax = 30;
    }
    if (curTamil > 0 && curTamil <= 10) {
      tamilMin = 0;
      tamilMax = 10;
    } else if (curTamil > 10 && curTamil <= 20) {
      tamilMin = 11;
      tamilMax = 20;
    } else if (curTamil > 20 && curTamil <= 30) {
      tamilMin = 20;
      tamilMax = 30;
    }

    $(".english .busjourney tbody tr").each(function (index, element) {
      if (index + 1 >= engMin && index + 1 <= engMax) {
        if (!$(element).hasClass("active")) {
          $(element).addClass("active");
        }
      } else {
        if ($(element).hasClass("active")) {
          $(element).removeClass("active");
        }
      }
    });

    $(".tamil .busjourney tbody tr").each(function (index, element) {
      if (index + 1 >= tamilMin && index + 1 <= tamilMax) {
        if (!$(element).hasClass("active")) {
          $(element).addClass("active");
        }
      } else {
        if ($(element).hasClass("active")) {
          $(element).removeClass("active");
        }
      }
    });

    $(".map").each(function (index, element) {
      if (index + 1 == curMap) {
        if (!$(element).hasClass("active")) {
          $(element).addClass("active");
        }
      } else {
        if ($(element).hasClass("active")) {
          $(element).removeClass("active");
        }
      }
    });
  }

  gsap.from(".sponsor", {
    scrollTrigger: ".group",
    y: 200,
  });
});
