const db = require("../models");


//Defining methods for the sessionController
module.exports = {

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