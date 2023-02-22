const supertest = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const mongoose = require("mongoose");
const CONFIG = require("../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

describe("Notes API", () => {
  let user;
  let note;
  let token;
  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(CONFIG.MONGODB_TEST_URL);
    await User.deleteMany({});
    await Note.deleteMany({});
    user = await User.create({
      name: "test",
      email: "test@example.com",
      password: "password",
      passwordConfirm: "password",
    });
    note = await Note.create({
      title: "Test Note",
      content: "This is a test note",
    });
    const payload = { id: user._id, email: user.email };
    const sign = promisify(jwt.sign);
    token = await sign(payload, CONFIG.TOKEN_KEY, { expiresIn: "2h" });
  }, 30000);
  describe("POST /api/v1/note", () => {
    jest.setTimeout(30000);
    test("should create a new note", async () => {
      const res = await supertest(app)
        .post("/api/v1/note")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "New Note",
          content: "This is a new note",
        })
        .expect(201);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("title", "New Note");
      expect(res.body).toHaveProperty("content", "This is a new note");
    });
  });
});
