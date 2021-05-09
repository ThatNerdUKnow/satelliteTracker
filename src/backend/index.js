const express = require('express');
const axios = require('axios');

const app = express();

const options = {
    dotfiles: 'ignore',
    etag: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }

// Serve static files
app.use(express.static('./dist',options))

app.get('/satdata',async (req,res)=>{
    
    satData = await axios.get("https://www.celestrak.com/NORAD/elements/active.txt");
    res.send(satData.data)
})




app.listen(80)
console.log("Now listening on port 80")