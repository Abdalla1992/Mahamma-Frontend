import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { Component, Input, OnInit } from "@angular/core";
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { User } from 'src/app/@core/auth/app-user';
import { ChoiceWithIndices } from '@flxng/mentions';
import { ProjectCommentsResponse } from 'src/app/@AppService/models/project-comments-response';
import { ProjectCommentsRequest, ProjectLikeCommentModel } from 'src/app/@AppService/models/project-comments-request';


@Component({
  selector: 'app-project-comments',
  templateUrl: './project-comments.components.html',
  styleUrls: ['./project-comments.components.scss']
})
export class ProjectCommentsComponent extends BaseComponent implements OnInit {

  @Input() projectId: number;
  @Input() commentList: ProjectCommentsResponse[];
  @Input() users: MemberModel[];
  @Input() isReadOnly : boolean = false;

  currentUser : User;
  commentForm: FormGroup;
  mentions: ChoiceWithIndices[] = [];
  choices: MemberModel[] = [];
  text : string = '';
  loading : boolean = false;
  replayComment: boolean = false;


  /**
   *
   */
  constructor(private projectService: ProjectService,
    authenticationService: AuthenticationService,
    private fb: FormBuilder) {
    super();
    this.currentUser = authenticationService.currentUser();
    this.currentUser.profileImage;
  }
  ngOnInit(): void {
    this.loadForm();
  }
  loadForm() : void{
      this.commentForm = this.fb.group({
  'addComment': ['']
    });
  }
  addComment(comment: string, commentId?: number): void {
    this.getSelectedChoices().forEach(c =>
    {
      let finalComment = comment.replace("@"+c.fullName, '<a class="mention" href="'+location.origin+'/profile/'+c.userId+'">@'+c.fullName+"</a>")
      comment = finalComment;
    });
    let commentRequest: ProjectCommentsRequest =
    {
      comment: comment,
      projectId: this.projectId,
      imageUrl: ''
    };
    if(commentId){
      commentRequest.parentCommentId = commentId;
    }
    commentRequest.mentionedUserList = this.getSelectedChoices().map(c => c.userId);

    this.projectService.AddComment(commentRequest).subscribe(response => {
      if (response.isValidResponse) {
        if (response.result.responseData && response.result.responseData.length > 0) {
          this.showSuccessMessage(response.result.commandMessage);
          this.commentList = response.result.responseData;
          if(!commentId){
            this.commentForm.get('addComment')?.setValue('');
          }

          this.mentions = [];
        } else {
          this.showErrorMessage(response.result.commandMessage)
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    });
  }


  likeComment(id: number) {
    const projectLikeCommentModel: ProjectLikeCommentModel = { commentId: id, projectId: this.projectId };
    this.projectService.likeComment(projectLikeCommentModel).subscribe(response => {
      if (response.isValidResponse) {
        if (response.result.responseData && response.result.responseData.length > 0) {
          debugger;
          // this.showSuccessMessage(response.result.commandMessage);
          this.commentList = response.result.responseData;
          this.toggleLike();
        } else {
          this.showErrorMessage(response.result.commandMessage)
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    })
  }

  isActiveLike: boolean= false;

  toggleLike(){
    this.isActiveLike = ! this.isActiveLike
  }

  async loadChoices(searchTerm: string): Promise<MemberModel[]> {
    const users = await this.getUsers();
    this.choices = users.filter((user) => {
      const alreadyExists = this.mentions.some((m) => m.choice.name === user.fullName);
      return !alreadyExists && user.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

    return this.choices;
  }

  getChoiceLabel = (user: MemberModel): string => {
    return `@${user.fullName}`;
  };

  onSelectedChoicesChange(choices: ChoiceWithIndices[]): void {
    this.mentions = choices;
  }

  onMenuShow(): void {
    console.log('Menu show!');
  }

  onMenuHide(): void {
    console.log('Menu hide!');
    this.choices = [];
  }

  getSelectedChoices(): MemberModel[] {
    if (this.mentions.length) {
      return this.mentions.map((m) => m.choice);
    } else {
      return [];
    }
  }

  async getUsers(): Promise<MemberModel[]> {
    this.loading = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loading = false;
        resolve(this.users);
      }, 600);
    });
  }

  showReplay(){
    this.replayComment =  ! this.replayComment
  }
}
