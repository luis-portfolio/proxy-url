const axios = require("axios").create({
  httpsAgent: new require("https").Agent({ rejectUnauthorized: false }),
});
const express = require("express");
const app = express();
app.use(express.json());
const port = 80;

app.get("/", async (req, res) => {
  res.json({
    Api: "1.0",
    Engineer: "Luis Nt",
    Now: new Date(),
    QueryUses: "/proxy?url=https://e-svt.herokuapp.com"      
  });
});

app.get("/proxy", async (req, res) => {
  const { query } = req;
  const url = query["url"];
  const { status, statusText, headers, data } = await axios.get(url);
  res.json({ headers, status, statusText, data });
});

app.listen(80, () => {
  console.log(`App proxy listening on port 80`);
});
