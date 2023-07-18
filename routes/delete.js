const express = require("express");
const router = express.Router();

router.delete("/team_list/:value", (req, res) => {
  const value = req.params.value;

  // identify index from unique values
  const indexOf = req.premierLeague.findIndex((item) => {
    return (
      item.id === value ||
      item.name.toLowerCase() === value.toLowerCase() ||
      item.stadium.toLowerCase() === value.toLowerCase()
    );
  });

  // check that the item exists
  if (indexOf < 0) {
    res.send({
      status: 0,
      reason:
        "The item not found or may have been deleted. Please note that city names are invalid to delete the item as it's not unique",
    });
  }

  // remove item
  req.premierLeague.splice(indexOf, 1);
  res.send({ status: 1 });
});

module.exports = router;
