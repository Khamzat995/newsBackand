const { Router } = require("express");
const { newsController } = require("../controllers/news.controller");

const router = Router();

router.get("/news", newsController.getAllNews);
router.get("/news/:id", newsController.getNewsById);
router.get("/news/categories/:id", newsController.getNewsByCategoryId);
router.post("/news", newsController.createNews);
router.patch("/news/:id", newsController.editNews);
router.delete("/news/:id", newsController.removeNews);

module.exports = router;
