export interface CreateCommentDTO {
    targetID: string; // Require CommentID or PostID
    targetType: Amity.CommentReferenceType; // Require CommentID or PostID
    content: string;
}
