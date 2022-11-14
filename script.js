import generateJson from "./modules/generateJson.js";
import isEmptyOrSpaces from "./modules/isEmptyOrSpaces.js";

/* 
  Functions
*/
function refreshPreview(changeState = false) {
  const json = JSON.stringify(generateJson(), undefined, 4);
  var preview = document.getElementById("preview-window");
  if (changeState) {
    if (preview.parentElement.classList.contains("previewHidden")) {
      preview.parentElement.classList.remove("previewHidden");
      preview.parentElement.classList.add("previewVisible");
    }
    else {
      preview.parentElement.classList.remove("previewVisible");
      preview.parentElement.classList.add("previewHidden");
    }
  }
  preview.innerHTML = json;
  hljs.highlightAll();
}
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
const onFileChange = (event) => {
  let reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
};

const onReaderLoad = (event) => {
  const obj = JSON.parse(event.target.result);
  let parsed = false;

  if (obj) {
    if (typeof obj === "object") {
      if (
        obj.hasOwnProperty("useful") &&
        obj.hasOwnProperty("useless")
      ) {
        for (let [k, v] of Object.entries(obj)) {
          const id = `container${k}`;
          if (typeof v === "object") {
            parsed = true;
            v.forEach((v) => {
              if (!isEmptyOrSpaces(v)) createInput(id, v);
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
const removeButtonEventListener = (e) => {
  e.target.parentElement.remove();
  refreshPreview();
};
/* 
  EventListeners.
*/
document.getElementById("addbtn1").onclick = function () {
  let value = generateJson();
  if (value.useful.filter(entry => /\S/.test(entry)).length !== value.useful.length) return alert("You can't have empty fields!");
  const inputs = document.querySelectorAll("#containeruseful input");
  var lastInput = inputs.item(inputs.length - 1);

  if (lastInput.value) {
    createInput("containeruseful", inputs[0].value);
    inputs[0].value = "";
    inputs[0].focus();
  }
};
document.getElementById("addbtn2").onclick = function () {
  let value = generateJson();
  if (value.useless.filter(entry => /\S/.test(entry)).length !== value.useless.length) return alert("You can't have empty fields!");
  const inputs = document.querySelectorAll("#containeruseless input");
  var lastInput = inputs.item(inputs.length - 1);
  if (lastInput.value) {
    createInput("containeruseless", inputs[0].value);
    inputs[0].value = "";
    inputs[0].focus();
  }
};

document.getElementById("previewbtn").onclick = function () {
  refreshPreview(true);
};
document.getElementById("file").addEventListener("change", onFileChange);

