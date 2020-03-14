const { context } = require("./index");
const runJob = require("./lib/scheduler");

const { PORT, app } = context;

app.listen(PORT, () => {
  runJob(context);
  console.log(`Server running on port http://127.0.0.1:${PORT}`);
});
