import PostTargetType  from '../../models/constants/PostTargetType';
import { PostMetaData } from "./post.metadata"

export interface CreatePostDTO {
    title: string;
    content?: string;
    tags?: string[];
    targetID: string;
    thumbnailUrl?: string;
    targetType: PostTargetType;
    description: string;
    tagArray: string[]
}



export interface Multimedia {
    MultimediaURL: string
}
