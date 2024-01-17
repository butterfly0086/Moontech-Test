const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", [authJwt.verifyToken], controller.all);
  app.put("/api/users/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/users/:id", [authJwt.verifyToken], controller.delete);

  app.get("/api/profile", [authJwt.verifyToken], controller.profile);
};
