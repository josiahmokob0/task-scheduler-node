const routes = [
  require("./transactions/routes"),
  require("./authenticate/routes"),
];

module.exports = function router(ctx) {
  return routes.forEach((route) => {
    route(ctx);
  });
};
