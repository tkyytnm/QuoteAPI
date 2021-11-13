const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

app.get("/api/quotes/random", (req, res) => {
  const body = getRandomElement(quotes);
  res.send({ quote: body });
});

app.get("/api/quotes", (req, res) => {
  const { person } = req.query;
  const body = quotes.filter((obj) => obj.person === person);
  person ? res.send({ quotes: body }) : res.send({ quotes: quotes });
});

app.post("/api/quotes", (req, res) => {
  const { quote, person } = req.query;
  if (quote && person) {
    quotes.push(req.query);
    res.send({ quote: req.query });
  } else {
    res.status(404).send();
  }
});
