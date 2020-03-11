const addTask = (cxt) => {
  const {app, db} = cxt;
  app.post("", async (req, res) => {
    let x = await db.Task.create({});
    console.log(x);
    res.json({
      message: "POST SOMETHING",
    })
  })
}

const getTasks = (cxt) => {

}

const completeTask = (cxt) => {

}

const deferTask = (ctx) => {

}

const inProgressTask = (ctx) => {

}

module.exports = async (ctx) => {
  addTask(ctx),
  getTasks(ctx),
  completeTask(ctx),
  deferTask(ctx),
  inProgressTask(ctx)
};
