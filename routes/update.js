const express = require("express");
const router = express.Router();

router.patch("/team_list/:id", (req, res) => {
  const id = Number(req.params.id);

  //check that id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "invalid ID" });
  }

  const { name, city, stadium } = req.body;
  //identify index of the target item by ID
  const indexOf = req.premierLeague.findIndex((item) => {
    return Number(item.id) === id;
  });

  //check that char exists
  if (indexOf === -1) {
    res.send({ status: 0, reason: "Item not found" });
    return;
  }

  // check duplicate (team and stadium must be unique)
  const duplicateIndex = req.premierLeague.findIndex((item) => {
    return item.name === name || item.stadium === stadium;
  });

  if (duplicateIndex > -1) {
    res.send({ status: 0, reason: "the same team or stadium already exists" });
    return;
  }

  // update the item
  if (name && typeof name === "string") {
    req.premierLeague[indexOf].name = name;
  }
  if (city && typeof city === "string") {
    req.premierLeague[indexOf].city = city;
  }
  if (stadium && typeof stadium === "string") {
    req.premierLeague[indexOf].stadium = stadium;
  }

  res.send({ status: 1 });
});

module.exports = router;
