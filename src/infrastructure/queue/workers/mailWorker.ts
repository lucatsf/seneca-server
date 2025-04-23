import { mailQueue } from "../queues/mailQueue";
import { SendEmailUseCase } from "../../../modules/mail/domain/use-cases/SendEmailUseCase";
import { container } from "../../../di/inversify.config";
import { TYPES } from "../../../di/types";

const sendEmailUseCase = container.get<SendEmailUseCase>(
	TYPES.SendEmailUseCase,
);

mailQueue.process(async (job) => {
	await sendEmailUseCase.execute(job.data);
});
