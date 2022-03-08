var { Controller } = require("../controllers/Controller");

const router = (app) => {
  app.get("/", Controller.GetAll);

  app.post("/", Controller.CreateBlog);

  app.delete("/:id", Controller.DeleteBlog);

  app.put("/:id", Controller.UpdateBlog);
};
module.exports = router;
