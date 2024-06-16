const express = require('express');
const app = express();
const port = 3000;

 app.get('/server.js', (req, res) => {
   res.send({"message": "Welcome to DressStore application."});
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});