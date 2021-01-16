const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tags: { type: [String] },
  author: { type: String, required: true },
  author_designation: { type: String },
  img_url: { type: String},
  content1: { type: String },
  content2: { type: String },
  content3: { type: String },
  excerpt: { type: String },
  post_date: { type: Date }
});

module.exports = mongoose.model('post', PostSchema);