import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMailsTable1741466447930 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE mails (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                message_id VARCHAR(255),
                code_queue VARCHAR(255),
                destination VARCHAR(255) NOT NULL,
                sender VARCHAR(255) NOT NULL,
                status VARCHAR NOT NULL,
                sent_at TIMESTAMP,
                delivered_at TIMESTAMP,
                opened_at TIMESTAMP,
                error TEXT
            );
        `);

		await queryRunner.query(`
      CREATE INDEX idx_mails_destination ON mails(destination);
    `);

		await queryRunner.query(`
            CREATE INDEX  idx_mails_sender ON mails(sender);
        `);

		await queryRunner.query(`
            CREATE INDEX  idx_mails_status ON mails(status);
        `);

		await queryRunner.query(`
            CREATE INDEX  idx_mails_sent_at ON mails(sent_at);
        `);

		await queryRunner.query(`
            CREATE INDEX  idx_mails_delivered_at ON mails(delivered_at);
        `);

		await queryRunner.query(`
            CREATE INDEX  idx_mails_opened_at ON mails(opened_at);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE mails;
        `);
	}
}
