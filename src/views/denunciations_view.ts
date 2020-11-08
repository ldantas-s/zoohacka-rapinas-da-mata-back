// models
import Denunciation from "@models/Denunciation";
// views
import imagesView from "./images_view";

export default {
	render(denunciation: Denunciation) {
		return {
			id: denunciation.id,
			name: denunciation.title,
			latitude: denunciation.latitude,
			longitude: denunciation.longitude,
			about: denunciation.description,
			images: imagesView.renderMany(denunciation.images),
		};
	},
	renderMany(denunciations: Denunciation[]) {
		return denunciations.map((denunciation) => this.render(denunciation));
	},
};
