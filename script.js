document.getElementById("generatebtn").onclick = function() {


  let useful = document.getElementById('usefultext').value;
  let useless = document.getElementById('uselesstext').value;
  let nsfw = document.getElementById('nsfwtext').value;

   usefularray = useful.split(",");
   uselessarray = useless.split(",");
   nsfwarray = nsfw.split(",");

  var array = [];
$("#containeruseful :input").each(function(e){	
  array.push(this.value)
});

  console.log(array)






  
};