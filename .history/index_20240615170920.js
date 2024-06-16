const express = require('express');
const app = express();
const port = 3000;

 app.get('/', (req, res) => {
   res.send({"message": "Welcome to DressStore application."});
 });

 app.listen(config.port, (err) => { 
    if (err) {
    console.log(err) 
    }
    console.info('Server started on port %s.', config.port) 
    })
    