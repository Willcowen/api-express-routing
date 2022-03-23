const express = require("express");
const data = require("./data.js");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// SETUP ENDPOINTS

// Users

app.get("/users", (req, res) => {
  res.json({ users: data.users });
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = data.users.find((user) => user.id === userId);
  if (!user) {
    res.json("User not found!");
  }
  res.json({ user: user });
});

app.post("/users", (req, res) => {
  const user = {
    id: data.users.length + 1,
    email: req.body.email,
  };
  data.users.push(user);
  res.json({ user: user });
});

// Films

app.get("/films", (req, res) => { 
  if(!req.query.director) {
  res.json({ films: data.films });
  }
  else {
    const filmDirector = req.query.director
    const filteredFilms = data.films.filter(film => film.director === filmDirector)
    res.json({films: filteredFilms})
  }
});


app.get("/films/:id", (req, res) => {
  const filmId = parseInt(req.params.id);
  const film = data.films.find((film) => film.id === filmId);
  if (!film) {
    res.json("Film not found!");
  }
  res.json({ film: film });
});

app.post("/films", (req, res) => {
  const film = {
    id: data.films.length + 1,
    title: req.body.title,
    director: req.body.director
  };

  console.log(req.body.title);
  data.films.push(film);
  res.json({ film: film});
});

// Books

app.get('/books', (req, res) => {
  res.json({ books: data.books })
})

app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = data.books.find((book) => book.id === bookId);
  if(!book) {
    res.json("Book not found!")
  }
  res.json({book: book})
})

app.post("/books", (req, res) => {
  const book = {
    id: data.books.length + 1,
    title: req.body.title,
    type: req.body.type,
    author: req.body.author
  };

  data.books.push(book);
  res.json({ book: book});
});


/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
