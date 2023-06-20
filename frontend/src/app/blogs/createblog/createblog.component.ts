import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from 'src/userService';
import { api } from 'src/app/api';
import { Router } from '@angular/router';
const pblog=api.addBlog;
@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.scss']
})
export class CreateblogComponent implements OnInit {
  blogForm!: FormGroup;
  author: string;
  
  file: any;
  title: any;
  content: any;
  photo: any;

  constructor(private router : Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: userService
  ) {
    this.author = this.userService.getUserId();
  }

getFile(event:any){
 // this.blogForm.patchValue({ photo: event.target.files[0] });
 const file=event.target.files[0];
const reader =new FileReader();
reader.readAsDataURL(file);
reader.onloadend=()=>{this.photo =reader.result;};
}
 

ngOnInit(): void {
   
  }

  onSubmit(): void {
    console.log({
    author: '6475cdfe5d51338033100812',
    title: this.title,
    content: this.content,
    photo:this.photo
    
  })
    this.http.post(pblog,{
      author: '6475cdfe5d51338033100812',
      title: this.title,
      content: this.content,
      photo:this.photo}
      
    ).subscribe(
      (responce)=>{
         console.log(responce);
        this.title='';
        this.content='';
         this.router.navigate(['blogs'])
      },
      (error)=>{console.log(error);

      }

    )
  }
}
