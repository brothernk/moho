import axios from "axios";

export default {
    getSessions: function() {
        return axios.get("/api/session")
    },
    saveSession: function(sessionData) {
        return axios.post("/api/session", sessionData)
    },
    deleteSessions: function() {
        return axios.delete("/api/session")
    },
    checkSessionTitle: function(sessionTitle) {
        return axios.get("/api/session/title/" + sessionTitle);
    },
    checkSessionUrl: function(sessionUrl) {
        return axios.get("/api/session/url" + sessionUrl)
    },
    addSessionMember: function(memberData) {
        return axios.post("/api/session/member", memberData)
    },
    getCategories: function() {
        return axios.get("/api/gif")
    },
    getGIF: function(searchTerm) {
        // Need to send to /api route to hide API Key
        return axios.get("/api/giphy/?" + searchTerm)
    }
}