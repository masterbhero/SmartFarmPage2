import {Routes,RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';



const Routes: Routes = [
  { path: '',  redirectTo:'/login', pathMatch:'full' },
  { path: 'login',  component: LoginComponent },
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
