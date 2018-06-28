const axios = require("axios");
const router = require("express").Router();

router.get("/", function(req, res){
  // console.log(req.url);
  let searchTerm = req.url;
  const newSearchTerm = searchTerm.substring(2);
  console.log(newSearchTerm);
  console.log("================================")
  axios.get("https://api.giphy.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=" + newSearchTerm)
  .then(function(response){
    res.send(response.data.data.images.original)
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;