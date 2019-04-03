import GoogleMapsLoader from 'google-maps';

class Map {
  constructor(rootSelector = '#gmap') {
    this.mapContainer = document.querySelector(rootSelector);
    this.center = [59.462475, 28.0408413];
    this.key = 'AIzaSyBFJkLTCugVE8sB4qEJ3-AXfFoGsFRvJ14';
    this.ver = '3.36';
  }

  init = () => {
    const {center, mapContainer, key, ver} = this;
    GoogleMapsLoader.KEY = key;
    GoogleMapsLoader.VERSION = ver;
    GoogleMapsLoader.load(google => {
      const options = {
        zoom: 17,
        center: new google.maps.LatLng(center[0], center[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      new google.maps.Map(mapContainer, options);
    });
  };
}

export default Map;
