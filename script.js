const svgContainer = document.getElementById('svg');
// Setting up bodymovin animation
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets4.lottiefiles.com/packages/lf20_Jp1pCorlFf.json',
});

const toggleIcon = document.querySelector("#toggle-icon");

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function generateJson() {
  var arrayuseful = [];
  $("#containeruseful :input").each(function (e) {
    arrayuseful.push(this.value);
  });
  const filteruseful = arrayuseful.filter((a) => a);

  var arrayuseless = [];
  $("#containeruseless :input").each(function (e) {
    arrayuseless.push(this.value);
  });
  const filteruseless = arrayuseless.filter((a) => a);

  var arraynsfw = [];
  $("#containernsfw :input").each(function (e) {
    arraynsfw.push(this.value);
  });
  const filternsfw = arraynsfw.filter((a) => a);

  const finished = {
    useful: filteruseful,
    useless: filteruseless,
    nsfw: filternsfw,
  };

  return finished;
}

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

document.getElementById("generatebtn").onclick = function () {
  finished = generateJson();

  if (finished["useful"].length == 0 && finished["useless"].length == 0 && finished["nsfw"].length == 0)
    return alert("You need to add at least one question before exporting");

  svgContainer.classList.remove('hide'); //making visible
  animItem.goToAndPlay(0, true); //resetting animation

  const blob = new Blob([JSON.stringify(finished)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wouldyou-export.json";
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
};

document.getElementById("addbtn1").onclick = function () {
  const inputs = document.querySelectorAll("#containeruseful input");
  document.getElementById("error1").innerHTML = "";
  if (isEmptyOrSpaces(inputs[0].value)) return document.getElementById("error1").innerHTML = "No empty string allowed";
  var lastInput = inputs.item(inputs.length - 1);

  if (lastInput.value) {
    createInput("containeruseful", inputs[0].value);
    inputs[0].value = "";
    inputs[0].focus();
  }
};
document.getElementById("addbtn2").onclick = function () {
  const inputs = document.querySelectorAll("#containeruseless input");
  document.getElementById("error2").innerHTML = "";
  if (isEmptyOrSpaces(inputs[0].value)) return document.getElementById("error2").innerHTML = "No empty string allowed";
  var lastInput = inputs.item(inputs.length - 1);
  if (lastInput.value) {
    createInput("containeruseless", inputs[0].value);
    inputs[0].value = "";
    inputs[0].focus();
  }
};
document.getElementById("addbtn3").onclick = function () {
  const inputs = document.querySelectorAll("#containernsfw input");
  var lastInput = inputs.item(inputs.length - 1);
  document.getElementById("error3").innerHTML = "";
  if (isEmptyOrSpaces(inputs[0].value)) return document.getElementById("error3").innerHTML = "No empty string allowed";
  if (lastInput.value) {
    createInput("containernsfw", inputs[0].value);
    inputs[0].value = "";
    inputs[0].focus();
  }
};

const removeButtonEventListener = (e) => {
  e.target.parentElement.remove();
  refreshPreview();
};

function createInput(id, lastKnownValue) {
  if (!lastKnownValue) {
    return;
  }
  refreshPreview();
  const container = document.getElementById(id);
  const parent = document.createElement("div");
  const remove = document.createElement("button");

  parent.className = "oneline";
  remove.innerHTML = "-";
  remove.className = "removeBtn";
  remove.addEventListener("click", removeButtonEventListener);

  const input = document.createElement("input");
  input.type = "text";
  input.value = lastKnownValue;

  parent.append(input, remove);
  container.append(parent);
}

document.getElementById("previewbtn").onclick = function () {
  refreshPreview(true);
};

const onFileChange = (event) => {
  let reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
};

const onReaderLoad = (event) => {
  console.log(event.target.result);
  const obj = JSON.parse(event.target.result);
  let parsed = false;
  let ended = false;
  if (obj) {
    if (typeof obj === "object") {
      if (
        obj.hasOwnProperty("useful") &&
        obj.hasOwnProperty("useless") &&
        obj.hasOwnProperty("nsfw")
      ) {
        obj.useful.forEach((e) => {
          if (isEmptyOrSpaces(e)) {
            ended = true;
            alert("Your export file has one or many empty question");
          }
        });
        obj.useless.forEach((e) => {
          if (isEmptyOrSpaces(e)) {
            ended = true;
            alert("Your export file has one or many empty question");
          }
        });
        obj.nsfw.forEach((e) => {
          if (isEmptyOrSpaces(e)) {
            ended = true;
            alert("Your export file has one or many empty question");
          }
        });
        if (ended) return;
        for (let [k, v] of Object.entries(obj)) {
          const id = `container${k}`;
          if (typeof v === "object") {
            parsed = true;
            v.forEach((v) => {
              createInput(id, v);
            });
          }
        }
      }
    }
  }
  if (!parsed) {
    alert("Error in parsing your JSON file.");
  }
};
document.getElementById("file").addEventListener("change", onFileChange);

function refreshPreview(changeState = false) {
  const json = JSON.stringify(generateJson(), undefined, 4);
  var preview = document.getElementById("preview-window");
  if (changeState) {
    preview.parentElement.hidden = !preview.parentElement.hidden;
  }
  preview.innerHTML = json;
  hljs.highlightAll();
}
// Lottie
animItem.addEventListener('complete', () => svgContainer.classList.add('hide')); //Adding back the hide class once animation is complete