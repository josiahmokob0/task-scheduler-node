const routes = [
  require("./transactions/routes")
];

module.exports = function router(ctx) {
  return routes.forEach((route) => {
    route(ctx);
  });
};
