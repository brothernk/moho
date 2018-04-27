import axios from "axios";

export default {
    getSessions: function() {
        return axios.get("/api/session")
    },
    saveSession: function(sessionData) {
        return axios.post("/api/session", sessionData)
    },
    checkSession: function(sessionTitle) {
        return axios.get("/api/session/" + sessionTitle)
    },
    getCategories: function() {
        return axios.get("/api/gif")
    }
}