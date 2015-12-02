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
        addMapMark(myLatlng,200,map);
        yelpSearch('94087','Chinese Food')
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
    function yelpSearch(location, term){
        var searchUrl = "/yelpsearch?location="+location+"&term="+term;
        $.getJSON(searchUrl,function(data){
            console.log(data)
        })
    }
    function yelpBusinessList(bName,bLoc,bSnippet,bSnippet_image,bRating,bUrl){

    }
    mapInit();
};

$(function(){
    ko.applyBindings(new mapViewModel());
});