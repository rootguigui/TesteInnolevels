import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import connectToDatabase from "./config/mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";
import errorHandler from "./middlewares/custom-error";

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/auth", authRoutes);
app.use("/swagger/index.html", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

export default app;
