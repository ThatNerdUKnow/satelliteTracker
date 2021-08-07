
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/';

import * as Cesium from 'cesium';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZmEwZmViYi1jOGRhLTRhMjQtYTZiNC03ZjFmMjZjZThjNGMiLCJpZCI6NTUyMDMsImlhdCI6MTYyMDU4MTY2NX0.PAXxOTQ0YOUNCL56ZUfMpEXjfAjDtW26UgyVwXNvkLo'

// Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain()
});    


export {viewer}