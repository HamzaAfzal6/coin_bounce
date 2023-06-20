import { Component, OnInit } from '@angular/core';
import { api } from '../api';
import { HttpClient } from '@angular/common/http';


const home=api.home;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  loading = true;
 news: any[]=[]; 
  
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get<any>(home).subscribe(
      (response) => {
        this.loading=false;
        this.news = response.articles;
       
        console.log(this.news);
      },
      (error) => {
        console.log(error);
      }
    );
    }
    browseToUrl(url: string) {
      window.open(url, '_blank');
    }
    
}
