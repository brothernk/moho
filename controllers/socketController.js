const io = require("../lib/socketClient");
const db = require("../models");

module.exports = {

    gameSocket: "",
    continuedUsers: [],

    create: function (req, res) {
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
    
              socket.on('startnextround', function() {
                console.log('start next round button triggered')
                socket.emit('startnextroundjudge')
                socket.broadcast.emit('startnextroundplayer')
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
    
              socket.on('winnersocket', function(data) {
                console.log('winner socket activated')
                console.log(data)
                let ip = (data.member.ip).toString()  
    
                db.Session
                .update({url: dbModel.url, "members.ip": ip },
                        {$inc: { "members.$.score": 1} })
                .then(dbModel => {
                  socket.emit('winnerinfojudge', data)
                  socket.broadcast.emit('winnerinfoplayer', data)
                })
                .catch(err => res.status(422).json(err));
              }),
    
              socket.on('choosenewjudge', function(data) {
                console.log('choose change judge activated')
                let newip = (data.ip).toString()
                db.Session
                .update({url: dbModel.url, "members.ip": newip },
                        {$set: {  "members.$.judge": true}})
                .then(dbModel => {
                  console.log('new judge updated')
                  socket.emit('newjudgeupdated')
                })
                .catch(err => res.status(422).json(err));
              })
    
              socket.on('changeoldjudge', function(data) {
                console.log('change old judge activated')
                let oldip = (data.ip).toString()
                db.Session
                  .update({url: dbModel.url, "members.ip": oldip },
                          {$set: {  "members.$.judge": false}})
                  .then(dbModel => {
                    console.log(dbModel)
                    console.log('old judge updated')
                    socket.emit('oldjudgeupdated')
                  })
                  .catch(err => res.status(422).json(err));
              })
    
              socket.on('newgame', function() {
                db.Session
                .find({"url": dbModel.url})
                  .then(dbModel => {
                    console.log('new game triggered')
                    socket.emit('newgamejudge', {model: dbModel})
                    socket.broadcast.emit('newgameplayer', {model: dbModel})
                  })
              })
    
              socket.on('revealgifs', function() {
                socket.emit('revealgifsjudge')
                socket.broadcast.emit('revealgifsplayer')
              }),
    
              socket.on('disconnect', function(){
                console.log('user disconnected');
              });

              

            });
            res.json(dbModel);

          })
          .catch(err => res.status(422).json(err));
    }

};