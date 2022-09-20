document.getElementById("generatebtn").onclick = function () {
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

  console.log(finished);

if(filteruseful.length == 0) return alert("You need to add at least one question before exporting");

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
  var lastInput = inputs.item(inputs.length-1);

  if(lastInput.value) {
    const container = document.getElementById("containeruseful");
    const input = document.createElement("input");
    input.type = 'text';
    container.appendChild(input);
  }
};
document.getElementById("addbtn2").onclick = function () {
  const inputs = document.querySelectorAll("#containeruseless input");
  var lastInput = inputs.item(inputs.length-1);
  
  if(lastInput.value) {const container = document.getElementById("containeruseless");
    const input = document.createElement("input");
    input.type = 'text';
    container.appendChild(input);
  }
};
document.getElementById("addbtn3").onclick = function () {
  const inputs = document.querySelectorAll("#containernsfw input");
  var lastInput = inputs.item(inputs.length-1);
  
  if(lastInput.value) {
    const container = document.getElementById("containernsfw");
    const input = document.createElement("input");
    input.type = 'text';
    container.appendChild(input);
  }
};
