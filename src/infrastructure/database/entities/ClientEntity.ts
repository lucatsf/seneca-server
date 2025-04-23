import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Client } from "../../../modules/client/domain/entities/Client";

@Entity("clients") // Nome da tabela no banco
export class ClientEntity extends Client {
	@PrimaryGeneratedColumn("uuid") // ID gerado automaticamente
	id!: string;

	@Column({ type: "varchar", name: "email", length: 255, unique: true }) // Coluna de email
	@Column({ type: "varchar", name: "name", length: 255, unique: true }) // Coluna de email
	email!: string;

	@Column({ type: "varchar", name: "name", length: 255 }) // Coluna de nome (opcional)
	name!: string;

	@Column({ type: "varchar", name: "phone", length: 20 }) // Coluna de telefone (opcional)
	phone?: string;
}
