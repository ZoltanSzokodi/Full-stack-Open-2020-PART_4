const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    minlength: 5,
    unique: true,
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    minlength: 5,
  },
  url: {
    type: String,
    required: [true, 'Please add a url'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  // createdAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose unique validator
blogSchema.plugin(uniqueValidator, {
  message: 'This {PATH} is already taken.',
});

// Change the 'toJSON' method to re-name the and stringify the 'id' field
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.createdAt = returnedObject.createdAt.toJSON();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
