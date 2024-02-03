import { Router } from "express";
const router = Router();

router.get("/api/products", (req, res) => {
  res.send({ name: "Apple", category: "Mobile" });
});

export default router;
