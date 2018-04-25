const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessionSchema = new Schema ({
    title : {
        type: String
    },
    url: {
        type: String
    },
    members: {
        type: Array
    }
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;