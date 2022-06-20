export interface TaskCommentRequest {
  taskId: number;
  comment: string;
  mentionedUserList? : number[]; 
  parentCommentId?: number;
  imageUrl?: string;
}

export interface LikeCommentModel {
  commentId: number;
  taskId: number;
}