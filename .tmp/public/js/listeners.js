var lopen;

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
