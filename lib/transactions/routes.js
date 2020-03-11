const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("./index");

module.exports = (ctx) => {
  const {app} = ctx;

  app.get('/transactions', async (req, res) => {
    const transactions = await getTransactions(ctx);
    res.json({ data: transactions, });
  })

  .post('/transactions', async (req, res) => {
    const transactions = await addTransaction(ctx, req.body);
    res.json({data: transactions});
  })

  .patch('/transactions', (req, res) => {
    const transactions = await updateTransaction(ctx, req.param.id, req.body);
    res.json({data: transactions});
  })

  .delete('/transactions', (req, res) => {
    const transactions = await deleteTransaction(ctx, req.param.id, req.body);
    res.json({data: transactions});
  });
};
