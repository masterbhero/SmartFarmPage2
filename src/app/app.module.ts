
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
import {MatDialogModule} from '@angular/material/dialog';
import { ChartModule } from 'angular2-chartjs';
import { DataTablesModule } from 'angular-datatables';

//page
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlotComponent } from './plot/plot.component';
import { EditComponent } from './edit/edit.component';
import { PlotMenuComponent } from './plot-menu/plot-menu.component';
import { ManagedeviceComponent, DialogOverviewExampleDialog } from './managedevice/managedevice.component';
import { AddeviceComponent } from './addevice/addevice.component';
import { AdminComponent } from './admin/admin.component';
import { McDataComponent } from './mc-data/mc-data.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './error.interceptor';
import { FertconfigComponent } from './fertconfig/fertconfig.component';
import { WateringComponent } from './Watering/Watering.component';
import { WateringdisplayComponent } from './wateringdisplay/wateringdisplay.component';
import { PlotconfigComponent } from './plotconfig/plotconfig.component';
import { PlantdbComponent } from './plantdb/plantdb.component';
import { AdminPlotComponent } from './admin-plot/admin-plot.component';
import { AdminPlotmenuComponent } from './admin-plotmenu/admin-plotmenu.component';
import { AdminManagedeviceComponent } from './admin-managedevice/admin-managedevice.component';
import { AdminAddeviceComponent } from './admin-addevice/admin-addevice.component';
import { AdminPlotconfigComponent } from './admin-plotconfig/admin-plotconfig.component';
import { AdminWateringComponent } from './admin-watering/admin-watering.component';
import { AdminFertconfigComponent } from './admin-fertconfig/admin-fertconfig.component';
import { AdminWateringdisplayComponent } from './admin-wateringdisplay/admin-wateringdisplay.component';
import { MoistureMonitorComponent } from './moisture-monitor/moisture-monitor.component';
import { PlotmenuStartComponent } from './plotmenu-start/plotmenu-start.component';
import { AddControllerComponent } from './add-controller/add-controller.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserdbComponent } from './userdb/userdb.component';
import { InactiveUserComponent } from './inactive-user/inactive-user.component';
import { InactivePlantsComponent } from './inactive-plants/inactive-plants.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { PlantConfigComponent } from './plant-config/plant-config.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { EditPlantComponent } from './edit-plant/edit-plant.component';

const Routes: Routes = [
  { path: '',  redirectTo:'/login', pathMatch:'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'plot',  component: PlotComponent },
  { path: 'edit',  component: EditComponent },
  { path: 'managedevice',  component: ManagedeviceComponent },
  { path: 'addevice',  component: AddeviceComponent },
  { path: 'plotmenu',  component: PlotMenuComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'fertconfig',  component: FertconfigComponent },
  { path: 'watering',  component: WateringComponent },
  //{ path: 'wateringdisplay',  component: WateringdisplayComponent },
  { path: 'plotconfig',  component: PlotconfigComponent },
  //{ path: 'abc',  component: PlotconfigComponent },
  //{ path: 'plotmenustart',  component: PlotmenuStartComponent },
 
  /////admin/////

  { path: 'admin',  component: AdminComponent },
  { path: 'admin-login',  component: AdminLoginComponent },
  { path: 'mcdata',  component: McDataComponent },
  { path: 'plantdb',  component: PlantdbComponent },
  { path: 'inactive-plantdb',  component: InactivePlantsComponent },
  { path: 'userdb',  component: UserdbComponent },
  { path: 'inactive-userdb',  component: InactiveUserComponent },
  { path: 'admin-edit-user',  component: AdminEditUserComponent },
  { path: 'plant-config',  component: PlantConfigComponent },
  { path: 'plant-edit',  component: EditPlantComponent },
  { path: 'plant-add',  component: AddPlantComponent },
  { path: 'adminPlot',  component: AdminPlotComponent },
  { path: 'adminPlotmenu',  component: AdminPlotmenuComponent },
  { path: 'adminManagedevice',  component: AdminManagedeviceComponent },
  { path: 'adminAddevice',  component: AdminAddeviceComponent },
  { path: 'adminPlotconfig',  component:  AdminPlotconfigComponent },
  { path: 'adminWatering',  component:  AdminWateringComponent },
  { path: 'adminFertconfig',  component:  AdminFertconfigComponent },
  { path: 'adminWateringdisplay',  component:  AdminWateringdisplayComponent },
  { path: 'Addcontroller',  component:  AddControllerComponent },

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
    WateringComponent,
    WateringdisplayComponent,
    PlotconfigComponent,
    PlantdbComponent,
    DialogOverviewExampleDialog,
    AdminPlotComponent,
    AdminPlotmenuComponent,
    AdminManagedeviceComponent,
    AdminAddeviceComponent,
    AdminPlotconfigComponent,
    AdminWateringComponent,
    AdminFertconfigComponent,
    AdminWateringdisplayComponent,
    MoistureMonitorComponent,
    PlotmenuStartComponent,
    AddControllerComponent,
    AdminLoginComponent,
    UserdbComponent,
    InactiveUserComponent,
    InactivePlantsComponent,
    AdminEditUserComponent,
    PlantConfigComponent,
    AddPlantComponent,
    EditPlantComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ChartModule,
    DataTablesModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
