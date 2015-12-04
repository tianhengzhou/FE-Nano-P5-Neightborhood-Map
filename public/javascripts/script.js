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
            data.businesses.forEach(function(business){
                var bName = business.name,
                    bLoc,
                    bSnippet = business.snippet_text,
                    bSnippet_image = business.snippet_image_url,
                    bRating = business.rating_img_url_large,
                    bUrl = business.url;
                bLoc = {
                    lat: business.coordinate.latitude,
                    lon: business.coordinate.longitude,
                    add: business.display_address
                };
                yelpBusinessList(bName, bLoc, bSnippet, bSnippet_image, bRating,bUrl)
            })
        })
    }
    function yelpBusinessList(bName,bLoc,bSnippet,bSnippet_image,bRating,bUrl){
        var $yelpBusinessList = $('#mark_info')
    }
    mapInit();
};

$(function(){
    ko.applyBindings(new mapViewModel());
});