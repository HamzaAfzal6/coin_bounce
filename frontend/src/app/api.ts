import { Injectable } from "@angular/core"; 
import { environment } from "src/environment/environment";

Injectable()
export class api{
    

    public static singUp : string='http://localhost:4000/adduser';
    public static singIn : string='http://localhost:4000/login';
    public static allUsers : string='http://localhost:4000/users';
    public static logOut : string='http://localhost:4000/logout';
    public static refresh : string='http://localhost:4000/refresh';
    public static addBlog : string='http://localhost:4000/blog';
    public static allBlogs : string='http://localhost:4000/blogs';
    public static blogById : string='http://localhost:4000/blog/:id';
    public static updateBlog : string='http://localhost:4000/blogupdate';
    public static deleteBlog : string='http://localhost:4000/blog/:id';
    public static comment : string='http://localhost:4000/comment';
    public static commentById : string='http://localhost:4000/comment/:id';
    public static photo : string='http://localhost:4000/photo';
  
    public static home : string=`https://newsapi.org/v2/everything?q=blockchain&sortBy=publishedAt&language=en&apiKey=${environment.newsKey}`;
  
    public static crypto:string=`https://${environment.crypto}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&locale=en`;

}