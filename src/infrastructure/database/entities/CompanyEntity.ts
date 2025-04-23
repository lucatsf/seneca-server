import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("companies")
export class CompanyEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", name: "name", length: 20 })
	name!: string;

	@Column({ type: "varchar", name: "cnpj", length: 14, unique: true })
	cnpj!: string;

	@Column({ type: "varchar", name: "phone", length: 20 })
	phone!: string;

	@Column({ type: "varchar", name: "email", length: 255 })
	email!: string;

	@Column({ type: "varchar", name: "status", length: 20 })
	status!: string;

	@Column({ type: "varchar", name: "address", length: 255 })
	address!: string;

	@CreateDateColumn({ name: "created_at" })
	created_at!: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updated_at!: Date;

	@OneToMany(() => UserEntity, (user: { company: any }) => user.company)
	users: UserEntity[] | undefined;
}
