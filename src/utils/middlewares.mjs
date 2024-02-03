import { mockUsers } from "./constant.mjs";

export const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

export const resolveIndexByUserId = (req, res, next) => {
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
