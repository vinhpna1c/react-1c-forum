export interface CommentData {
    RepComment?: CommentData[]; // recursive array
    CountReaction?: number | string;
    CountRepComment?: number | string;
    Content?: string;
    Code?: string;
    Avatar?: string;
    UserName?: string;
    FirebaseUUID?: string;
}
