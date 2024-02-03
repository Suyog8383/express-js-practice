import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

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

const mockUsers = [
  { id: 1, name: "suyog", city: "pune" },
  { id: 2, name: "aniket", city: "chennai" },
  { id: 3, name: "kiran", city: "delhi" },
  { id: 4, name: "john", city: "paris" },
];

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

//3. query parameters
app.get("/api/users", (req, res) => {
  console.log(req.query);
  // filter and value
  const { filter, value } = req.query;
  if (filter && value) {
    const filterData = mockUsers.filter((user) => user[filter].includes(value));
    return res.send(filterData);
  }
  return res.send(mockUsers);
});

//4. post request
app.post("/api/users", (req, res) => {
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...req.body };
  mockUsers.push(newUser);
  console.log(mockUsers);
  res.status(200).send(mockUsers);
});

//5. put request
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUser } = req;
  mockUsers[findUser] = { id: mockUsers[findUser].id, ...body };
  return res.sendStatus(200);
});
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUser } = req;
  mockUsers[findUser] = { ...mockUsers[findUser], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUser } = req;
  mockUsers.splice(findUser, 1);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
