require("dotenv").config();

const productRoute = require("./routes/product.route.js");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route
app.use("/api/products", productRoute);

app.get("/", function (req, res) {
  res.send("Hello from Node API Server");
});

let refreshTokens = [];

app.post("/api/token", async function (req, res) {
  const refreshToken = req.body.token;
  if (!refreshToken)
    return res
      .send(401)
      .json({ messsage: "Access Forbidden: No Refresh Token" });
  // if (refreshTokens.includes(refreshToken))
});

app.post("/api/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

mongoose
  .connect(
    "mongodb+srv://abdisembada567:mWwSHi2lfvYf37R3@backenddb.josuk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDb"
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Connected Failed!"));

// NOTE:
// Express API function
// Nodemon to auto serve port when changes the code
