const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const io = require('socket.io');
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gifcategories", function(err) {
  if (err) throw err;
});

io.on('connection', function(socket){
  console.log('a user connected');
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  //   console.log('message: '+ msg);
  // });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
