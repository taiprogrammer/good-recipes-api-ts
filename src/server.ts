import cors from "cors";
import dotenv from "dotenv";

import { logger } from "./log/index.log";
import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
};

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
