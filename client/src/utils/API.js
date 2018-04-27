import axios from "axios";

export default {
    getSessions: function() {
        return axios.get("/api/session")
    },
    saveSession: function(sessionData) {
        return axios.post("/api/session", sessionData)
    },
    getCategories: function() {
        return axios.get("/api/gif")
    }
}