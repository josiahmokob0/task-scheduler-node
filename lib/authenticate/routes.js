const { login, signUp, resetPassword } = require("./index");

module.exports = (ctx) => {
  const { app } = ctx;

  app.post("/login", async (req, res) => {
    await login(ctx, req, res);
  });

  app.post("/signup", async (req, res, next) => {
    await signUp(ctx, req, res, next);
  });

  app.post("/reset", async (req, res, next) => {
    await resetPassword(ctx, req, res, next);
  });

}
