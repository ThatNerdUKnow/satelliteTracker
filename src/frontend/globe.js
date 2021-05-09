
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/';

import * as Cesium from 'cesium';


// Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain()
});    


export {viewer}