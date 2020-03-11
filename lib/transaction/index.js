const addTransaction = async (cxt, data) => {
  const {db} = cxt;
  const added = await db.Transaction.create({
    data
  });
  return added;
}

const getTransactions = async (ctx) => {
  const {db} = ctx;
  const transactions = await db.Transaction.findAll();
  return transactions;
}

const updateTransaction = async (ctx, transactionId, data) => {
  const {db} = ctx;
  const transaction = await db.Transaction.update({
    data,
  }, {
    where: {
      transaction_id: transactionId
    }
  })
  return transaction;
}


const deleteTransaction = async (ctx, transactionId) => {
  const {db} = ctx;
  const transaction = await db.Transaction.destroy({
    where: {
      transaction_id: transactionId
    }
  })
  return transaction;
}

module.exports = async (ctx, transactionId=0, data={}) => {
  await addTransaction(ctx, data),
  await getTransactions(ctx, transactionId),
  await updateTransaction(ctx, transactionId, data),
  await deleteTransaction(ctx, transactionId)
};
