import { responseErrorMessage } from "./helpers";
import prisma from "../prisma/client";

export const validateTopic = async (res: any, topics: []) => {
  const topicData = [];
  for (let i = 0; i < topics.length; i++) {
    const existingTopic = await prisma.topic.findUnique({
      where: { id: topics[i] },
    });
    if (!existingTopic) {
      return responseErrorMessage(res, "Validation failed", {
        topics : "Topic not found",
      }, 404);
    }

    if (existingTopic.parentId == null) {
      return responseErrorMessage(res, "Validation failed", {
        tipics : "Topic is not a child topic"
      }, 404);
    }

    topicData.push({
      topic: { connect: { id: existingTopic.id } },
    });
  }

  return topicData;

};
