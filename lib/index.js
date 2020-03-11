const routes = [
  require("./transaction/routes")
];

module.exports = function router(ctx) {
  return routes.forEach((route) => {
    route(ctx);
  });
};
