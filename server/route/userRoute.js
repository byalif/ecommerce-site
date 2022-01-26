import data from "../controller/user.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const {
  purchase,
  addItems,
  resetPassword,
  welcomeUser,
  createUser,
  loginUser,
  getUsers,
  forgotPassword,
  Items,
  contact,
} = data;

// const { addItems } = cart;

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send({ message: "you are not authorized" });
  } else {
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        res.json({ status: "error" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

router.get("/", getUsers);
router.post("/", createUser);
router.post("/contact", contact);

router.post("/login", loginUser);
router.post("/forgotPass", forgotPassword);
router.post("/resetPass/:id/:token", resetPassword);

router.use(verifyJWT);
router.post("/purchase", purchase);
router.get("/welcome", welcomeUser);
router.post("/addItems", addItems);
router.get("/Items", Items);
export default router;
