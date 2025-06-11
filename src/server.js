import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { config } from "./config/serverConfig.js";
import { connectDB } from "./config/mongodb.js";
import { Routers } from "./routes/v1/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { geoipVNOnly } from "./middleware/geoipMiddleware.js";
import { requestLogger } from "./middleware/loggerMiddleware.js";
import compression from "compression";

const app = express();
app.use(
	cors({
		origin: process.env.CLIENT,
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(compression({ threshold: 1024 }));

app.use(geoipVNOnly);
app.use(requestLogger);
Routers(app);
app.use(errorHandler);

app.listen(config.port, () => {
	console.log("Server đang hoạt động bình thường");
});
export default app;
