import { Following } from "./follow";

export interface FollowingRespond {
    Following?:      Following[];
    TotalFollowing?: number;
}

export interface GetFollowingDTO {
    UserID: string;
    UUID:   string;
}

export interface FollowUserRespond {
    message?: string;
    status?:  string;
}
