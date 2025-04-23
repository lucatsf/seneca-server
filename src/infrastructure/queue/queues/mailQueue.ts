import { queueProvider } from "../../providers/QueueProvider";

export const mailQueue = queueProvider.getQueue("mail");
