const Task = require("../tasks");

const addTransaction = async (cxt, data, res) => {
  const { db, sequelize } = cxt;
  const t = await sequelize.transaction();
  try {
    const { id } = await db.Transaction.create({ data }, { transaction: t} );
    await Task.addTask(cxt, id, t);
    return res.status(201).json({message: "transaction succefully created", transaction: id});
  } catch(error) {
    return res.status(400).json({message: "error in creating new transaction"});
  }
}

const getTransactions = async (ctx, res) => {
  const { db } = ctx;
  try {
    const transactions = await db.Transaction.findAll();
    return res.status(200).json({ data: transactions });
  } catch(error) {
    return res.status(400).json({ message: "Error in fetching data" });
  }
}

const updateTransaction = async (ctx, transactionId, data, res) => {
  const {db} = ctx;
  try {
  const transaction = await db.Transaction.update({ data }, {
    where: { transaction_id: transactionId }
  });
    return res.status(204).json(transaction);
  } catch(error) {
    return res.status(400).json({message: "Error in updating the transaction"});
  }
}


const deleteTransaction = async (ctx, transactionId, res) => {
  const { db } = ctx;
  try {
    const transaction = await db.Transaction.destroy({
      where: { transaction_id: transactionId }
    })
    return res.status(204).json(transaction);
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
