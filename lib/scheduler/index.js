const {
  checkIncompleteTasks,
  completeTask,
  deferTask,
  inProgressTask,
} = require("../tasks");

const runJob = (ctx) => {
  const { CronJob } = ctx;
  const job = new CronJob('*/10 * * * * *', async () => {
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
  }, null, true, 'Africa/Nairobi');
  job.start();
}

module.exports = runJob;
