const trackSats = require('./trackSats')
const {viewer} = require('./globe.js')
import * as Cesium from 'cesium';
const satellite = require('satellite.js')


trackSats().then(sats=>{
    console.log(sats)

    
    sats.forEach(sat=>{
        globeSetup(sat)
    })

    
    

}).catch(err=>{
    console.log("couldn't get sat data")
    console.log(err)
});

function globeSetup(sat){
    const date = new Date();
    var gsTime = satellite.gstime(date)
    var positionAndVelocity = satellite.propagate(sat.satRec,new Date())

    var position = satellite.eciToGeodetic(positionAndVelocity.position,gsTime)
    
    position.latitude = satellite.degreesLat(position.latitude);
    position.longitude = satellite.degreesLong(position.longitude)
    position.height *= 1000
    

    const pointEntity = viewer.entities.add({
        description: sat.name,
        position: Cesium.Cartesian3.fromDegrees(position.longitude,position.latitude,position.height),
        point: {pixelSize: 5,color: Cesium.Color.RED}
    })

    
}