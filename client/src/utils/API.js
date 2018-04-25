import axios from "axios";

export default {
    saveSession: function(sessionData) {
        return axios.post("/api/session", sessionData)
    }
}