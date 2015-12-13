/**
 * Created by tianhengzhou on 12/4/15.
 * This file contains the logic that used to initial the map and put the marker on the map
 */
function mapViewModel() {
    var self = this;
    // Define search term and assign initial value as Chinese food
    self.searchTerm = ko.observable('Chinese Food');
    // update search result function
    self.updateSearchResult = function(){
        ko.computed(function(){
            window.setTimeout(function(){
                yelpSearch('94087', self.searchTerm());
            },600)
        }, self);
    };
    var mapMarkers = [];
    var myLatlng = new google.maps.LatLng(37.352886, -122.012384);
    var mapOptions = {
        zoom: 12,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    /*
     * Map initial function
     * */
    function mapInit() {
        map.addListener('click', function () {
            window.setTimeout(function () {
                $('#mark_info').removeClass('show')
            }, 600);
            $('#yelp_list').find('li').removeClass('active');
            mapMarkers.forEach(function (marker) {
                marker.setAnimation(null);
            })
        });
    }

    /*
     * Add business mark onto map.
     * */
    function addBusinessMark(position, timeout, i, dataSet) {
        var iconImage = {
            url: '/images/yelp_star.png',
            size: new google.maps.Size(24, 32)
        };
        var activeImage = {
            url: '/images/yelp_star_active.png'
        };
        var content = infoWindowTemplate(dataSet);
        var infowindow = new google.maps.InfoWindow({
            content: content,
            maxWidth: 250
        });
        // The function that is used to gradually put the markers on map
        window.setTimeout(
            function () {
                var mkr = new google.maps.Marker(
                    {
                        position: position,
                        map: map,
                        icon: iconImage,
                        animation: google.maps.Animation.DROP
                    }
                );
                /*
                 * Add mouse click event to set bounce animate to mark. Also pulling out list and set the viewport to
                 * the corresponded list item.
                 * */
                mkr.addListener('click', (function (mkr, i) {
                        return function () {
                            toggleBounce(mkr, i)
                        }

                    })(mkr, i)
                );
                // Add mouse over event to change the icon to grey yelp to indicate mouse over.
                mkr.addListener('mouseover', function () {
                    var icon = mkr.getIcon();
                    icon.url = '/images/yelp_star_active.png';
                    mkr.setIcon(icon);
                    infowindow.open(map, mkr)
                });
                // Add mouse out event to change the icon back to origin.
                mkr.addListener('mouseout', function () {
                    var icon = mkr.getIcon();
                    icon.url = '/images/yelp_star.png';
                    mkr.setIcon(icon);
                    infowindow.close()
                });
                mapMarkers.push(mkr);
            }, timeout
        )
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < mapMarkers.length; i++) {
            mapMarkers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        mapMarkers = [];
    }

    //Assemble url and use Ajax function to get data from backend and use the data to construct the business list
    // and markers.
    function yelpSearch(location, term) {
        var searchUrl = "/yelpsearch?location=" + location + "&term=" + term;
        $.get(searchUrl, function (data) {
            yelpList(JSON.parse(data));
        });
        return true
    }

    // The function used to construct business list and markers.
    function yelpList(data, map) {
        var businesses = data.businesses;
        var yelpList = $('#yelp_list');
        yelpList.empty();
        deleteMarkers();
        businesses.forEach(function (business, i) {
            yelpList.append(listTemplate(business));
            pushBusinessMarker(business, i)
        })
    }

    // The template to generate each single list item.
    function listTemplate(dataSet) {
        var bImage = "<img src='" + dataSet.image_url + "'>",
            bRating = "<img src='" + dataSet.rating_img_url_small + "'>",
            lImage = "<li><div class='row'><div class='col-xs-3 img-container'>" + bImage + bRating +
                "</div>",
            lTitle = "<div class='col-xs-9'><h4><a href='" + dataSet.url + "'>" + dataSet.name + "</a></h4>",
            lphone = "<p>" + dataSet.display_phone + "<p>",
            lAddress = "<p>" + dataSet.location.display_address.join("</p><p>") + "</p></div></div></li>";
        return lImage + lTitle + lphone + lAddress
    }

    // The template to generate the info window for each marker.
    function infoWindowTemplate(dataSet) {
        var snippetImage = "<img src='" + dataSet.snippet_image_url + "'>",
            snippetText = "<p>" + dataSet.snippet_text + "</p></div>",
            bName = "<div class='info-window'><h4><a href='" + dataSet.url + "'>" + dataSet.name + "</a></h4>";
        return bName + snippetImage + snippetText
    }

    // The function to push the markers onto maps.
    function pushBusinessMarker(dataSet, i) {
        var blat = dataSet.location.coordinate.latitude,
            blng = dataSet.location.coordinate.longitude,
            bposition = new google.maps.LatLng(blat, blng);
        addBusinessMark(bposition, 200, i, dataSet)
    }

    // The event for opening the info window for each marker.
    function mouseOverMarkEvent(dataSet, mkr, map) {
        var content = infoWindowTemplate(dataSet);
        var infowindow = new google.maps.infoWindow({
            content: content
        });
        mkr.addListener('mouseover', function () {
            infowindow.open(map, mkr)
        })
    }

    // The function to set bounce animation to markers and also the animation of list(including pulling out and pushing in
    // and change viewport to selected item).
    function toggleBounce(mkr, i) {
        if (mkr.getAnimation() !== null) {
            mkr.setAnimation(null);
            window.setTimeout(function () {
                $('#mark_info').removeClass('show')
            }, 600);
            $('#yelp_list').find('li').removeClass('active');
        }
        else {
            mapMarkers.forEach(function (marker, index) {
                if (marker.getAnimation() !== null && index !== i) {
                    marker.setAnimation(null);
                    $('#yelp_list').find('li').removeClass('active');
                }
            })
        }
        mkr.setAnimation(google.maps.Animation.BOUNCE);
        $('#yelp_list').find('li').eq(i).addClass('active');
        $('#mark_info').animate({
            scrollTop: 200 * i
        });
        $('#mark_info').addClass('show')
    }

    // Map sequence initiating and set original info as Chinese food
    mapInit();
    yelpSearch('94087', 'Chinese Food');
}

$(function(){
    ko.applyBindings(new mapViewModel());
});
