const {
  checkIncompleteTasks,
  completeTask,
  deferTask,
  inProgressTask,
} = require("../tasks");

const transactionJob = async (ctx) => {
  const tasks = await checkIncompleteTasks(ctx);
  if (tasks.length) {
    for (let task of tasks) {
      try {
        await inProgressTask(ctx, task.transaction_id)
        await completeTask(ctx, task.transaction_id);
      } catch(error) {
        await deferTask(ctx, task.transaction_id);
        throw new Error(error);
      }
    }
  }
}

const runJob = (ctx) => {
  // runs the job after every 10 seconds
  const job = new ctx.CronJob('*/30 * * * * *', async () => {
    await transactionJob(ctx);
  }, null, true, process.env.TIMEZONE);
  job.start();
}


module.exports = runJob;
