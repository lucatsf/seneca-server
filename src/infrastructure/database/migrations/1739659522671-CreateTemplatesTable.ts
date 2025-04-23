import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTemplatesTable1739659522671 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE templates
      (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID         NOT NULL,
        name       VARCHAR(255) NOT NULL,
        subject    VARCHAR(255) NOT NULL,
        body       TEXT         NOT NULL,
        status     VARCHAR(20)  NOT NULL,
        created_at TIMESTAMP        DEFAULT NOW(),
        updated_at TIMESTAMP        DEFAULT NOW()
      );
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      DROP TABLE templates;
    `);
	}
}
