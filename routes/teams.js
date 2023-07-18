//Read
const express = require("express");
const router = express.Router();

//Get all teams
router.get("/team_list", (req, res) => {
  res.send({ status: 1, teams: req.premierLeague });
});

//Get a specific team by object keys

router.get("/team_list/:value", (req, res) => {
  const value = req.params.value;

  // check if value is number or string
  const isNum = /^\d+$/.test(value);

  // find particular teams based on object keys by find & filter method
  const _premierLeague = [...req.premierLeague];
  const team = isNum
    ? _premierLeague.find((item) => {
        return item.id === value;
      })
    : _premierLeague.find((item) => {
        return item.name.toLowerCase() === value.toLowerCase();
      }) ||
      _premierLeague.find((item) => {
        return item.stadium.toLowerCase() === value.toLowerCase();
      }) ||
      _premierLeague.filter((item) => {
        return item.city.toLowerCase() === value.toLowerCase();
      });

  //defensive check
  if (!team) {
    res.send({ status: 0, reason: "team not found" });
  }

  res.send({ status: 1, team });
});

module.exports = router;
