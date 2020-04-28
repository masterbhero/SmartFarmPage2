import {Routes,RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//page
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlotComponent } from './plot/plot.component';
import { EditComponent } from './edit/edit.component';
import { PlotMenuComponent } from './plot-menu/plot-menu.component';
import { ManagedeviceComponent } from './managedevice/managedevice.component';
import { AddeviceComponent } from './addevice/addevice.component';
import { AdminComponent } from './admin/admin.component';
import { McDataComponent } from './mc-data/mc-data.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './error.interceptor';


const Routes: Routes = [
  { path: '',  redirectTo:'/login', pathMatch:'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'plot',  component: PlotComponent },
  { path: 'edit',  component: EditComponent },
  { path: 'managedevice',  component: ManagedeviceComponent },
  { path: 'addevice',  component: AddeviceComponent },
  { path: 'plotmenu',  component: PlotMenuComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'mcdata',  component: McDataComponent },
  { path: 'register',  component: RegisterComponent },
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlotComponent,
    EditComponent,
    PlotMenuComponent,
    ManagedeviceComponent,
    AddeviceComponent,
    AdminComponent,
    McDataComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
