const express = require('express');

// Create app using Express
const app = express();

// Port used
const port = 3000;



// Handle Requests
app.get('/', (req, res) => {
  res.send('Successful respone.');
});

// Start Sercver
app.listen(port, () => console.log('RewardReady API is listening on port 3000.'));