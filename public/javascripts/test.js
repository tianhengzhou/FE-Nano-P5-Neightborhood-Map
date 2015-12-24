/**
 * Created by tianhengzhou on 12/20/15.
 */
function mapViewModel(){
  var self = this;
  var map, myLatLng, mapOptions;
  var content, infowindow;
  this.searchTerm = ko.observable('Chinese Food');
  this.filterTerm = ko.observable('');
  this.blists = ko.observableArray([]);
  this.filterList = ko.observableArray([]);
  this.mapMarkers = ko.observableArray([]);
  myLatLng = new google.maps.LatLng(37.352886, -122.012384);
  mapOptions = {
    zoom: 12,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  };
  map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
  function mapInit() {
    map.addListener('click', function() {
      window.setTimeout(function() {
        $('#mark_info').removeClass('show')
      }, 600);
      $('#yelp_list').find('li').removeClass('active');
      self.mapMarkers().forEach(function(marker) {
        marker.setAnimation(null);
      })
    });
  }
  function yelpSearch(location, term){
    var searchUrl = "/yelpsearch?location=" + location + "&term=" + term;
    $.get(searchUrl, function(data) {
      yelpList(JSON.parse(data));
    });
  }
  function yelpList(data, map) {
    var yelpList = $('#yelp_list');
    yelpList.empty();
    data.businesses.forEach(function(business){
      self.blists().push(business);
    });
    self.filterList(self.blists());
  }
}
