const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("./index");

module.exports = (ctx) => {
  const { app } = ctx;

  app.get('/transactions', async (_, res) => {
    await getTransactions(ctx, res);
  })

  .post('/transactions', async (req, res) => {
    await addTransaction(ctx, req.body, res);
  })

  .patch('/transactions', async (req, res) => {
    await updateTransaction(ctx, req.query.id, req.body, res);
  })

  .delete('/transactions', async (req, res) => {
    await deleteTransaction(ctx, req.query.id, res);
  });
};
