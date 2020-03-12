const addTask = async (cxt, transactionId, t) => {
  const {db} = cxt;
  console.log(transactionId, "This is what I am looking for");
  try {
    await db.Task.create({ transaction_id: transactionId }, {
      transaction: t
    });
    t.commit();
    return "task successfully added";
  } catch(error) {
    t.rollback();
    throw new Error(error);
  }
}

const getTasks = async (ctx, transactionId) => {
  const {db} = ctx;
  try {
    const tasks = await db.Task.findAll({ where: { transaction_id: transactionId } });
    return tasks;
  } catch (error) {
    throw new Error(error)
  }
}

const completeTask = async (ctx, transactionId) => {
  const {db} = ctx;
  try {
    const task = await db.Task.update({ status: "completed" }, {
      where: { transaction_id: transactionId }
    });
    return task;
  } catch(error) {
    throw new Error(error);
  }
}

const deferTask = async (ctx, transactionId) => {
  const {db} = ctx;
  try {
    const task = await db.Task.update({ status: "deffered" }, {
      where: { transaction_id: transactionId }
    })
    return task;
  } catch(error) {
    throw new Error(error);
  }
}

const inProgressTask = async (ctx, transactionId) => {
  const {db} = ctx;
  try {
    const task = await db.Task.update({ status: "inProgress" }, {
      where: { transaction_id: transactionId }
    })
    return task;
  } catch(error) {
    throw new Error(error);
  }
}

module.exports =  {
  addTask,
  getTasks,
  completeTask,
  deferTask,
  inProgressTask
};
