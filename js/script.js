console.log("HOLLO");

// -----------------視差滾動-------------------------

// 等待整個 HTML 文檔的加載完成後執行
// window.addEventListener("DOMContentLoaded", function () {
//   var scrollTop =
//     window.scrollY || //用于FF
//     document.documentElement.scrollTop ||
//     document.body.scrollTop ||
//     0;
//   // 選擇具有 ".background-image" 類的元素，這是背景圖片的容器
//   let background = document.querySelector(".background-image");

//   // 選擇具有 ".parallax-content" 類的元素，這是包含視差效果內容的容器
//   let content = document.querySelector(".parallax-content");

//   // 監聽滾動事件
//   this.window.addEventListener(
//     "scroll",
//     function () {
//       // 獲取垂直滾動的距離
//       let scrollPosition = scrollTop;
//       console.log("scrollPosition", scrollPosition);

//       // 通過調整背景容器的 transform 屬性，創建視差效果（0.5 是一個調整的乘數）
//       background.style.transform = "translateY(" + scrollPosition * 0.5 + "px)";

//       // 通過調整內容容器的 transform 屬性，創建更大的視差效果（0.8 是一個調整的乘數）
//       content.style.transform = "translateY(" + scrollPosition * 0.8 + "px)";
//     },
//     true
//   );
// });

//////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// ///////////////////////

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

//////深色模式

// function setTheme(theme) {
//   // 儲存顯示模式
//   localStorage.setItem("theme", theme);

//   // 切換顯示模式
//   // 如果為淺色模式，就將 dark-theme.css disabled 設定為 true
//   // 如果為深色模式，則將 dark-theme.css disabled 設定為 false
//   document.getElementById("darkTheme").disabled = theme !== "dark";
//   console.log("theme1", theme); // 打印主題的值
// }

// window.addEventListener("load", (event) => {
//   let preferredTheme = localStorage.getItem("theme");
//   let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
//   if (preferredTheme == null) {
//     preferredTheme = darkQuery.matches ? "dark" : "light";
//   }

//   // 添加事件監聽器，當系統顏色模式變更時執行指定的函數
//   // darkQuery.MediaQueryList.addListener(function (e) {
//   //   setTheme(e.matches ? "dark" : "light");
//   // });

//   function handleThemeChange(e) {
//     setTheme(e.matches ? "dark" : "light");
//   }

//   // 初始設定主題
//   handleThemeChange(darkQuery);

//   // 監聽主題變化
//   darkQuery.addEventListener("change", handleThemeChange);

//   // 設定顯示模式

//   setTheme(preferredTheme);
// });

// const btnSwitchTheme = document.querySelector(".btnSwitchTheme");

// btnSwitchTheme.addEventListener("click", () => {
//   let preferredTheme = localStorage.getItem("theme");
//   console.log("Current Theme:", preferredTheme); // 打印主題的值
//   console.log("darkTheme", darkTheme); // 打印主題的值
//   if (preferredTheme == "dark") {
//     setTheme("light");
//   }
//   if (preferredTheme == "light") {
//     setTheme("dark");
//   }
// });

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  const darkThemeLink = document.getElementById("darkTheme");
  darkThemeLink.disabled = theme !== "dark";
}

// 函數：切換主題
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// 網頁加載完成後執行
window.addEventListener("load", () => {
  const preferredTheme = localStorage.getItem("theme") || "light";
  setTheme(preferredTheme);
});

// 按鈕點擊事件
const btnSwitchTheme = document.querySelector("#btnSwitchTheme");
btnSwitchTheme.addEventListener("click", toggleTheme);

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

