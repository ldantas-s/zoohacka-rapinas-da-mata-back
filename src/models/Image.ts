import { join } from "path";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
// models
import Denunciation from "./Denunciation";

@Entity("images")
export default class Image {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	path: string;

	@ManyToOne(() => Denunciation, (denunciation) => denunciation.images)
	@JoinColumn({ name: "denunciation_id" })
	denunciation: Denunciation;
}
