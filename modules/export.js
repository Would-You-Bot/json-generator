import generateJson from "./generateJson.js";
import isEmptyOrSpaces from "./isEmptyOrSpaces.js";

const svgContainer = document.getElementById('svg');
// Setting up bodymovin animation
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets4.lottiefiles.com/packages/lf20_Jp1pCorlFf.json',
});
document.getElementById("generatebtn").onclick = function () {
    let finished = generateJson();
    let empty = false;
    finished["useful"].forEach(e => {
       if (isEmptyOrSpaces(e)) empty = true;
    })
    finished["useless"].forEach(e => {
      if (isEmptyOrSpaces(e)) empty = true;
   })
  if (empty) return alert("You can't have empty fields!");
  if (finished["useful"].length == 0 && finished["useless"].length == 0 && finished)
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
// Lottie
animItem.addEventListener('complete', () => svgContainer.classList.add('hide')); //Adding back the hide class once animation is complete