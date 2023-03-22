const mongoose = require("mongoose")

const bookSchema = 
mongoose.Schema({
  title: {
  type: String,
  required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    required: true
  }
})
// Export model
module.exports = mongoose.model("Book", 
  bookSchema)