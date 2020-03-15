const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("./index");

module.exports = (ctx) => {
  const { app, passport } = ctx;

  app.get("/transactions", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await getTransactions(ctx, res, req);
  })

  .post("/transactions", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await addTransaction(ctx, req.body, res);
  })

  .patch("/transactions", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await updateTransaction(ctx, req.query.id, req.body, res);
  })

  .delete("/transactions", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await deleteTransaction(ctx, req.query.id, res);
  });
};
