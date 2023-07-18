// add
const express = require("express");
const router = express.Router();

router.post("/team_list", (req, res) => {
  const { name, city, stadium } = req.body;

  // check the contents are valid
  if (
    !name ||
    !city ||
    !stadium ||
    typeof name !== "string" ||
    typeof city !== "string" ||
    typeof stadium !== "string"
  ) {
    res.send({ status: 0, response: "invalid request" });
    return;
  }

  //check for dublicates
  const indexOf = req.premierLeague.findIndex((item) => {
    return item.name === name || item.stadium === stadium;
  });

  if (indexOf > -1) {
    res.send({ status: 0, reason: "Duplicate entry" });
    return;
  }

  req.premierLeague.push({
    id: req.premierLeague.length + 1,
    name,
    city,
    stadium,
  });

  res.send({ status: 1 });
});

module.exports = router;
