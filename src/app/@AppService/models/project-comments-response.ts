import { BaseModel } from './base/base.model';
import { MemberModel } from './search.member.model';
export interface ProjectCommentsResponse extends BaseModel{
  comment: string;
  projectMemberId: number;
  userId: number;
  parentCommentId: number;
  likesCount: number;
  imageUrl: string;
  creationDate: Date;
  member?: MemberModel;
  replies: ProjectCommentsResponse[];
  creationDuration: string;
  isLikedByCurrentUser: boolean;
}