if ($(window).width() > 450) {
  const sectionHeroEl = document.querySelector(".section-hero");
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }
      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-145px",
    }
  );
  obs.observe(sectionHeroEl);

  // 字 顯示

  const sectionConEl = document.querySelector(".section-content");
  const obs1 = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        // document.getElementById("ani").classList.remove("anim");
      }
      if (ent.isIntersecting === true) {
        document.getElementById("ani").classList.add("anim");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-45px",
    }
  );
  obs1.observe(sectionConEl);

  const sectioNani1El = document.querySelector(".ani1");
  const obs2 = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        // document.getElementById("ani-1").classList.remove("anim");
      }
      if (ent.isIntersecting === true) {
        document.getElementById("ani-1").classList.add("anim");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-200px",
    }
  );
  obs2.observe(sectioNani1El);

  const sectioNani2El = document.querySelector(".ani2");
  const obs3 = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        // document.getElementById("ani-1").classList.remove("anim");
      }
      if (ent.isIntersecting === true) {
        document.getElementById("ani-2").classList.add("anim");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-150px",
    }
  );
  obs3.observe(sectioNani2El);
} else if ($(window).width() < 450) {
  const sectionHeroEl = document.querySelector(".header-test");
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent.intersectionRatio);
      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }
      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    },
    {
      root: null,
      threshold: [0, 0.88, 0.9, 0.91],
      rootMargin: "-1px",
    }
  );
  obs.observe(sectionHeroEl);

  const sectionConEl = document.querySelector(".section-content");
  const obs1 = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        // document.getElementById("ani").classList.remove("anim");
      }
      if (ent.isIntersecting === true) {
        document.getElementById("ani").classList.add("anim");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-45px",
    }
  );
  obs1.observe(sectionConEl);

  const sectioNani1El = document.querySelector(".ani1");
  const obs2 = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        // document.getElementById("ani-1").classList.remove("anim");
      }
      if (ent.isIntersecting === true) {
        document.getElementById("ani-1").classList.add("anim");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px",
    }
  );
  obs2.observe(sectioNani1El);

  const sectioNani2El = document.querySelector(".ani2");
  const obs3 = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);
      if (ent.isIntersecting === false) {
        // document.getElementById("ani-1").classList.remove("anim");
      }
      if (ent.isIntersecting === true) {
        document.getElementById("ani-2").classList.add("anim");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-45px",
    }
  );
  obs3.observe(sectioNani2El);
}

var PARTICLE_NUM = 500;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY;
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];

window.addEventListener(
  "load",
  function () {
    canvas = document.getElementById("c");

    var resize = function () {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      centerX = canvasWidth * 0.5;
      centerY = canvasHeight * 0.5;
      context = canvas.getContext("2d");
      context.fillStyle = "rgb(255, 255, 255)";
    };

    document.addEventListener("resize", resize);
    resize();

    mouseX = centerX;
    mouseY = centerY;

    for (var i = 0, p; i < PARTICLE_NUM; i++) {
      particles[i] = randomizeParticle(new Particle());
      particles[i].z -= 500 * Math.random();
    }

    document.addEventListener(
      "mousemove",
      function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      false
    );

    document.addEventListener(
      "mousedown",
      function (e) {
        targetSpeed = BOOST_SPEED;
      },
      false
    );

    document.addEventListener(
      "mouseup",
      function (d) {
        targetSpeed = DEFAULT_SPEED;
      },
      false
    );

    setInterval(loop, 1000 / 60);
  },
  false
);

function loop() {
  context.save();
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.restore();

  speed += (targetSpeed - speed) * 0.01;

  var p;
  var cx, cy;
  var rx, ry;
  var f, x, y, r;
  var pf, px, py, pr;
  var a, a1, a2;

  var halfPi = Math.PI * 0.5;
  var atan2 = Math.atan2;
  var cos = Math.cos;
  var sin = Math.sin;

  context.beginPath();
  for (var i = 0; i < PARTICLE_NUM; i++) {
    p = particles[i];

    p.pastZ = p.z;
    p.z -= speed;

    if (p.z <= 0) {
      randomizeParticle(p);
      continue;
    }

    cx = centerX - (mouseX - centerX) * 1.25;
    cy = centerY - (mouseY - centerY) * 1.25;

    rx = p.x - cx;
    ry = p.y - cy;

    f = FL / p.z;
    x = cx + rx * f;
    y = cy + ry * f;
    r = PARTICLE_BASE_RADIUS * f;

    pf = FL / p.pastZ;
    px = cx + rx * pf;
    py = cy + ry * pf;
    pr = PARTICLE_BASE_RADIUS * pf;

    a = atan2(py - y, px - x);
    a1 = a + halfPi;
    a2 = a - halfPi;

    context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
    context.arc(px, py, pr, a1, a2, true);
    context.lineTo(x + r * cos(a2), y + r * sin(a2));
    context.arc(x, y, r, a2, a1, true);
    context.closePath();
  }
  context.fill();
}

