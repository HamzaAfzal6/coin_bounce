import { Component, OnInit } from '@angular/core';
import { api } from '../api';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentsResponse } from '../interfaces'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userService } from 'src/userService';
import { Router } from '@angular/router';

const blogs=api.allBlogs;
const comments=api.comment;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit{
loading=true;
blogs: any[] = [];
blog: any[] = [];
comments: Comment[] = [];
comment:any;

  allblogs!: boolean;


constructor(private http:HttpClient,
   private userService:userService,
  private router:Router){}

ngOnInit(): void {
  this.allblogs=true;
  this.http.get<any[]>(blogs).subscribe(
    (response)=>{
      this.loading=false;
      this.blogs=response;
      console.log(this.blogs);
      
      },
      (error)=>{
        console.log(error);
})
}

BlogId: any;//strong clicked blogid into BLogID from using further like comntsjsonfile etc


clickit(_id: any){
  this.allblogs=false;
  this.loading=true;
  this.BlogId=_id;
  this.http.get<any[]>(`http://localhost:4000/blog/${_id}`).subscribe(
    (responce)=>{
      this.loading=false;
this.blog=[responce];
console.log(this.blog);
    },
    (error)=>{
      console.log(error);
    }
  );
  this.http.get<CommentsResponse>(`http://localhost:4000/comments/${_id}`).subscribe(
    (response: CommentsResponse) => {
      this.comments = response.data;
      console.log(this.comments);
    },
    (error: any) => {
      console.log(error);
    }
  );
  
}
author=this.userService.getUserId();// getting usid from servis
post(){
  
 
  console.log({blog:this.BlogId,
    author:this.author,
    comment:this.comment});
  this.http.post(comments,{blog:this.BlogId,
    author:this.author,
    comment:this.comment}).subscribe(
    (responce)=>{
      console.log(responce);
      this.comment = '';
      this.clickit(this.BlogId);
    },
    (error)=>{
      console.log(error);
    }

  )
}

postblog(){
  this.router.navigate(['pblog']);
}

}
