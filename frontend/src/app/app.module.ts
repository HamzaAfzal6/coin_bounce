import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogsComponent } from './blogs/blogs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { CryptoComponent } from './crypto/crypto.component';
import { PhotoVariationComponent } from './photo-variation/photo-variation.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authGuard'; 
import { HttpClientModule } from '@angular/common/http'; 
import { GlobalErrorHandler } from './global-error-handler';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CreateblogComponent } from './blogs/createblog/createblog.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';






@NgModule({
  declarations: [
    AppComponent,
   
    BlogsComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    HomeComponent,
    CryptoComponent,
    PhotoVariationComponent,
    SignupComponent,
    CreateblogComponent,
    
  ],
  imports: [
    MatInputModule,
  MatFormFieldModule,
  MatButtonModule,MatSidenavModule,MatExpansionModule,MatDividerModule,MatFormFieldModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard,
    GlobalErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
