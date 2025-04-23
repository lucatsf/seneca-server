import { Container } from "inversify";
import { SendEmailUseCase } from "../modules/mail/domain/use-cases/SendEmailUseCase";
import { IMailRepository } from "../modules/mail/domain/repositories/IMailRepository";
import { MailController } from "../modules/mail/presentation/controllers/MailController";
import { TYPES } from "./types"; // Definiremos isso abaixo
import { ClientController } from "../modules/client/presentation/controllers/ClientController";
import { TemplateController } from "../modules/template/presentation/controllers/TemplateController";
import { CreateClientUseCase } from "../modules/client/domain/use-cases/CreateClientUseCase";
import { IClientRepository } from "../modules/client/domain/repositories/IClientRepository";
import { UpdateClientUseCase } from "../modules/client/domain/use-cases/UpdateClientUseCase";
import { DeleteClientUseCase } from "../modules/client/domain/use-cases/DeleteClientUseCase";
import { FindSinglePaginateUseCase } from "../modules/client/domain/use-cases/FindSinglePaginateUseCase";
import { TypeORMClientRepository } from "../infrastructure/database/typeorm/repositories/TypeORMClientRepository";
import { CreateTemplateUseCase } from "../modules/template/domain/use-cases/CreateTemplateUseCase";
import { FindByIdTemplateUseCase } from "../modules/template/domain/use-cases/FindByIdTemplateUseCase";
import { UpdateTemplateUseCase } from "../modules/template/domain/use-cases/UpdateTemplateUseCase";
import { ITemplateRepository } from "../modules/template/domain/repositories/ITemplateRepository";
import { TypeORMTemplateRepository } from "../infrastructure/database/typeorm/repositories/TypeORMTemplateRepository";
import { TemplateFindSinglePaginateUseCase } from "../modules/template/domain/use-cases/TemplateFindSinglePaginateUseCase";
import { DeleteTemplateUseCase } from "../modules/template/domain/use-cases/DeleteTemplateUseCase";
import { AuthController } from "../modules/auth/presentation/controllers/AuthController";
import { AuthenticateUserUseCase } from "../modules/auth/domain/use-cases/AuthenticateUserUseCase";
import { RegisterUserUseCase } from "../modules/auth/domain/use-cases/RegisterUserUseCase";
import { IUserRepository } from "../modules/auth/domain/repositories/IUserRepository";
import { TypeORMUserRepository } from "../infrastructure/database/typeorm/repositories/TypeORMUserRepository";
import { ICompanyRepository } from "../modules/company/domain/repositories/ICompanyRepository";
import { TypeORMCompanyRepository } from "../infrastructure/database/typeorm/repositories/TypeORMCompanyRepository";
import { CreateCompanyUseCase } from "../modules/company/domain/use-cases/CreateCompanyUseCase";
import { CompanyController } from "../modules/company/presentation/controllers/CompanyController";
import { DeleteCompanyUseCase } from "../modules/company/domain/use-cases/DeleteCompanyUseCase";
import { FindByCNPJCompanyUseCase } from "../modules/company/domain/use-cases/FindByCNPJCompanyUseCase";
import { FindByIdCompanyUseCase } from "../modules/company/domain/use-cases/FindByIdCompanyUseCase";
import { UpdateCompanyUseCase } from "../modules/company/domain/use-cases/UpdateCompanyUseCase";
import { DSNProcessorJob } from "../infrastructure/jobs/DSNProcessorJob";
import { DSNProcessorScheduler } from "../infrastructure/jobs/schedulers/DSNProcessorScheduler";
import { NodemailerMailProvider } from "../infrastructure/providers/NodemailerMailProvider";
import { IMailProvidersRepository } from "../modules/mail/domain/repositories/IMailProvidersRepository";
import { TypeORMMailRepository } from "../infrastructure/database/typeorm/repositories/TypeORMMailRepository";
import { TrackEmailOpenUseCase } from "../modules/mail/domain/use-cases/TrackEmailOpenUseCase";

