export interface Community {
    isPublic: boolean,
    Code: string,
    CommunityName: string,
    CoverPicture: string,
    Avatar: string,
    Introduction : string,
    CountMember: string | number,
    CountPost: string | number,
    IsJoined?: boolean
}
//.d-> get thong tin
//.dto -> put/post/delete/.....