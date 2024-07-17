const PORT = 9001;
const URLDB = "mongodb://127.0.0.1:27017/";
const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/Admin");
const Calculator = require("./models/Calc");

const app = express();

const generateAccessToken = (id, admin, calc) => {
  const payload = {
    id,
    admin,
    calc,
  };

  return jsonwebtoken.sign(payload, secret, { expiresIn: "24h" });
};

app.use(cors());
app.use(express.json());

app.post("/Admin", async (req, res) => {
  console.log(req.body);
  const { id, admin, Calculator } = req.body;
  const user = new User({ id, admin, Calculator });

  try {
    await user.save();
  } catch (err) {
    if (err && err.code !== 11000) {
      res
        .json({
          message: "Error",
        })
        .status(500);

      return;
    }

    if (err && err.code === 11000) {
      res
        .json({
          message: "Try to make duplicate",
        })
        .status(400);
      console.error("Try to make duplicate");

      return;
    }
  }

  res.json({
    message: "Successfull",
  });
});

app.post("/Calc", async (req, res) => {
  console.log(req.body);
  const { admin, calc } = req.body;
  let user;

  try {
    Admin = await User.findOne({ calc });
  } catch (err) {
    res
      .json({
        message: "Error",
      })
      .status(500);

    return;
  }

  if (!Calculator) {
    return res.status(400).json({ message: "Calculator did not find" });
  }
  const jwtToken = generateAccessToken(user._id, user.admin, user.calc);

  res.json({
    message: "Successfull",
    token: jwtToken,
  });
});

const start = async () => {
  try {
    await mongoose.connect(URLDB);
    app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
