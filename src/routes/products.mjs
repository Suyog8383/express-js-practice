import { Router } from "express";
const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  if (req.cookies.Name && req.cookies.Name === "Suyog")
    return res.send({ name: "Apple", category: "Mobile" });

  return res.status(400).send({ msg: "Sorry. you need correct cookies" });
});

export default router;
