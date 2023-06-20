export interface Comment {
    _id: string;
    comment: string;
    authorUsername: string;
  }
  
  export interface CommentsResponse {
    data: Comment[];
  }
  