import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientsTable1739659079938 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE clients
      (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email      VARCHAR(255) NOT NULL,
        name       VARCHAR(255) NOT NULL,
        phone      VARCHAR(255),
        created_at TIMESTAMP        DEFAULT NOW(),
        updated_at TIMESTAMP        DEFAULT NOW()
      );
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE clients;`);
	}
}
