import { BaseModel } from "../base/base.model";
import { MemberModel } from "../search.member.model";

export interface TaskCommentResponse extends BaseModel {
  comment: string;
  taskMemberId: number;
  userId: number;
  parentCommentId: number;
  likesCount: number;
  imageUrl: string;
  creationDate: Date;
  member?: MemberModel;
  replies: TaskCommentResponse[];
  creationDuration: string;
  isLikedByCurrentUser: boolean;
}