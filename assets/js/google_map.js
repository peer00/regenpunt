var map;
var directionsDisplay;

var style = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 52.397, lng: 4.844},
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: style
  });
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
    travelMode: function() {
      if (lopen) {
        return google.maps.TravelMode.WALKING
      }
      else {return google.maps.TravelMode.BICYCLING}
    }(),
    unitSystem: google.maps.UnitSystem.METRIC,
    provideRouteAlternatives: true,
    region: "NL"
  };

  directionsService.route(directionsRequestDetails, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {

      // directionsDisplay.setDirections(result);
      // directionsDisplay.setRouteIndex(0); //pas dynamisch de route aan als er alternatief is
      numberOfRoutes = result.routes.length;

      var colorArray = ["green", "yellow", "red"];

      for (var i = 0; i < numberOfRoutes; i++) {
        directionsDisplays.new({
          map: map,
          directions: result,
          routeIndex: i,
          polylineOptions: {
            strokeColor: colorArray.pop() //set color of route on map (green, yellow, red)
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
  }
});

$(".routeInput input").keypress(function (e) {
  if (e.which == 13) {
    directionsDisplays.clear();
    calcRoute();

  }
});
