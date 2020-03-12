const chai =  require("chai");
const chaiHttp = require("chai-http");

const { context } = require("../index");
const truncate = require("./truncate");

const { app, db:models } = context;

chai.use(chaiHttp);
chai.should();


describe("Transactions", () => {

  beforeEach(async () => {
    await truncate(models);
  });

  describe("GET transactions", () => {
    it("should get all transactions", (done) => {
      chai.request(app)
        .get('/transactions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe("POST transactions", () => {
    it("should add new transaction", (done) => {
      chai.request(app)
        .post('/transactions')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe("PATCH transactions", () => {

    it("should update a transaction", (done) => {
      chai.request(app)
        .patch('/transactions')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        })
    });

    it("should update a transaction sadsa", (done) => {
      chai.request(app)
        .patch('/transactions/id:676767')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
    });

  });

  describe.skip("DELETE transactions", () => {
    it("should delete a transaction", (done) => {
      chai.request(app)
        .delete('/transactions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});