function randomizeParticle(p) {
  p.x = Math.random() * canvasWidth;
  p.y = Math.random() * canvasHeight;
  p.z = Math.random() * 1500 + 500;
  return p;
}

/**
 * Particle
 */
function Particle(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.pastZ = 0;
}

// 漸層效果導航

("use strict");
const DOM = {
  timeline: "timeline",
  timelineStepper: "timeline__stepper",
  timelineStep: "timeline__step",
  timelineStepTitle: "timeline__step-title",
  timelineStepActive: "is-active",
  timelineStepActiveMarker: "timeline__step-active-marker",
  timelineSlidesContainer: "timeline__slides",
  timelineSlide: "timeline__slide",
  timelineSlideActive: "is-active",
};
const STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
  width: "--slide-width",
  posX: "--slide-pos-x",
  posY: "--slide-pos-y",
};
const SLIDES_CONTAINER_CUSTOM_PROPS = {
  height: "--slides-container-height",
};
const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper =
  timeline === null || timeline === void 0
    ? void 0
    : timeline.querySelector(`.${DOM.timelineStepper}`);
const timelineStepTitle =
  timeline === null || timeline === void 0
    ? void 0
    : timeline.querySelector(`.${DOM.timelineStepTitle}`);
const timelineSlidesContainer =
  timeline === null || timeline === void 0
    ? void 0
    : timeline.querySelector(`.${DOM.timelineSlidesContainer}`);
const timelineSlides =
  timeline && Array.from(timeline.querySelectorAll(`.${DOM.timelineSlide}`));
window.addEventListener("load", () => {
  createStepActiveMarker();
  activateCurrentSlide();
});
window.addEventListener("resize", () => {
  recalcStepActiveMarkerProps();
});
timeline === null || timeline === void 0
  ? void 0
  : timeline.addEventListener("click", (event) => {
      const { target } = event;
      if (
        !target ||
        !(target instanceof Element) ||
        !target.closest(`.${DOM.timelineStep}`)
      ) {
        return;
      }
      const currentStep = target.closest(`.${DOM.timelineStep}`);
      if (!currentStep) {
        return;
      }
      deactivateSteps();
      activateCurrentStep(currentStep);
      recalcStepActiveMarkerProps();
      deactivateSlides();
      activateCurrentSlide();
    });
