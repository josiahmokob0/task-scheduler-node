const routes = [
  require("./transactions/routes"),
  require("./authenticate/login"),
];

module.exports = function router(ctx) {
  return routes.forEach((route) => {
    route(ctx);
  });
};
