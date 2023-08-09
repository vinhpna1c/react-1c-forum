import { CreateCommentDTO } from "../../models/comment/comment.dto";
import HttpService from "../http.service";
import { CommentRepository } from "@amityco/ts-sdk";

const COMMENT_PATH = "/comment";

// const httpService = new HttpService();

// const createCommentReact = async (commentid: number | string, uuid: string | null) => {
//     const result = await httpService.post(`/commentreact`, { body: { CommentID: commentid, UUID: uuid } })
//     return JSON.parse(result?.data)
// }

const createComment = async (payload: CreateCommentDTO) => {
    // const result = await httpService.post(COMMENT_PATH, { body: payload });
    // return result?.status === 200;
    const comment = await CommentRepository.createComment({
        data: {
            text: payload.content,
        },
        referenceId: payload.targetID,
        referenceType: payload.targetType,
    })

    return comment;
}

export {
    // createCommentReact,
    createComment
}