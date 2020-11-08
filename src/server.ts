import express from "express";
import path from "path";
import "express-async-errors";
import cors from "cors";

// Connection with database
import "./database/connection";
// routes
import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

// express use
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT);
