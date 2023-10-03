import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { savedRouter } from "./routes/saved.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/", savedRouter);


const connect = process.env.DB_SERVER;
const PORT = process.env.PORT || 8080;

const startServer = async () => {
	try {
		mongoose.connect(connect);
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