function deactivateSteps() {
  const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
  steps === null || steps === void 0
    ? void 0
    : steps.forEach((elem) =>
        elem.classList.remove(`${DOM.timelineStepActive}`)
      );
}
function activateCurrentStep(currentStep) {
  currentStep === null || currentStep === void 0
    ? void 0
    : currentStep.classList.add(`${DOM.timelineStepActive}`);
}
function deactivateSlides() {
  timelineSlides === null || timelineSlides === void 0
    ? void 0
    : timelineSlides.forEach((elem) =>
        elem.classList.remove(`${DOM.timelineSlideActive}`)
      );
}
function activateCurrentSlide() {
  const currentSlide = getCurrentSlide();
  if (!currentSlide) {
    return;
  }
  const currentSlideHeight = getCurrentSlideHeight(currentSlide);
  setSlideContainerHeight(currentSlideHeight);
  currentSlide.classList.add(`${DOM.timelineSlideActive}`);
}
function createStepActiveMarker() {
  const stepActiveMarker = document.createElement("div");
  stepActiveMarker.classList.add(`${DOM.timelineStepActiveMarker}`);
  timelineStepper === null || timelineStepper === void 0
    ? void 0
    : timelineStepper.appendChild(stepActiveMarker);
  const positionProps = getStepActiveMarkerProps();
  if (!positionProps) {
    return;
  }
  setStepActiveMarkerProps(Object.assign({ stepActiveMarker }, positionProps));
}
function recalcStepActiveMarkerProps() {
  const stepActiveMarker =
    timeline === null || timeline === void 0
      ? void 0
      : timeline.querySelector(`.${DOM.timelineStepActiveMarker}`);
  const stepActiveMarkerProps = getStepActiveMarkerProps();
  if (!stepActiveMarkerProps) {
    return;
  }
  setStepActiveMarkerProps(
    Object.assign({ stepActiveMarker }, stepActiveMarkerProps)
  );
}
function setStepActiveMarkerProps({ stepActiveMarker, posX, posY, width }) {
  stepActiveMarker.style.setProperty(
    `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width}`,
    `${width}px`
  );
  stepActiveMarker.style.setProperty(
    `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX}`,
    `${posX}px`
  );
  if (typeof posY === "number") {
    stepActiveMarker.style.setProperty(
      `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY}`,
      `${posY}px`
    );
  }
}
function getStepActiveMarkerProps() {
  const { currentStep } = getCurrentStep();
  if (!currentStep) {
    return null;
  }
  const width = getElementWidth(currentStep);
  const posX = getStepActiveMarkerPosX(currentStep);
  const posY = getStepActiveMarkerPosY();
  if (typeof posX !== "number" || typeof posY !== "number") {
    return null;
  }
  return { posX, posY, width };
}
function getCurrentStep() {
  const timelineSteps = Array.from(
    document.querySelectorAll(`.${DOM.timelineStep}`)
  );
  const currentStep = timelineSteps.find((element) =>
    element.classList.contains(`${DOM.timelineStepActive}`)
  );
  const currentStepIndex =
    currentStep &&
    timelineSteps.findIndex((element) =>
      element.classList.contains(`${DOM.timelineStepActive}`)
    );
  return { currentStep, currentStepIndex };
}
function getCurrentSlide() {
  const { currentStepIndex } = getCurrentStep();
  if (typeof currentStepIndex !== "number" || !timelineSlides) {
    return null;
  }
  return timelineSlides[currentStepIndex];
}
function setSlideContainerHeight(height) {
  timelineSlidesContainer === null || timelineSlidesContainer === void 0
    ? void 0
    : timelineSlidesContainer.style.setProperty(
        `${SLIDES_CONTAINER_CUSTOM_PROPS.height}`,
        `${height}px`
      );
}
function getCurrentSlideHeight(currentSlide) {
  return currentSlide.clientHeight;
}
function getStepActiveMarkerPosY() {
  const timelineTitlePosY =
    timelineStepTitle === null || timelineStepTitle === void 0
      ? void 0
      : timelineStepTitle.getBoundingClientRect().top;
  const timelineStepperPosY =
    timelineStepper === null || timelineStepper === void 0
      ? void 0
      : timelineStepper.getBoundingClientRect().top;
  if (!timelineTitlePosY || !timelineStepperPosY) {
    return null;
  }
  return timelineTitlePosY - timelineStepperPosY;
}
function getStepActiveMarkerPosX(currentStep) {
  const timelineStepperPosX =
    timelineStepper === null || timelineStepper === void 0
      ? void 0
      : timelineStepper.getBoundingClientRect().left;
  const currentStepPosX = currentStep.getBoundingClientRect().left;
  if (!timelineStepperPosX) {
    return null;
  }
  return currentStepPosX - timelineStepperPosX;
}
function getElementWidth(elem) {
  return elem.clientWidth;
}

// *********************************************************************

//

// ——————————————————————————————————————————————————
// TextScramble 特殊字-light
// ——————————————————————————————————————————————————

// class TextScramble {
//   constructor(el) {
//     this.el = el;
//     this.chars = "!<>-_\\/[]{}—=+*^?#________";
//     this.update = this.update.bind(this);
//   }
//   setText(newText) {
//     const oldText = this.el.innerText;
//     const length = Math.max(oldText.length, newText.length);
//     const promise = new Promise((resolve) => (this.resolve = resolve));
//     this.queue = [];
//     for (let i = 0; i < length; i++) {
//       const from = oldText[i] || "";
//       const to = newText[i] || "";
//       const start = Math.floor(Math.random() * 40);
//       const end = start + Math.floor(Math.random() * 40);
//       this.queue.push({ from, to, start, end });
//     }
//     cancelAnimationFrame(this.frameRequest);
//     this.frame = 0;
//     this.update();
//     return promise;
//   }
//   update() {
//     let output = "";
//     let complete = 0;
//     for (let i = 0, n = this.queue.length; i < n; i++) {
//       let { from, to, start, end, char } = this.queue[i];
//       if (this.frame >= end) {
//         complete++;
//         output += to;
//       } else if (this.frame >= start) {
//         if (!char || Math.random() < 0.28) {
//           char = this.randomChar();
//           this.queue[i].char = char;
//         }
//         output += `<span class="dud">${char}</span>`;
//       } else {
//         output += from;
//       }
//     }
//     this.el.innerHTML = output;
//     if (complete === this.queue.length) {
//       this.resolve();
//     } else {
//       this.frameRequest = requestAnimationFrame(this.update);
//       this.frame++;
//     }
//   }
//   randomChar() {
//     return this.chars[Math.floor(Math.random() * this.chars.length)];
//   }
// }

