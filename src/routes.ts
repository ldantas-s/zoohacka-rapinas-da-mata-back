import { Router } from "express";
import multer from "multer";
// config upload
import uploadConfig from "./config/upload";
// controllers
import orphanageController from "@controllers/denunciationController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/denunciations", orphanageController.index);
routes.get("/denunciations/:id", orphanageController.show);
routes.post(
	"/denunciations",
	upload.array("images"),
	orphanageController.store
);

export default routes;
