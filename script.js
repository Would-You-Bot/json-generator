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
  } else {
    localStorage.setItem("dark", "true");
  }

  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (localStorage.getItem("dark") === "true") {
      localStorage.setItem("dark", "false");
    } else {
      localStorage.setItem("dark", "true");
    }
  });
})();

document.getElementById("generatebtn").onclick = function () {
  finished = generateJson();

  if (finished["useful"].length == 0)
    return alert("You need to add at least one question before exporting");

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
  var lastInput = inputs.item(inputs.length - 1);

  if (lastInput.value) {
    createInput("containeruseful", inputs[0].value);
    inputs[0].value = "";
  }
};
document.getElementById("addbtn2").onclick = function () {
  const inputs = document.querySelectorAll("#containeruseless input");
  var lastInput = inputs.item(inputs.length - 1);
  if (lastInput.value) {
    createInput("containeruseless", inputs[0].value);
    inputs[0].value = "";
  }
};
document.getElementById("addbtn3").onclick = function () {
  const inputs = document.querySelectorAll("#containernsfw input");
  var lastInput = inputs.item(inputs.length - 1);

  if (lastInput.value) {
    createInput("containernsfw", inputs[0].value);
    inputs[0].value = "";
  }
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

const removeButtonEventListener = (e) => {
  e.target.parentElement.remove();
  refreshPreview();
};

const onFileChange = (event) => {
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
};

const onReaderLoad = (event) => {
  console.log(event.target.result);
  const obj = JSON.parse(event.target.result);
  let parsed = false;
  if (obj) {
    if (typeof obj === "object") {
      if (
        obj.hasOwnProperty("useful") &&
        obj.hasOwnProperty("useless") &&
        obj.hasOwnProperty("nsfw")
      ) {
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
