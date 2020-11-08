import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602986070299 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "denunciations",
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
						name: "title",
						type: "varchar",
					},
					{
						name: "latitude",
						type: "decimal",
						scale: 10,
						precision: 2,
					},
					{
						name: "longitude",
						type: "decimal",
						scale: 10,
						precision: 2,
					},
					{
						name: "description",
						type: "text",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("denunciations");
	}
}
