const Task = require("../tasks");
const formatParams = require("../utils");

const addTransaction = async (ctx, data, res) => {
  const { db, sequelize } = ctx;
  const t = await sequelize.transaction();
  try {
    const newTransaction = await db.Transaction.create(data, { transaction: t} );
    await Task.addTask(ctx, newTransaction.id, t);
    return res.status(201).json({ data: newTransaction });
  } catch(error) {
    return res.status(400).json({ message: "error in creating new transaction" });
  }
}

const getTransactions = async (ctx, res, req) => {
  const { db } = ctx;
  const { limit, page, offset } = formatParams(req.query);
  const { orderMethod= "ASC", order= "createdAt" } = req.query;
  try {
    const transactions = await db.Transaction.findAll({
      order: [
        [order, orderMethod],
      ],
      limit,
      offset,
      include: db.Task
    });
    return res.status(200).json({ data: { limit, page, transactions } });
  } catch(error) {
    return res.status(400).json({ message: "Error in fetching data" });
  }
}

const updateTransaction = async (ctx, transactionId, data, res) => {
  const { db } = ctx;
  try {
  const updated = await db.Transaction.update(data, {
    where: { id: transactionId },
  });
    if (Number(updated))
      return res.status(204).json({ message: `Transaction ${transactionId} succefully updated` });
    return res.status(404).json({ message: `Transaction ${transactionId} not found` });
  } catch(error) {
    return res.status(400).json({ message: "Error in updating the transaction" });
  }
}

const deleteTransaction = async (ctx, transactionId, res) => {
  const { db, sequelize } = ctx;
  const t = await sequelize.transaction();
  try {
    const data = await db.Transaction.destroy({
      where: { id: transactionId },
    }, { transaction: t });
    await Task.deleteTask(ctx, transactionId, t);
    if (data) {
      return res.status(204).json({ message: `Transaction ${transactionId} succefully deleted` });
    } else {
      return res.status(404).json({ message: `Transaction ${transactionId} not found` });
    }
  } catch(error) {
    return res.status(400).json({ message: "Error in deleting transaction" });
  }
}

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
