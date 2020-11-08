import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
// models
import Denunciation from "@models/Denunciation";
// views
import denunciationsView from "@views/denunciations_view";

export default {
	async store(request: Request, response: Response) {
		const { title, latitude, longitude, description } = request.body;

		const denunciationRepository = getRepository(Denunciation);

		const requestImages = request.files as Express.Multer.File[];

		const images = requestImages.map((image) => {
			return { path: image.filename };
		});

		const data = {
			title,
			latitude,
			longitude,
			description,
			images,
		};

		const schema = Yup.object().shape({
			title: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			description: Yup.string().required().max(300),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required(),
				})
			),
		});

		await schema.validate(data, {
			abortEarly: false,
		});

		denunciationRepository
			.save(await denunciationRepository.create(data))
			.then((result) => {
				return response
					.status(201)
					.json({ message: "Criado com sucesso", result });
			})
			.catch((err) => {
				console.error(err);
				return response.status(500).json({ message: "Error on server" });
			});
	},

	index(request: Request, response: Response) {
		const denunciationRepository = getRepository(Denunciation);

		denunciationRepository
			.find({
				relations: ["images"],
			})
			.then((result) => {
				if (!result.length)
					return response.status(404).json({ message: "not found" });

				response.status(200).json({
					message: "This is all of denunciations",
					denunciation: denunciationsView.renderMany(result),
				});
			})
			.catch((err) => {
				console.error(err);
				return response.status(500).json({ message: "Error on server" });
			});
	},

	show(request: Request, response: Response) {
		const { id } = request.params;
		const denunciationRepository = getRepository(Denunciation);

		denunciationRepository
			.findOneOrFail({
				relations: ["images"],
				where: { id },
			})
			.then((result) => {
				return response.status(200).json({
					message: "Search with success",
					denunciation: denunciationsView.render(result),
				});
			})
			.catch((err) => {
				console.error(err);
				return response.status(404).json({ message: "Not found" });
			});
	},
};
