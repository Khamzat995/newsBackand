const News = require("../models/News.model");
const Category = require("../models/Category.model");

module.exports.newsController = {

  getAllNews: async (req, res) => {
    try {
      const news = await News.find();

      return res.json(news);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getNewsByCategoryId: async (req, res) => {
    const { id } = req.params;

    try {
      const news = await News.find({ category: id }).populate(
        "category",
        "title"
      );

      return res.json(news);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getNewsById: async (req, res) => {
    const { id } = req.params;

    try {
      const news = await News.findById(id).populate("category", "title");

      if (!news) {
        return res.status(404).json({
          error: "Новость с таким ID не найдена",
        });
      }

      return res.json(news);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createNews: async (req, res) => {
    const { title, text, category, image } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Необходимо указать заголовок новости",
      });
    }
    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать текст новости",
      });
    }

    if (!category) {
      return res.status(400).json({
        error: "Необходимо указать категорию новости",
      });
    }

    try {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(400).json({
          error: "Категории с таким ID не существует",
        });
      }

      const news = await new News({
        title,
        text,
        category,
      });

      if (image) {
        news.image = image;
      }

      await news.save();

      return res.json(news);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeNews: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await News.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить новость. Укажите верный ID",
        });
      }

      return res.json({
        message: "Новость успешно удалена",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editNews: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, text, category } = req.body;
      const news = await News.findByIdAndUpdate(
        id,
        { title, text, category },
        { new: true }
      ).lean();
      res.json("Новость успешно изменена");
    } catch (e) {
      res.json(e.message);
    }
  },
};
