var lopen;
//var scope = {};

$("#lopen").click(function(){
  lopen = 1;
  directionsDisplays.clear();
  calcRoute();
});

$("#fietsen").click(function(){
  lopen = 0;
  directionsDisplays.clear();
  calcRoute();
});

$(".routeInput .btn").click(function(){
    $(this).removeClass("btn-default").addClass("btn-primairy").siblings().removeClass("btn-primairy").addClass("btn-default");
});

var html = "<table style=\"width:100%\"><tr><th>Vertrekpunt</th><th>Bestemming</th><th>Aangemaakt</th></tr>";

io.socket.get("/route/find", function(data, jwr){
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    html += "<tr><td>" + data[i].origin + "</td><td>" + data[i].destination + "</td><td><time>" + Date(data[i].createdAt) + "</time></td></tr>"
  };

  $("#listAllRoutes").append(html);

})
