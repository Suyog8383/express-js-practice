import express from "express";
import {
  query,
  body,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import {
  createValidationSchema,
  validationSchema,
} from "./utils/validationSchems.mjs";
import userRouter from "./routes/users.mjs";

import { mockUsers } from "./utils/constant.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
// app.use(userRouter);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUser = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUser === -1) return res.sendStatus(400);
  req.findUser = findUser;
  next();
};

// app.use(loggingMiddleware);

//1. get request
app.get("/", loggingMiddleware, (req, res) => {
  res.send({ msg: "Hello, Suyog" });
});

// app.get("/api/users", (req, res) => {
//   res.send(mockUsers);
// });

//2. route parameters
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUser } = req;

  const userIndex = mockUsers[findUser];

  if (!userIndex) return res.sendStatus(404);

  return res.send(userIndex);
});

//3. query parameters with validation
app.get("/api/users", checkSchema(validationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
  const data = matchedData(req);
  console.log("data", data);

  // filter and value
  const { filter, value } = req.query;
  if (filter && value) {
    const filterData = mockUsers.filter((user) =>
      user[data.filter].includes(data.value)
    );
    return res.send(filterData);
  }
  return res.send(mockUsers);
});

//4. post request
app.post("/api/users", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
  const data = matchedData(req);
  console.log("data", data);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  mockUsers.push(newUser);
  res.status(200).send(mockUsers);
});

//5. put request
app.put(
  "/api/users/:id",
  resolveIndexByUserId,
  checkSchema(createValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });
    console.log(result);
    const data = matchedData(req);
    console.log("data", data);
    const { body, findUser } = req;
    mockUsers[findUser] = { id: mockUsers[findUser].id, ...body };
    return res.sendStatus(200);
  }
);

app.patch(
  "/api/users/:id",
  resolveIndexByUserId,
  checkSchema(createValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });
    console.log(result);
    const data = matchedData(req);
    const { body, findUser } = req;
    mockUsers[findUser] = { ...mockUsers[findUser], ...body };
    return res.sendStatus(200);
  }
);

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUser } = req;
  mockUsers.splice(findUser, 1);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
