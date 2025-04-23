import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1739907871440 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
          CREATE TABLE users
          (
            id         UUID PRIMARY KEY      DEFAULT uuid_generate_v4(),
            company_id UUID,
            name       VARCHAR(255) NOT NULL,
            password   VARCHAR(255) NOT NULL,
            email      VARCHAR(255) NOT NULL UNIQUE,
            status     VARCHAR(50)  NOT NULL DEFAULT 'available',
            created_at TIMESTAMP             DEFAULT NOW(),
            updated_at TIMESTAMP             DEFAULT NOW()
          );
        `);

		await queryRunner.query(`
      CREATE INDEX idx_users_company_id ON users(company_id);
    `);

		await queryRunner.query(`
      CREATE INDEX idx_users_status ON users(status);
    `);

		await queryRunner.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_users_company_id
      FOREIGN KEY (company_id)
      REFERENCES companies(id);
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      DROP TABLE users;
    `);
	}
}
