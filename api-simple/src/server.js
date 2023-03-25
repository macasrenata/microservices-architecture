
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const jwt = process.env.JWT_SECRET;
const mongoURI = process.env.MONGODB_URI;

app.use(express.json())
app.use(cors());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//DATABASE
const {create, readAll, readOne, update, deleteOne, deleteAll } = require("./Database/dbHelpers");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User created successfully');
  } catch {
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Cannot find user');
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, 'secret');
      res.cookie('jwt', token);
      res.status(200).send('Logged in successfully');
    } else {
      res.status(401).send('Invalid login credentials');
    }
  } catch {
    res.status(500).send('Error logging in');
  }
});

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).send('Unauthorized');
  }
};

app.get('/protected', auth, (req, res) => {
  res.send(`Welcome ${req.user.email}`);
});


// ROUTES books
app.post("/users/create", async (req, res) => {
  //check se req.body esta vazio
  if (!Object.keys(req.body).length) {
    res.status(400).json({
    message: "Não pode estar vazio"
  })
  }
  const {email, senha} = (req.body)
  // grava no db
  const login = await db({email, senha})
  if (login.error) {
    res.status(500).json({
      message: login.error
    })
  }
  res.status(201).json({
    message: "Novo usuario criado"
  })
})

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
