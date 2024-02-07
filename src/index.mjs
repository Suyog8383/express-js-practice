import express from "express";
import userRouter from "./routes/users.mjs";
import productRouter from "./routes/products.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import { checkSchema, validationResult } from "express-validator";
import { validateUserLogin } from "./utils/validationSchems.mjs";
import { mockUsers } from "./utils/constant.mjs";

import "./strategies/local-strategy.mjs";

const app = express();
const PORT = process.env.PORT || 4000;
import passport from "passport";

mongoose
  .connect("mongodb://localhost/express_tut")
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "hello suyog",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(productRouter);

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/statusData", (req, res) => {
  console.log(req.user);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});
app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});
app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("Name", "Suyog", { maxAge: 10000 });
  res.send({ msg: "Hello, Suyog" });
});

// app.post("/api/auth", checkSchema(validateUserLogin), (req, res) => {
//   const {
//     body: { username, password },
//   } = req;
//   const result = validationResult(req);
//   if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser) return res.status(401).send({ meg: "bad credential" });

//   if (!password) return res.status(401).send({ meg: "bad credential" });

//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ meg: "bad credential" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// app.get("/api/auth/status", (req, res) => {
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "not authorized" });
// });

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [];
  }

  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? []);
});
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
