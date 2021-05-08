const axios = require('axios')
const chunk = require('lodash/chunk')
const satellite = require('satellite.js')

async function trackSats()
{
    var satData = await axios.get("https://www.celestrak.com/NORAD/elements/stations.txt");
    satData = satData.data.split("\r\n")
    
    satData = chunk(satData,3)

    var satRecs = new Array();

    satData.forEach((sat)=>{

        try
        {
        satRec = satellite.twoline2satrec(sat[1],sat[2]);

        satRecs.push({"name": sat[0],satRec})
        }
        catch(err)
        {
            //console.log(err)
        }

        
    })

    satRecs.forEach(rec=>{
        const currentTime = new Date()
        const gsTime = satellite.gstime(currentTime)
        var posVel = satellite.propagate(rec.satRec,currentTime)
       
        rec.position =satellite.eciToGeodetic(posVel.position,gsTime)
        rec.velocity = posVel.velocity

        console.log(rec.position)
        
        
    })


    return satRecs;
}

trackSats();