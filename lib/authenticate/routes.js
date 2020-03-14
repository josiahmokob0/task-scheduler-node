const { login, signUp } = require("./index");

module.exports = (ctx) => {
  const { app } = ctx;

  app.post("/login", async (req, res) => {
    await login(ctx, req, res);
  });

  app.post("/signup", async (req, res, next) => {
    await signUp(ctx, req, res, next);
  });

}
