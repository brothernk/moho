const db = require("../models");
const io = require('socket.io')();

//Defining methods for the sessionController
module.exports = {

  gameSocket: "",

  findAll: function(req, res) {
    db.Session
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  deleteAll: function(req, res) {
    db.Session
      .remove()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: (io) => (req, res) => {
    db.Session
      .create(req.body)
      .then(dbModel => {
        gameSocket = io.of(dbModel.url);
        gameSocket.on('connect', (socket) => {
          console.log(`User connected to room ${dbModel.url}`);
          socket.emit('usermade', { userid: socket.client.id});

          socket.on('useradded', function() {
            db.Session
            .find({"url": dbModel.url})
              .then(dbModel => {
                console.log('socket added triggered')
                socket.broadcast.emit('useraddedsuccessfullyother', {model: dbModel})
                socket.emit('useraddedsuccessfullyself', {model: dbModel})
              })
          })

          socket.on('startgame', function() {
            db.Session
            .find({"url": dbModel.url})
              .then(dbModel => {
                console.log('start game button triggered')
                socket.emit('startgamejudge', {model: dbModel})
                socket.broadcast.emit('startgameplayer', {model: dbModel})
              })

          })

          socket.on('categorytheme selected', function(data){
            db.Session
            .find({"url": dbModel.url})
              .then(dbModel => {

                let returnObject = {
                  category: data.category,
                  theme: data.theme
                }

                for (var i = 0; i < dbModel[0].members.length; i ++ ) {
                  if (dbModel[0].members[i].judge) {
                    returnObject["member"] = dbModel[0].members[i]
                    console.log('category and theme selected')
                    socket.broadcast.emit('categorytheme selected player', {model: returnObject})
                    socket.emit('categorytheme selected judge', {model: returnObject})
                    break
                  } 
                }
              })
            
          })

          socket.on('playeroutoftime', function(data) {
            console.log(data)
            console.log(data.socket + ' user ran out of time')
            db.Session
              .find({"url": dbModel.url})
              .then(dbModel => {

                let returnObject = {
                  gif: data.gif
                }

                for (var i = 0; i < dbModel[0].members.length; i ++ ) {
                  if (dbModel[0].members[i].ip === data.socket) {
                    returnObject["member"] = dbModel[0].members[i]
                    socket.emit('playeroutoftimereturned', {model: returnObject})
                    socket.broadcast.emit('playeroutoftimereturned', {model: returnObject})
                    break
                  }
                }
              
              })
          })

          socket.on('playergifchosen', function(data) {
            console.log(data)
            console.log(data.socket + ' chose image')
            db.Session
              .find({"url": dbModel.url})
              .then(dbModel => {
 
                let returnObject = {
                  gif: data.gif
                }

                for (var i = 0; i < dbModel[0].members.length; i ++ ) {
                  if (dbModel[0].members[i].ip === data.socket) {
                    returnObject["member"] = dbModel[0].members[i]
                    console.log(returnObject)
                    socket.emit('playerchosenreturned', {model: returnObject})
                    socket.broadcast.emit('playerchosenreturned', {model: returnObject})
                    break
                  }
                }
              
              })
          })

          socket.on('disconnect', function(){
            console.log('user disconnected');
          });
        });
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  findByTitle: function(req, res) {
    db.Session
      .find({"title": req.params.session})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUrl: function(req, res) {
    let url = "/" + req.params.word1 + "/" + req.params.word2 + "/" + req.params.word3 + "/" + req.params.word4 + "/" + req.params.word5 + "/" + req.params.word6
    db.Session
      .find({"url": url})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addMember: function(req, res) {
    let memberObject = {
      name: req.body.username,
      color: req.body.color,
      ip: req.body.ip,
      judge: req.body.judge,
      score: 0
    }
    
    db.Session
      .update(
        {"url": req.body.url},
        { $push: { members: memberObject}}
      )
      .then(dbModel =>   {

        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  }
};