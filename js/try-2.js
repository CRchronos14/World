const arrowBtns = document.querySelectorAll(".arrow-btn");
const cardBtns = document.querySelectorAll(".card");
let currentCard = 0;
let dir = 1;
moveCards();

arrowBtns.forEach((btn, i) => {
  btn.onpointerenter = (e) =>
    gsap.to(btn, {
      ease: "expo",
      "box-shadow": "0 3px 4px #00000050",
    });

  btn.onpointerleave = (e) =>
    gsap.to(btn, {
      ease: "expo",
      "box-shadow": "0 6px 8px #00000030",
    });

  btn.onclick = (e) => {
    dir = i == 0 ? 1 : -1;
    if (i == 0) {
      currentCard--;
      currentCard = Math.max(0, currentCard);
    } else {
      currentCard++;
      currentCard = Math.min(3, currentCard);
    }
    moveCards(0.75);
  };
});

cardBtns.forEach((btn, i) => {
  btn.onpointerenter = (e) =>
    gsap.to(btn, {
      ease: "power3",
      overwrite: "auto",
      "box-shadow": () =>
        i == currentCard ? "0 6px 11px #00000030" : "0 6px 11px #00000030",
    });

  btn.onpointerleave = (e) =>
    gsap.to(btn, {
      ease: "power3",
      overwrite: "auto",
      "box-shadow": () =>
        i == currentCard ? "0 6px 11px #00000030" : "0 0px 0px #00000030",
    });

  btn.onclick = (e) => {
    dir = i < currentCard ? 1 : -1;
    currentCard = i;
    moveCards(0.75);
  };
});

function moveCards(dur = 0) {
  gsap
    .timeline({
      defaults: {
        duration: dur,
        ease: "power3",
        stagger: { each: -0.03 * dir },
      },
    })
    .to(
      ".card",
      {
        x: () => {
          return $(window).width() < 450
            ? -720 * currentCard
            : -1080 * currentCard;
        },
        y: (i) => (i == currentCard ? 0 : 15),
        height: (i) => (i == currentCard ? 540 : 480),
        ease: "elastic.out(0.4)",
      },
      0
    )
    .to(
      ".card",
      {
        cursor: (i) => (i == currentCard ? "default" : "pointer"),
        "box-shadow": (i) =>
          i == currentCard ? "0 6px 11px #00000030" : "0 0px 0px #00000030",
        border: (i) =>
          i == currentCard ? "2px solid #D9A8E5" : "0px solid #fff",
        background: (i) =>
          i == currentCard
            ? "radial-gradient(100% 100% at top, #fff 0%, #fff 99%)"
            : "radial-gradient(100% 100% at top, #fff 20%, #eee 175%)",
        ease: "expo",
      },
      0
    )
    .to(
      ".icon svg",
      {
        attr: {
          stroke: (i) => (i == currentCard ? "transparent" : "#36a"),
          fill: (i) => (i == currentCard ? "#36a" : "transparent"),
        },
      },
      0
    )
    .to(
      ".arrow-btn-prev",
      {
        autoAlpha: currentCard == 0 ? 0 : 1,
      },
      0
    )
    .to(
      ".arrow-btn-next",
      {
        autoAlpha: currentCard == 3 ? 0 : 1,
      },
      0
    )
    .to(
      ".card h4",
      {
        y: (i) => (i == currentCard ? 0 : 8),
        opacity: (i) => (i == currentCard ? 1 : 0),
      },
      0
    );
}
// -----------------視差滾動-------------------------
document.addEventListener("DOMContentLoaded", function () {
  let background = document.querySelector(".background-image");
  let content = document.querySelector(".parallax-content");

  document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    background.style.transform = "translateY(" + scrollPosition * 0.5 + "px)";
    content.style.transform = "translateY(" + scrollPosition * 0.8 + "px)";
  });
});
