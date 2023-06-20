import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class userService{

private userId:any;
constructor(){}
setUserId(Id:any){
this.userId=Id;

}
getUserId(){
    return this.userId;
}

}