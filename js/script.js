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

function setTheme(theme) {
  // 儲存顯示模式
  localStorage.setItem("theme", theme);

  // 切換顯示模式
  // 如果為淺色模式，就將 dark-theme.css disabled 設定為 true
  // 如果為深色模式，則將 dark-theme.css disabled 設定為 false
  document.getElementById("darkTheme").disabled = theme != "dark";
}

window.addEventListener("load", (event) => {
  let preferredTheme = localStorage.getItem("theme");
  let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (preferredTheme == null) {
    preferredTheme = darkQuery.matches ? "dark" : "light";
  }

  // 監聽作業系統是否切換顯示模式
  darkQuery.addListener(function (e) {
    setTheme(e.matches ? "dark" : "light");
  });

  // 設定顯示模式
  setTheme(preferredTheme);
});

const Name = document.querySelector(".Name");

document.getElementById("btnSwitchTheme").addEventListener("click", () => {
  let preferredTheme = localStorage.getItem("theme");
  if (preferredTheme == "dark") {
    setTheme("light");
  }
  if (preferredTheme == "light") {
    setTheme("dark");
  }
});
