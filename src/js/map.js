var map;
function initialize() {
    var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(59.4626475, 28.0408413),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);