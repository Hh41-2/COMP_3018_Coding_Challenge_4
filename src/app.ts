import express, { Express } from "express";
import morgan from "morgan";
import projectRoutes from "./api/v1/routes/projectRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import adminRoutes from "./api/v1/routes/adminRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

app.use(morgan("combined"));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", projectRoutes);
app.use("/api/v1", adminRoutes);

app.use(errorHandler);

export default app;