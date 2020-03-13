const { checkIncompleteTasks, completeTask } = require("../tasks");

const runJob = (ctx) => {
  const { CronJob } = ctx;
  const job = new CronJob('*/10 * * * * *', async () => {
    const tasks = await checkIncompleteTasks(ctx);
    if (tasks.length) {
      for (let i of tasks) {
       await completeTask(ctx, i.transaction_id);
      }
    }
  }, null, true, 'Africa/Nairobi');
  job.start();
}

module.exports = runJob;
