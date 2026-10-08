import express from "express";
import dotenv from "dotenv";
import { router } from "./users/user.routes.js";
import {
  notFoundMiddlerware,
  errorrHandlerMiddlerware,
} from "./Middleware/Errorhandler.middleware.js";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'))

app.use(express.json());

app.use("/users", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Healthy",
  });
});

app.use(notFoundMiddlerware);

app.use(errorrHandlerMiddlerware);

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
