import { responseErrorMessage } from "./helpers";
import prisma from "../prisma/client";

export const accessOnlyChildTopic = async (res: any, topicId: string) => {
  const existingTopic = await prisma.topic.findFirst({
    where: { id: topicId },
  });

  if (!existingTopic) {
    return responseErrorMessage(res, "Topic not found", {}, 404);
  }
  
  if (existingTopic.parentId == null) {
    return responseErrorMessage(res, "Topic is not a child topic", {}, 404);
  }

  return existingTopic;
};
