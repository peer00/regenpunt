var map;
var directionsDisplay;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 52.397, lng: 4.844},
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  // directionsDisplay = new google.maps.DirectionsRenderer();
  // directionsDisplay.setMap(map);
};

var directionsDisplays = {
  directionsDisplay: [],
  new: function(obj) {this.directionsDisplay.push(new google.maps.DirectionsRenderer(obj));
  },
  clear: function() {
    for (var i = 0; i < this.directionsDisplay.length; i++) {
      this.directionsDisplay[i].setMap(null);
    };
  }
};


var numberOfRoutes;

function calcRoute() {
  var origin = $("#origin").val();
  var destination = $("#destination").val();

  var directionsService = new google.maps.DirectionsService();

  var directionsRequestDetails = {
    // origin: "amsterdam",
    // destination: "amstelveen",
    origin: $("#origin").val(),
    destination: $("#destination").val(),
    travelMode: google.maps.TravelMode.BICYCLING,
    unitSystem: google.maps.UnitSystem.METRIC,
    provideRouteAlternatives: true,
    region: "NL"
  };

  directionsService.route(directionsRequestDetails, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {

      // directionsDisplay.setDirections(result);
      // directionsDisplay.setRouteIndex(0); //pas dynamisch de route aan als er alternatief is
      numberOfRoutes = result.routes.length;

      var routeColor = "blue";

      for (var i = 0; i < numberOfRoutes; i++) {
        directionsDisplays.new({
          map: map,
          directions: result,
          routeIndex: i,
          polylineOptions: {
            strokeColor: routeColor //set color of route on map (green, yellow, red)
          }
        });
      };
      $("#origin").val("");
      $("#destination").val("");
      $("#origin").val(origin);
      $("#destination").val(destination);
    }
  });
};

$(".routeInput input").change(function(){
  if ($("#origin").val() && $("#destination").val()) {
    directionsDisplays.clear();
    calcRoute();
    // $("#origin").val("");
    // $("#destination").val("");
  }
});

$(".routeInput input").keypress(function (e) {
  directionsDisplays.clear();
  if (e.which == 13) {
    calcRoute();

  }
});
