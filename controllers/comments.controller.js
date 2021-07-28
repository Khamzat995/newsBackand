const Comments = require("../models/Comments.model");
const News = require("../models/News.model");

module.exports.commentsController = {

  getCommentsByNewsId: async (req, res) => {
    const { id } = req.params;

    try {
      const comments = await Comments.find({ newsId: id });

      return res.json(comments);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createComments: async (req, res) => {
    const { username, text, newsId } = req.body;

    if (!username) {
      return res.status(400).json({
        error: "Необходимо указать имя пользавателя",
      });
    }
    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать текст комментария",
      });
    }

    if (!newsId) {
      return res.status(400).json({
        error: "Необходимо указать ID новости",
      });
    }

    try {
      const newsExists = await News.findById(newsId);

      if (!newsExists) {
        return res.status(400).json({
          error: "Новость с таким ID не существует",
        });
      }

      const comments = await new Comments({
        username,
        text,
        newsId,
      });

      await comments.save();

      return res.json(comments);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeComments: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Comments.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить комментарий. Укажите верный ID",
        });
      }

      return res.json({
        message: "Комментарий успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
