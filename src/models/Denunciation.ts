import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from "typeorm";

// models
import Image from "./Image";

@Entity("denunciations")
export default class Orphanage {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	title: string;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	description: string;

	@OneToMany(() => Image, (image) => image.denunciation, {
		cascade: ["insert", "update"],
	})
	@JoinColumn({ name: "denunciation_id" })
	images: Image[];
}
