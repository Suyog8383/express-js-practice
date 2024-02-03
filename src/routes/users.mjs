import { Router } from "express";
import { mockUsers } from "../utils/constant.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createValidationSchema,
  validationSchema,
} from "../utils/validationSchems.mjs";

import {
  loggingMiddleware,
  resolveIndexByUserId,
} from "../utils/middlewares.mjs";

const router = Router();

router.get("/", loggingMiddleware, (req, res) => {
  res.send({ msg: "Hello, Suyog" });
});

router.get("/api/users", checkSchema(validationSchema), (req, res) => {
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

router.post("/api/users", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
  const data = matchedData(req);
  console.log("data", data);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  mockUsers.push(newUser);
  res.status(200).send(mockUsers);
});

router.put(
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

router.patch(
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

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUser } = req;
  mockUsers.splice(findUser, 1);
  res.sendStatus(200);
});

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUser } = req;

  const userIndex = mockUsers[findUser];

  if (!userIndex) return res.sendStatus(404);

  return res.send(userIndex);
});

export default router;
