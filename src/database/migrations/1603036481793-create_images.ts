import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1603036481793 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "images",
				columns: [
					{
						name: "id",
						type: "integer",
						unsigned: true,
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "path",
						type: "varcahr",
					},
					{
						name: "denunciation_id",
						type: "integer",
					},
				],
				foreignKeys: [
					{
						name: "ImageDenunciation",
						columnNames: ["denunciation_id"],
						referencedTableName: "denunciations",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("images");
	}
}
