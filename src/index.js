const trackSats = require('./trackSats')
const Cesium = require('./globe.js')


trackSats().then(sats=>{
    console.log(sats)
}).catch(err=>{
    console.log("couldn't get sat data")
});