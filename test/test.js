const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const randomName = require("../functions/randomName");

chai.should();

chai.use(chaiHttp);

let userToken = "";

describe("Testing signup", () => {
  it("Should return an object if signup is ok", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: randomName(),
        password: "12345678",
      })
      .end((error, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should return an object if signup is not ok", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: randomName(),
        password: "1234567",
      })
      .end((error, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should return an error message if password is not long enought", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: randomName(),
        password: "1234567",
      })
      .end((error, res) => {
        res.body.message.should.be.eq(
          "Your password needs, at least, eight chearcters."
        );
        done();
      });
  });
});

describe("Testing login", () => {
  it("Should return an object if login is ok", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        username: "Luis",
        password: "12345678",
      })
      .end((error, res) => {
        userToken = res.body.token;
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should return an object if login is not ok", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        username: "Luis",
        password: "12345677",
      })
      .end((error, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
  it("Token should be a string if login is correct", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        username: "Luis",
        password: "12345678",
      })
      .end((error, res) => {
        res.body.token.should.not.to.be.null;
        res.body.token.should.be.a("string");
        res.body.token.should.not.be.eq("");
        done();
      });
  });
  it("Auth should be a true if login is correct", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        username: "Luis",
        password: "12345678",
      })
      .end((error, res) => {
        res.body.auth.should.to.be.true;
        done();
      });
  });
  it("Auth should be false if username or password is not correct", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        username: "Luis",
        password: "12345677",
      })
      .end((error, res) => {
        res.body.auth.should.to.be.false;
        done();
      });
  });
});

describe("Testing user routes", () => {
  it("Should return an object", (done) => {
    chai
      .request(app)
      .get("/user")
      .set({token: userToken})
      .end((error, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should return a user object", (done) => {
    chai
      .request(app)
      .get("/user")
      .set({token: userToken})
      .end((error, res) => {
        res.body.user.should.be.a("object");
        done();
      });
  });
  it("Property username of user should be equal to 'Luis'", (done) => {
    chai
      .request(app)
      .get("/user")
      .set({token: userToken})
      .end((error, res) => {
        res.body.user.username.should.be.eq("Luis");
        done();
      });
  });
  it("Property recipes of user should be an array", (done) => {
    chai
      .request(app)
      .get("/user")
      .set({token: userToken})
      .end((error, res) => {
        res.body.user.recipes.should.be.a("array");
        done();
      });
  });
});
