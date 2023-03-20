const mongoose = require("mongoose")

const bookSchema = 
mongoose.Schema({
  email: {
  type: String,
  required: true
  },
  senha: {
    type: String,
    required: true
  }
})
// Export model
module.exports = mongoose.model("User", 
  bookSchema)