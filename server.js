const { context } = require("./index");

const { PORT, app } = context;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
