const trackSats = require('./trackSats')
const {viewer} = require('./globe.js')
import * as Cesium from 'cesium';
const satellite = require('satellite.js')
viewer.clock.shouldAnimate = true

console.log("View the source code: https://github.com/Withenex/satelliteTracker")

trackSats().then(sats=>{
    

    
    sats.forEach(sat=>{
        globeSetup(sat)
    })

    setInterval(()=>{
        var clockDate = Cesium.JulianDate.toDate(viewer.clock.currentTime)
        sats.forEach(sat=>{
            sat.pointEntity.position = getCoords(sat,clockDate)
        })
    },1000/30)

}).catch(err=>{
    console.log("couldn't get sat data")
    console.log(err)
});



function globeSetup(sat){
    
    const date = Cesium.JulianDate.toDate(viewer.clock.currentTime)

    var cartesianPosition = getCoords(sat,date);

    

   

    sat.pointEntity = viewer.entities.add({
        description: sat.name,
        position: cartesianPosition,
        point: {pixelSize: 3,color: Cesium.Color.fromRandom()},
       
    })


}

function getCoords(sat,date)
{
    var gsTime = satellite.gstime(date)
    var positionAndVelocity = satellite.propagate(sat.satRec,date)

    var position = satellite.eciToGeodetic(positionAndVelocity.position,gsTime)
    
    position.latitude = satellite.degreesLat(position.latitude);
    position.longitude = satellite.degreesLong(position.longitude)
    position.height *= 1000

    var cartesian = new Cesium.Cartesian3.fromDegrees(position.longitude,position.latitude,position.height)
    return cartesian
}