/**
 * Created by tianhengzhou on 11/13/15.
 */
var mapViewModel = function(){
    var mapMarkers = ko.observableArray([]);

    function mapInit(){
        var myLatlng = new google.maps.LatLng(37.352886, -122.012384);
        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions:{
                position: google.maps.ControlPosition.TOP_CENTER
            }
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        addMapMark(myLatlng,200,map)
        }
    function addMapMark(position, timeout, map){
        window.setTimeout(
            function(){
                mapMarkers.push(new google.maps.Marker(
                    {
                        position: position,
                        map: map,
                        animation: google.maps.Animation.DROP
                    }
                ))
            }, timeout
        )
    }
    function yelpSearch(zipCode, searchFor){
        var searchUrl = "/yelpsearch?zipcode="+zipCode+"&search="+searchFor;
        $.getJSON(searchUrl,function(data){

        })
    }
    mapInit();
};

$(function(){
    ko.applyBindings(new mapViewModel());
});