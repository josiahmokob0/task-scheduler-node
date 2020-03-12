const runJob = (ctx) => {
  const { CronJob } = ctx;
  const job = new CronJob('*/10 * * * * *', function() {
    // check db for new jobs
  }, null, true, 'Africa/Nairobi');
  job.start();
}

module.exports = runJob;
