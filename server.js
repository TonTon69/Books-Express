require("dotenv").config();

const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

const Book = require("./models/book.model");
const User = require("./models/user.model");

// Connect db
const { MONGOURI } = require("./db");
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connect successfully");
});
mongoose.connection.on("error", () => {
  console.log("Connect failure");
});

// Router
const bookRouter = require("./routes/book.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const shopRouter = require("./routes/shop.route");
const cartRouter = require("./routes/cart.route");
const transferRouter = require("./routes/transfer.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware);

app.use(express.static("public"));

app.use(methodOverride("_method"));

// Home Route
app.get("/", function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  Book.find({})
    .then((books) => {
      const bookFilter = books.slice(start, end);
      User.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            res.render("index", {
              books: bookFilter,
            });
          } else {
            res.render("index", {
              books: bookFilter,
            });
          }
        })
        .catch(next);
    })
    .catch(next);
});

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/cart", cartRouter);
app.use("/transfer", authMiddleware.requireAuth, transferRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
