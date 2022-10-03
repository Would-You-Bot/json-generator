let lightmode = localStorage.getItem("lightmode");
lightmode = lightmode || "false";
const lightModeToggle = document.getElementById("light-mode-toggle");

lightModeToggle.addEventListener("click", () => {
  console.log("clicked");
  if (lightmode === "true") {
    disableLightMode();
  } else {
    enableLightMode();
  }
  console.log(lightmode);
});

function enableLightMode() {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "true");
  lightmode = "true";
}

function disableLightMode() {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", "false");
  lightmode = "false";
}

if (lightmode === "true") {
  enableLightMode();
}

lightModeToggle.checked = lightmode === "true";
