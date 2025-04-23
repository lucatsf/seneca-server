import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyTable1739831054414 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE companies
      (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name       VARCHAR(255) NOT NULL,
        cnpj       VARCHAR(14)  NOT NULL UNIQUE,
        status     VARCHAR(50)  NOT NULL,
        phone      VARCHAR(20)  NOT NULL,
        email      VARCHAR(255) NOT NULL,
        address    VARCHAR(255) NOT NULL,
        created_at TIMESTAMP        DEFAULT NOW(),
        updated_at TIMESTAMP        DEFAULT NOW()
      );
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      DROP TABLE companies;
    `);
	}
}
