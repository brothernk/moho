const axios = require("axios");
const router = require("express").Router();

router.get("/", function(req, res){
  // console.log(req.url);
  let searchTerm = req.url;
  const newSearchTerm = searchTerm.substring(2);
  console.log(newSearchTerm);
  console.log("================================")
  axios.get("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + newSearchTerm)
  .then(function(response){
    // console.log(response.data);
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;