import { Router } from "express";
import { blogsData } from "../constants/index.mjs";

const router = Router();

router.get("/blogs", (req, res) => {
  res.send(blogsData);
});

export default router;
