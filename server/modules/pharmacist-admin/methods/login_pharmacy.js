"use strict";
const httpStatus = require("http-status");
const { loginUserSql } = require("../sql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config({});

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId }, // is_admin, is_pharmacist, is_doctor
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "55m",
    }
  );
  const refreshToken = jwt.sign(
    { userId }, //, is_admin, is_pharmacist, is_doctor
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json("Email and password are required");

    const user = await loginUserSql(email);

    if (!user) {
      return res.status(404).json("User not found");
    }

    const hashedPassword = user.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json("Invalid password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id);
    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
