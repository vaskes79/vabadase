import GoogleMapsLoader from 'google-maps';

class Map {
  constructor(rootSelector = '#gmap') {
    this.mapContainer = document.querySelector(rootSelector);
    this.center = [59.462475, 28.0408413];
    this.key = process.env.G_KEY;
    this.ver = process.env.G_VER;
    this.lang = process.env.G_LANG;
  }

  init = () => {
    const {center, mapContainer, key, ver, lang} = this;
    GoogleMapsLoader.KEY = key;
    GoogleMapsLoader.VERSION = ver;
    GoogleMapsLoader.LANGUAGE = lang;
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
