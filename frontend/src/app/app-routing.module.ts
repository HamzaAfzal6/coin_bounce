import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoComponent } from './crypto/crypto.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { PhotoVariationComponent } from './photo-variation/photo-variation.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authGuard'; 
import { CreateblogComponent } from './blogs/createblog/createblog.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: 'blogs', component: BlogsComponent, canActivate: [AuthGuard] },
  { path: 'crypto', component: CryptoComponent, canActivate: [AuthGuard] },
  { path: 'photo', component: PhotoVariationComponent, canActivate: [AuthGuard] },
  { path: 'pblog', component: CreateblogComponent }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
