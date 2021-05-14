const trackSats = require('./trackSats')
const {viewer} = require('./globe.js')
import * as Cesium from 'cesium';
const satellite = require('satellite.js')

viewer.clock.shouldAnimate = false

trackSats().then(sats=>{
    console.log(sats)

    
    sats.forEach(sat=>{
        globeSetup(sat)
    })

    const timeStep = 1
    const sampleCount = 1
    var clockJulian = viewer.clock.currentTime;

    setInterval(()=>{
        clockJulian = Cesium.JulianDate.addMinutes(clockJulian,sampleCount*timeStep,clockJulian)
        var clockDate = Cesium.JulianDate.toDate(clockJulian)
        sats.forEach(sat=>{
            var sample = getCoords(sat,clockDate)

            sat.pointEntity.position.addSample(clockJulian,sample)
        })
        console.log(sats[0].pointEntity.position)
        viewer.clock.currentTime = clockJulian
    },1000/30)

}).catch(err=>{
    console.log("couldn't get sat data")
    console.log(err)
});



function globeSetup(sat){
    
    const julianDate = viewer.clock.currentTime
    const date = Cesium.JulianDate.toDate(julianDate)

    var cartesianPosition = getCoords(sat,date);

    var positionProperty = new Cesium.SampledPositionProperty()

    positionProperty.addSample(julianDate,cartesianPosition)

   

    sat.pointEntity = viewer.entities.add({
        description: sat.name,
        position: positionProperty,
        point: {pixelSize: 2,color: Cesium.Color.fromRandom()}
    })


}

function getCoords(sat,date)
{
    var gsTime = satellite.gstime(date)
    var positionAndVelocity = satellite.propagate(sat.satRec,date)

    var position = satellite.eciToEcf(positionAndVelocity.position,gsTime)
    
    //position.latitude = satellite.degreesLat(position.latitude);
    //position.longitude = satellite.degreesLong(position.longitude)
    position.x *= 1000;
    position.y *= 1000;
    position.z *= 1000;

    var cartesian = new Cesium.Cartesian3(position.x,position.y,position.z)
    return cartesian
}