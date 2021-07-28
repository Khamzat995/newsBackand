const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  newsId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "News",
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
