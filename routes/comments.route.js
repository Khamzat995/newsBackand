const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");

const router = Router();

router.get("/comments/news/:id", commentsController.getCommentsByNewsId);
router.post("/comments", commentsController.createComments);
router.delete("/comments/:id", commentsController.removeComments);

module.exports = router;