const container = new Container();

// Mail
container.bind<IMailRepository>(TYPES.MailRepository).to(TypeORMMailRepository);
container
	.bind<IMailProvidersRepository>(TYPES.MailProvidersRepository)
	.to(NodemailerMailProvider);
container.bind<SendEmailUseCase>(TYPES.SendEmailUseCase).to(SendEmailUseCase);
container
	.bind<TrackEmailOpenUseCase>(TYPES.TrackEmailOpenUseCase)
	.to(TrackEmailOpenUseCase);
container.bind<MailController>(TYPES.MailController).to(MailController);

// Client
container
	.bind<IClientRepository>(TYPES.ClientRepository)
	.to(TypeORMClientRepository);
container
	.bind<CreateClientUseCase>(TYPES.CreateClientUseCase)
	.to(CreateClientUseCase);
container
	.bind<UpdateClientUseCase>(TYPES.UpdateClientUseCase)
	.to(UpdateClientUseCase);
container
	.bind<DeleteClientUseCase>(TYPES.DeleteClientUseCase)
	.to(DeleteClientUseCase);
container
	.bind<FindSinglePaginateUseCase>(TYPES.FindSinglePaginateUseCase)
	.to(FindSinglePaginateUseCase);
container.bind<ClientController>(TYPES.ClientController).to(ClientController);

// Template
container
	.bind<ITemplateRepository>(TYPES.TemplateRepository)
	.to(TypeORMTemplateRepository);
container
	.bind<CreateTemplateUseCase>(TYPES.CreateTemplateUseCase)
	.to(CreateTemplateUseCase);
container
	.bind<FindByIdTemplateUseCase>(TYPES.FindByIdTemplateUseCase)
	.to(FindByIdTemplateUseCase);
container
	.bind<UpdateTemplateUseCase>(TYPES.UpdateTemplateUseCase)
	.to(UpdateTemplateUseCase);
container
	.bind<TemplateFindSinglePaginateUseCase>(
		TYPES.TemplateFindSinglePaginateUseCase,
	)
	.to(TemplateFindSinglePaginateUseCase);
container
	.bind<DeleteTemplateUseCase>(TYPES.DeleteTemplateUseCase)
	.to(DeleteTemplateUseCase);
container
	.bind<TemplateController>(TYPES.TemplateController)
	.to(TemplateController);

// Auth
container.bind<IUserRepository>(TYPES.UserRepository).to(TypeORMUserRepository);
container
	.bind<AuthenticateUserUseCase>(TYPES.AuthenticateUserUseCase)
	.to(AuthenticateUserUseCase);
container
	.bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase)
	.to(RegisterUserUseCase);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

// Company
container
	.bind<ICompanyRepository>(TYPES.CompanyRepository)
	.to(TypeORMCompanyRepository);
container
	.bind<CreateCompanyUseCase>(TYPES.CreateCompanyUseCase)
	.to(CreateCompanyUseCase);
container
	.bind<DeleteCompanyUseCase>(TYPES.DeleteCompanyUseCase)
	.to(DeleteCompanyUseCase);
container
	.bind<FindByCNPJCompanyUseCase>(TYPES.FindByCNPJCompanyUseCase)
	.to(FindByCNPJCompanyUseCase);
container
	.bind<FindByIdCompanyUseCase>(TYPES.FindByIdCompanyUseCase)
	.to(FindByIdCompanyUseCase);
container
	.bind<UpdateCompanyUseCase>(TYPES.UpdateCompanyUseCase)
	.to(UpdateCompanyUseCase);
container
	.bind<CompanyController>(TYPES.CompanyController)
	.to(CompanyController);

container.bind(DSNProcessorJob).toSelf();
container.bind(DSNProcessorScheduler).toSelf();

export { container };
