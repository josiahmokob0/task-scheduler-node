const addTask = async (cxt, transactionId) => {
  const {db} = cxt;
  const added = await db.Task.create({
    transaction_id: transactionId,
  });
  return added;
}

const getTasks = async (ctx, transactionId) => {
  const {db} = ctx;
  const tasks = await db.Task.findAll({
    where: {
      transaction_id: transactionId,
    }
  });
  return tasks;
}

const completeTask = async (ctx, transactionId) => {
  const {db} = ctx;
  const task = await db.Task.update({
    status: "completed"
  }, {
    where: {
      transaction_id: transactionId
    }
  });
  return task;
}

const deferTask = async (ctx, transactionId) => {
  const {db} = ctx;
  const task = await db.Task.update({
    status: "deffered"
  }, {
    where: {
      transaction_id: transactionId
    }
  })
  return task;
}

const inProgressTask = async (ctx, transactionId) => {
  const {db} = ctx;
  const task = await db.Task.update({
    status: "inProgress"
  }, {
    where: {
      transaction_id: transactionId
    }
  })
  return task;
}

module.exports = async (ctx, transactionId) => {
  await addTask(ctx, transactionId),
  await getTasks(ctx, transactionId),
  await completeTask(ctx, transactionId),
  await deferTask(ctx, transactionId),
  await inProgressTask(ctx, transactionId)
};
