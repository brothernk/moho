const db = require("../models");

// Defining methods for the sessionController
module.exports = {
  findAll: function(req, res) {
    db.Session
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Session
      .create(req.body)
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
    db.Session
      .find({"url": req.params.session})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
 
};
