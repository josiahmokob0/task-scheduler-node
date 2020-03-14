const addTask = async (ctx, transactionId, t) => {
  const { db, sequelize } = ctx;
  try {
    await db.Task.create({ transaction_id: transactionId, assigned: sequelize.literal("CURRENT_TIMESTAMP") }, {
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
  const { db } = ctx;
  try {
    const tasks = await db.Task.findAll({ where: { transaction_id: transactionId } });
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteTask = async (ctx, transactionId, t) => {
  const { db } = ctx;
  try {
    const data = await db.Task.destroy({ where: { transaction_id: transactionId }, }, { transaction: t });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const checkIncompleteTasks = async (ctx) => {
  const { db, Op } = ctx;
  try {
    const tasks = await db.Task.findAll({
      where: {
        [ Op.or ]: [
          { status: null },
          { status: "deffered" },
        ],
      },
      limit: 3,
    });
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
}

const completeTask = async (ctx, transactionId) => {
  const { db, sequelize } = ctx;
  try {
    const task = await db.Task.update({ status: "completed", completed: sequelize.literal("CURRENT_TIMESTAMP") }, {
      where: { transaction_id: transactionId },
    });
    return task;
  } catch(error) {
    throw new Error(error);
  }
}

const deferTask = async (ctx, transactionId) => {
  const { db, sequelize } = ctx;
  try {
    const task = await db.Task.update({ status: "deffered",  deffered: sequelize.literal("CURRENT_TIMESTAMP") }, {
      where: { transaction_id: transactionId },
    })
    return task;
  } catch(error) {
    throw new Error(error);
  }
}

const inProgressTask = async (ctx, transactionId) => {
  const { db, sequelize } = ctx;
  try {
    const task = await db.Task.update({ status: "inProgress", in_progress: sequelize.literal("CURRENT_TIMESTAMP") }, {
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
  checkIncompleteTasks,
  completeTask,
  deferTask,
  inProgressTask,
  deleteTask,
};
