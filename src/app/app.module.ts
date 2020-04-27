import {Routes,RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { PlotComponent } from './plot/plot.component';
import { EditComponent } from './edit/edit.component';
import { PlotMenuComponent } from './plot-menu/plot-menu.component';
import { ManagedeviceComponent } from './managedevice/managedevice.component';
import { AddeviceComponent } from './addevice/addevice.component';
import { AdminComponent } from './admin/admin.component';
import { McDataComponent } from './mc-data/mc-data.component';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FertconfigComponent } from './fertconfig/fertconfig.component';
import { WateringComponent } from './watering/watering.component';


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
  { path: 'fertconfig',  component: FertconfigComponent },
  { path: 'watering',  component: WateringComponent },
  
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
    RegisterComponent,
    FertconfigComponent,
    WateringComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
