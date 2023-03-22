
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//APP
const app = express();
// parse json
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/Pages", express.static(__dirname+"/Pages"));

//PORT
app.listen(3000, () => {
    console.log("server on");
});

//CONTROLLERS
const Logar = require("../src/Controllers/Users/Logar");
const Logado = require("../src/Controllers/Users/Logado");
const Deslogar = require("../src/Controllers/Users/Deslogar");

//DATABASE
const Database = required("./src/Database/index.js");
const {create, readAll, readOne, update, deleteOne, deleteAll } = require("./Database/dbHelpers");

//PAGES
app.get("/", (req, res) => res.sendFile(__dirname+"/Pages/Index/index.html"));
app.get("/privado", Logado, (req, res) => res.send("Somente usuario logado"));


// ROUTES
app.post("/users/logar", async(req, res) => {
    res.send(await Logar(req.body));
});
app.get("/users/deslogar", async(req, res) => {
    res.send(await Deslogar(req.body));
})

//BOOKS
app.post("/create", async (req, res) => {
    //check se req.body esta vazio
    if (!Object.keys(req.body).length) {
      res.status(400).json({
      message: "Não pode estar vazio"
    })
    }
    const {title, author, publisher, read} = (req.body)
    // grava no db
    const book = await create({title, author, publisher, read})
    if (book.error) {
      res.status(500).json({
        message: book.error
      })
    }
    res.status(201).json({
      message: "Novo livro criado"
    })
  })

  app.get("/read-all", async (req, res) => {
    const books = await readAll()
    if (books.error) {
      res.status(500).json({
        message: error.message,
        books: books.data
      })
    }
    res.status(200).json({
        message: "successo",
        books: books.data
      }) 
  })

  app.get("/read-one/:bookID", async (req, res) => {
    const book = await readOne(req.params.bookID)
    if (book.error) {
      res.status(500).json({
        message: book.error,
        books: book.data
      })
    }
    res.status(200).json({
        message: "successo",
        book: book.data
      }) 
  })

  app.put("/update/:bookID", async (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({
        message: "Não pode estar vazio",
        book: null
      })
   }
 
   const book = await update(req.params.bookID, req.body)
   if (book.error) {
     res.status(500).json({
       message: book.error,
       book: book.data
     })
   }
   res.status(200).json({
       message: "successo",
       book: book.data
     }) 
 })

 app.delete("/delete/:bookID", async (req, res) => {
    const isDeleted = await deleteOne(req.params.bookID)
    if (isDeleted.error) {
      res.status(500).json({
        message: isDeleted.error,
      })
    }
    res.status(200).json({
        message: "Deletado com sucesso"
      }) 
  })

  app.delete("/delete-all", async (req, res) => {
    const isDeleted = await deleteAll(req)
    if (isDeleted.error) {
      res.status(500).json({
        message: isDeleted.error,
      })
    }
    res.status(200).json({
        message: "Deletado com sucesso"
      }) 
  })


// criado rotas para as paginas principais
// form do login
// pagina que somente user logados podem acessar
// controller de Logar (para autenticar o nosso usuário e retornar o token de autenticação), 
// controller de Logado (middleware que verifica se o usuário está logado antes de executar o caminho normal que uma rota faria) 
// controller de Deslogar (que desloga o nosso usuário).
// crud livros

// instaciado as dependencias
// setado bibliotecas-libs
// import do BD
// server on na porta definida
