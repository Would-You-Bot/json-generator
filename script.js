document.getElementById("generatebtn").onclick = function() {


  let useful = document.getElementById('usefultext').value;
  let useless = document.getElementById('uselesstext').value;
  let nsfw = document.getElementById('nsfwtext').value;

   usefularray = useful.split(",");
   uselessarray = useless.split(",");
   nsfwarray = nsfw.split(",");


   // console.log(usefularray)
   // console.log(uselessarray)
   // console.log(nsfwarray)


var id;
$("#containeruseful :input").each(function(e){	
  id = this.id;
//console.log([this.value]);
var all = $.merge([], [this.value]);
console.log(all)
});






  
};