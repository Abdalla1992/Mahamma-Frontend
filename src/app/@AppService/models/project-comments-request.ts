 export interface ProjectCommentsRequest {
  projectId: number;
  comment: string;
  mentionedUserList? : number[];
  parentCommentId?: number;
  imageUrl?: string;
 }




export interface ProjectLikeCommentModel {
  commentId: number;
  projectId: number;
}
