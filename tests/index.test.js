const chai =  require("chai");
const chaiHttp = require("chai-http");

const { context } = require("../index");
const truncate = require("./truncate");
const { transaction, user } = require("./fixtures");

const { app, db: models } = context;

chai.use(chaiHttp);
chai.should();

describe("Transactions", () => {

  before(async () => {
    await truncate(models);
  });

  describe("POST login", () => {
    it("should signup user", done => {
      chai.request(app)
        .post("/signup")
        .send(user)
        .end((_, res) => {
          res.body.message.should.eql("registration success");
          res.body.should.have.property("token");
          res.should.have.status(201);
          done();
        });
    });

    it("should login user", done => {
      chai.request(app)
        .post("/login")
        .send(user)
        .end((_, res) => {
          res.body.should.have.property("token");
          res.should.have.status(200);
          done();
        });
    });

  });

  describe("GET transactions", () => {
    it("should get all transactions", (done) => {
      chai.request(app).post("/login").send(user).then((res) => {
        const token = `Bearer ${res.body.token}`;
        chai.request(app)
          .get("/transactions")
          .set("Authorization", token)
          .end((_, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.data.transactions.length.should.be.eql(0);
            done();
          });
      });
    });
  });

  describe("POST transactions", () => {
    it("should add new transaction", (done) => {
      chai.request(app).post("/login").send(user).then((res) => {
        const token = `Bearer ${res.body.token}`;
        chai.request(app)
          .post("/transactions")
          .send(transaction)
          .set("Authorization", token)
          .end((_, res) => {
            res.should.have.status(201);
            res.body.data.should.be.a("object");
            res.body.data.should.have.property("user_id");
            res.body.data.should.have.property("customer_phone_number");
            res.body.data.should.have.property("customer_age");
            res.body.data.should.have.property("customer_gender");
            done();
          });
      });
    });

    it("should throw an error when user is null ", (done) => {
      transaction.user_id = null;
      chai.request(app).post("/login").send(user).then((res) => {
        const token = `Bearer ${res.body.token}`;
        chai.request(app)
          .post('/transactions')
          .send(transaction)
          .set("Authorization", token)
          .end((_, res) => {
            res.should.have.status(400);
            res.should.have.property("error");
            done();
          });
      });
    });
  });

  describe("PATCH transactions", () => {
    it("should make valid updates", (done) => {
      transaction.user_id = 5;
      models.Transaction.create(transaction)
        .then((result) => result)
        .then(result => {
          chai.request(app).post("/login").send(user).then((res) => {
            const token = `Bearer ${res.body.token}`;
            chai.request(app)
              .patch("/transactions?id=" + result.id)
              .send(transaction)
              .set("Authorization", token)
              .end((_, res) => {
                res.should.have.status(204);
                done();
              })
          });
        });
    });
  });

  describe("DELETE transactions", () => {
    it("should delete valid transaction", (done) => {
      transaction.user_id = 5;
      models.Transaction.create(transaction)
        .then((result) => result)
        .then(result => {
          chai.request(app).post("/login").send(user).then((res) => {
            const token = `Bearer ${res.body.token}`;
            chai.request(app)
              .delete("/transactions?id=" + result.id)
              .send(transaction)
              .set("Authorization", token)
              .end((_, res) => {
                res.should.have.status(204);
                done();
              })
          });
        });
    });

    it("should return error when deleting invalid transaction", (done) => {
      chai.request(app).post("/login").send(user).then((res) => {
        const token = `Bearer ${res.body.token}`;
        chai.request(app)
          .delete("/transactions?id=10000")
          .set("Authorization", token)
          .end((_, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });

});
