import { ReactionRepository } from "@amityco/ts-sdk"

export type ReactionDataProps = {
    targetType: Amity.ReactableType;
    targetID: string;
    reactionType?: string
}

const reactAnObject = async (object: ReactionDataProps) => {
    const { targetType, targetID, reactionType } = object;
    const result = await ReactionRepository.addReaction(targetType, targetID, reactionType ?? 'love');
    return result;
}

const removeReactionAnObject = async (object: ReactionDataProps) => {
    const { targetType, targetID, reactionType } = object;
    const result = await ReactionRepository.removeReaction(targetType, targetID, reactionType ?? 'love');
    return result;
}
export {
    reactAnObject,
    removeReactionAnObject
};
