export default function generateJson() {
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