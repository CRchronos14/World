console.log("HOLLO");

//////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

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
    rootMargin: "-100px",
  }
);
obs.observe(sectionHeroEl);

// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     console.log(ent);

// if (ent.isIntersecting === false) {
//   document.body.classList.add("sticky");
// }

//     if (ent.isIntersecting === true) {
//       document.body.classList.remove("sticky");
//     }
//   },
//   {
//     // In the viewport
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   }
// );
// obs.observe(sectionHeroEl);
