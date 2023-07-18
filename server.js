const express = require("express");
const app = express();
const premierLeague = require("./premierLeague.json");

//pass data down
app.use((req, res, next) => {
  req.premierLeague = premierLeague;
  next();
});

//middleware

//convert the body to JSON
app.use(express.json());

//routes
app.use("/teams", require("./routes/teams"));
app.use("/add", require("./routes/add"));
app.use("/delete", require("./routes/delete"));
app.use("/update", require("./routes/update"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`test ${port}`);
});
