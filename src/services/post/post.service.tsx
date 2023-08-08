import { CreatePostDTO } from '../../models/post/post.dto';
import HttpService from "../http.service";
import { Post } from "../../models/post/post";
import { CommentData } from "../../models/comment/comment";
import { PostRepository } from "@amityco/ts-sdk";
import { PostMetaData } from "../../models/post/post.metadata";

const NEW_FEED_PATH = "/NewFeed";
// GET: /NewFeed 


const getPublicPosts = async () => {
    const result = await HttpService.get(NEW_FEED_PATH);

    return JSON.parse(result?.data)
}

// POST: /NewFeed  || Community
const createPost = async (payload: CreatePostDTO) => {
    const postMetaData: PostMetaData = {
        title: payload.title,
        thumbnailUrl: payload.thumbnailUrl,
        tagArray: payload.tagArray
    };

    const postData = {
        targetId: payload.targetID,
        targetType: payload.targetType.toString(),
        data: {
            text: payload.content,
        },
        metadata: postMetaData,
        tags: payload.tags,
    };
    const post = await PostRepository.createPost(postData);

    if (!post) {
        return undefined;
    }
    return post.data;
}
const getPostDetails = async (postid: number | string) => {
    const result = await HttpService.get(`/GetPost?PostID=${postid}`);
    if (result?.status === 200) {
        return JSON.parse(result.data) as Post;
    }
    return undefined;
}

const getPostComments = async (postid: number | string, options?: { sort?: 'asc' | 'des' }) => {
    const result = await HttpService.get(`/comment?PostID=${postid}`);
    if (result?.status === 200) {
        const comments = JSON.parse(result.data) as CommentData[];
        // sort data before return
        const sortOption = options?.sort ?? 'des'; //default latest comment on top
        if (sortOption === 'des') {
            comments.sort((a, b) => (b.Code ?? '').localeCompare(a.Code ?? ''))
        }
        return comments;
    }
    return [];
}
const createPostReact = async (postid: number | string, uuid: string | null) => {
    const result = await HttpService.post(`/postreact`, { body: { PostID: postid, UUID: uuid } })
    return JSON.parse(result?.data)
}
// search by Keyword
const searchByKeyword = async (value: string) => {
    const result = await HttpService.get(`/search?KeyWord=${value}`);
    if (result?.status === 200) {
        return JSON.parse(result.data)
    }
    return undefined;
}
export {
    getPublicPosts,
    createPost,
    getPostDetails,
    getPostComments,
    createPostReact,
    searchByKeyword
}