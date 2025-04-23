import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { CompanyEntity } from "./CompanyEntity";

@Entity("users")
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ name: "company_id", type: "varchar", nullable: true })
	companyId!: string;

	@Column({ name: "name", type: "varchar", length: 255 })
	name!: string;

	@Column({ name: "email", type: "varchar", length: 255, unique: true })
	email!: string;

	@Column({ name: "password", type: "varchar", length: 255 })
	password!: string;

	@Column({ name: "status", type: "varchar", length: 20 })
	status!: string;

	@CreateDateColumn({ name: "created_at" })
	created_at!: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updated_at!: Date;

	@ManyToOne(() => CompanyEntity, (company) => company.users)
	@JoinColumn({ name: "company_id" })
	company: CompanyEntity | undefined;
}
