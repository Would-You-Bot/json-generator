const toggleIcon = document.querySelector("#toggle-icon");
// for dark theme
(function () {
  if (localStorage.getItem("dark") === "false") {
    document.body.classList.toggle("light-mode");
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  } else {
    localStorage.setItem("dark", "true");
  }
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (localStorage.getItem("dark") === "true") {
      localStorage.setItem("dark", "false");
      toggleIcon.classList.remove("fa-sun");
      toggleIcon.classList.add("fa-moon");
    } else {
      localStorage.setItem("dark", "true");
      toggleIcon.classList.remove("fa-moon");
      toggleIcon.classList.add("fa-sun");
    }
  });
})();