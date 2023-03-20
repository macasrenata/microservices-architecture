const Book = require("../Controllers/Books/bookSchema")
   exports.create = async (data) => {
    try{
    const newBook = new Book(data)
    const savedBook = newBook.save()
    if(!savedBook) throw new Error("Livro não pode ser salvo")
    return {error: null}
    } catch (error) {
      return {error: error.message}
    }
 }

exports.readAll = async () => {
    try{
      const books = await Book.find({})
      if (!books) throw new Error("Livro não encontrado")
      return {error: null, data: books}
    }catch(error) {
        return {error: error.message, data: null}
    }
  }

  exports.readOne = async (id) => {
    try{
      const book = await Book.findByIdAndUpdate(id)
      if(!book) throw new Error("Esse livro já existe")
      return {error: null, data:book}
     } catch (error) {
       return {error: error.message, data:null}
    }
  }

  exports.update = async (id, data) => {
    try{
      const updatedBook = await Book.findByIdAndUpdate(id, data,{new: true})
      if(!updatedBook) throw new Error("Falha no update do livro")
      return {error: null, data: updatedBook}
     } catch (error) {
       return {error: error.message, data: null}
    }
  }

  exports.deleteOne = async (id) => {
    try{
      const isDeleted = await Book.findByIdAndDelete(id)
      if (!isDeleted) throw new Error("Falha no delete do livro")
      return { error: null}
    }catch (error) {
    return { error: error.message}
    }
  }

  exports.deleteAll = async () => {
    try{
      const isDeleted = await Book.deleteMany({})
      if (!isDeleted) throw new Error("Falha no delete dos livros")
      return {error: null}
    }catch (error) {
    return { error: error.message }
    }
  }