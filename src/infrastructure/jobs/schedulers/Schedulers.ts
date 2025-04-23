import { container } from "../../../di/inversify.config";
import { DSNProcessorScheduler } from "./DSNProcessorScheduler";

export const startAllSchedulers = (): void => {
	const processorScheduler = container.resolve(DSNProcessorScheduler);
	processorScheduler.schedule();

	// Inicie outros schedulers aqui
};
