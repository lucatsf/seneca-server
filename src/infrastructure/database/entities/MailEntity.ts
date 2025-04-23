import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("mails")
export class MailEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({
		type: "varchar",
		name: "message_id",
		length: 255,
		nullable: true,
	})
	message_id?: string;

	@Column({
		type: "varchar",
		name: "code_queue",
		length: 255,
		nullable: true,
	})
	code_queue?: string;

	@Column({ type: "varchar", name: "destination", length: 255 })
	destination!: string;

	@Column({ type: "varchar", name: "sender", length: 255 })
	sender!: string;

	@Column({ type: "varchar", name: "status", length: 255 })
	status!: string;

	@Column({ type: "timestamp", name: "sent_at", nullable: true })
	sent_at?: Date;

	@Column({ type: "timestamp", name: "delivered_at", nullable: true })
	delivered_at?: Date;

	@Column({ type: "timestamp", name: "opened_at", nullable: true })
	opened_at?: Date;

	@Column({ type: "text", name: "error", nullable: true })
	error?: string;
}