// // ——————————————————————————————————————————————————
// // Example
// // ——————————————————————————————————————————————————

// const phrases = [
//   "歡迎來到Chronos,",
//   "面對「認知外」的世界與故事",
//   "you're going to realize",
//   "你會選擇毀滅還是適應",
//   "that there's a difference",
//   "between knowing the path",
//   "and walking the path",
// ];

// const el = document.querySelector(".text");
// const fx = new TextScramble(el);

// let counter = 0;
// const next = () => {
//   fx.setText(phrases[counter]).then(() => {
//     setTimeout(next, 800);
//   });
//   counter = (counter + 1) % phrases.length;
// };

// next();

// ——————————————————————————————————————————————————
// 前置遊戲
// ——————————————————————————————————————————————————

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}

const slider4 = document.querySelector(".slider-4");

function activate(e) {
  const items = document.querySelectorAll(".item-work");
  e.target.matches(".next-4") && slider4.append(items[0]);
  e.target.matches(".prev-4") && slider4.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);

// ///////////////////////////////////
// Adapted from https://github.com/udacity/ud891/tree/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution
// 將之前聚焦的元素保存起來
// 將之前聚焦的元素保存起來
let focusedElementBeforeModal;

// 找到模態框及其覆蓋層
const modalOverlay = document.querySelector(".modal-overlay");

// 將監聽器附加到所有模態切換器
const modalToggles = document.querySelectorAll(".modal-toggle");

for (let i = 0; i < modalToggles.length; i++) {
  modalToggles[i].addEventListener("click", openModal);
}

/**
 * 打開模態框並捕獲焦點。
 */
function openModal(e) {
  const modalId = e.target.getAttribute("data-modal-target");
  const modal = document.getElementById(modalId);

  // 保存當前的焦點
  focusedElementBeforeModal = document.activeElement;

  // 監聽並捕獲鍵盤事件
  modal.addEventListener("keydown", trapTabKey);

  // 監聽用於關閉模態框的指示器
  modalOverlay.addEventListener("click", closeModal);

  // 模態框關閉按鈕
  const closeButtons = modal.querySelectorAll(".modal-close");

  // 將監聽器附加到所有關閉模態框的按鈕
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", closeModal);
  }

  // 查找所有可聚焦的子元素
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = modal.querySelectorAll(focusableElementsString);

  // 將 NodeList 轉換為 Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  // 顯示模態框和覆蓋層
  modal.style.display = "block";
  modalOverlay.style.display = "block";

  // 這只是為了動畫，不是必需的。
  setTimeout(function () {
    modal.classList.remove("modal-closed");
  }, 10);

  // 聚焦第一個子元素
  firstTabStop.focus();

  function trapTabKey(e) {
    // 檢查 TAB 鍵是否按下
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      } else {
        // TAB
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeModal();
    }
  }
}

/**
 * 關閉模態框。
 */
function closeModal() {
  const openModals = document.querySelectorAll(".modal:not(.modal-closed)");

  for (let i = 0; i < openModals.length; i++) {
    const modal = openModals[i];

    // 添加動畫以關閉模態框
    modal.classList.add("modal-closed");

    // 這個 setTimeout 只是為了動畫，不是必需的。
    setTimeout(function () {
      // 隱藏模態框和覆蓋層
      modal.style.display = "none";
      modalOverlay.style.display = "none";
    }, 300);
  }

  // 將焦點設置回模態框打開之前的元素
  focusedElementBeforeModal.focus();
}
