import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Template } from "../../../modules/template/domain/entities/Template";

@Entity("templates")
export class TemplateEntity extends Template {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", name: "company_id", length: 36, nullable: false })
	companyId!: string;

	@Column({ type: "varchar", name: "name", length: 255 })
	name!: string;

	@Column({ type: "varchar", name: "subject", length: 255 })
	subject!: string;

	@Column({ type: "text", name: "body" })
	body!: string;

	@Column({ type: "varchar", name: "status", length: 255 })
	status!: string;
}
