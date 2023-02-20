const supertest = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const CONFIG = require("../config/config");

describe("User Authentication", () => {
  let user;
  let token;
  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(CONFIG.MONGODB_TEST_URL);
    await User.deleteMany({});
    user = await User.create({
      name: "test",
      email: "test@example.com",
      password: "password",
      passwordConfirm: "password",
    });
  }, 30000);
  //   afterEach(async () => {
  //     mongoose.connection.close();
  //   });

  describe("POST /api/v1/user/signup", () => {
    it("should create a new user", async () => {
      const res = await supertest(app)
        .post("/api/v1/user/signup")
        .send({
          name: "newuser",
          email: "newuser@gmail.com",
          password: "password",
          passwordConfirm: "password",
        })
        .expect(201);
      expect(res.body).toBeTruthy();
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("name");
    });
    it("should return an error if the email is already in use", async () => {
      const res = await supertest(app)
        .post("/api/v1/user/signup")
        .send({
          name: "test1",
          email: user.email,
          password: "password",
          passwordConfirm: "password",
        })
        .expect(409);

      expect(res.body.status).toBe("fail");
    }, 30000);
  });

  describe("POST /api/v1/user/login", () => {
    it("should return a user token", async () => {
      const res = await supertest(app)
        .post("/api/v1/user/login")
        .send({ email: user.email, password: "password" })
        .expect(200);
      expect(res.body).toHaveProperty("token");
    });
    it("should return an error when given invalid credentials", async () => {
      const res = await supertest(app).post("/api/v1/user/login").send({
        email: user.email,
        password: "wrong-password",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toBe("fail");
    });
  });
  afterAll(async () => {
    await User.deleteMany({});
  }, 30000);
});
