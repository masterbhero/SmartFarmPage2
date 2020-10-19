import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { post } from 'jquery';

class Login {
  constructor(
      public email: string,
      public password: string
  ) { }
}


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  // private login = 'http://localhost:3000/user/login';
  // private verify = 'http://localhost:3000/user/verify';
  // private register = 'http://localhost:3000/user/AddUser';
  // private GetUser = 'http://localhost:3000/user/GetUserAndVerify/';
  // private GetPlot = 'http://localhost:3000/plot/';
  // private add_plot_plotconfig = 'http://localhost:3000/combine/add_plot_plotconfig';
  // private update_controller_plot = 'http://localhost:3000/combine/update_controller_plot';
  // private getPlotConfig = 'http://localhost:3000/plotconfig/';
  // private UpdatePlotConfig = 'http://localhost:3000/plotconfig/';

  // private login = 'https://smartflowfarm.xyz/api3000/user/login';
  // private verify = 'https://smartflowfarm.xyz/api3000/user/verify';
  // private register = 'https://smartflowfarm.xyz/api3000/user/AddUser';
  // private GetUser = 'https://smartflowfarm.xyz/api3000/user/GetUserAndVerify/';
  // private GetPlot = 'https://smartflowfarm.xyz/api3000/plot/';
  // private add_plot_plotconfig = 'https://smartflowfarm.xyz/api3000/combine/add_plot_plotconfig';
  // private update_controller_plot = 'https://smartflowfarm.xyz/api3000/combine/update_controller_plot';
  // private getPlotConfig = 'https://smartflowfarm.xyz/api3000/plotconfig/';
  // private UpdatePlotConfig = 'https://smartflowfarm.xyz/api3000/plotconfig/';

  private admin = 'https://smartflowfarm.info/api3001/admin/';
  private login = 'https://smartflowfarm.info/api3001/user/login';
  private verify = 'https://smartflowfarm.info/api3001/user/verify';
  private register = 'https://smartflowfarm.info/api3001/user/AddUser';
  private user = 'https://smartflowfarm.info/api3001/user/';
  private GetUser = 'https://smartflowfarm.info/api3001/user/GetUserAndVerify/';
  private GetPlot = 'https://smartflowfarm.info/api3001/plot/';
  private add_plot_plotconfig = 'https://smartflowfarm.info/api3001/combine/add_plot_plotconfig';
  private update_controller_plot = 'https://smartflowfarm.info/api3001/combine/update_controller_plot';
  private remove_from_user = 'https://smartflowfarm.info/api3001/combine/remove_from_user';
  private PlotConfig = 'https://smartflowfarm.info/api3001/plotconfig/';
  private UpdatePlotConfig = 'https://smartflowfarm.info/api3001/plotconfig/';
  private Sensordata = 'https://smartflowfarm.info/api3001/sensordata/';
  private Plant = 'https://smartflowfarm.info/api3001/plant/';
  private LoginLog = 'https://smartflowfarm.info/api3001/login';
  private fert_log = 'https://smartflowfarm.info/api3001/fert';

  // private login = 'https://smartflowfarm.info/api3000/user/login';
  // private verify = 'https://smartflowfarm.info/api3000/user/verify';
  // private register = 'https://smartflowfarm.info/api3000/user/AddUser';
  // private GetUser = 'https://smartflowfarm.info/api3000/user/GetUserAndVerify/';
  // private GetPlot = 'https://smartflowfarm.info/api3000/plot/';
  // private add_plot_plotconfig = 'https://smartflowfarm.info/api3000/combine/add_plot_plotconfig';
  // private update_controller_plot = 'https://smartflowfarm.info/api3000/combine/update_controller_plot';
  // private getPlotConfig = 'https://smartflowfarm.info/api3000/plotconfig/';
  // private UpdatePlotConfig = 'https://smartflowfarm.info/api3000/plotconfig/';

  // private login_prod = 'https://smartflowfarm.xyz/api3000/user/login';
  // private verify_prod = 'https://smartflowfarm.xyz/api3000/user/verify';
  // private register_pord = 'https://smartflowfarm.xyz/api3000/user/AddUser';
  // private GetUser_pord = 'https://smartflowfarm.xyz/api3000/user/';
  // private GetPlot_pord = 'https://smartflowfarm.xyz/api3000/plot/GetByUser/';
  // private add_plot_plotconfig_prod = 'https://smartflowfarm.xyz/api3000/combine/add_plot_plotconfig';
  // private update_controller_plot_prod = 'https://smartflowfarm.xyz/api3000/combine/update_controller_plot';
  // private getPlotConfig_pord = 'https://smartflowfarm.xyz/api3000/plotconfig/';
  // private UpdatePlotConfig_prod = 'https://smartflowfarm.xyz/api3000/plotconfig/';

  result: any;

  constructor(private http: HttpClient,private router:Router) { }
  
  Login(postbody: any){
    // this.http.post(this.login, postbody).subscribe(result => {
    //   this.result = result;    
    // });
    return this.http.post(this.login, postbody);
  }

  LoginAdmin(postbody: any){
    // this.http.post(this.login, postbody).subscribe(result => {
    //   this.result = result;    
    // });
    return this.http.post(this.admin+"login", postbody);
  }

  Verify() {
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    // this.http.post(this.verify,null,options).subscribe(result => {
    //   this.result = result
    // });
    return this.http.post(this.verify,null,options);
  }

  VerifyAdmin() {
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    // this.http.post(this.verify,null,options).subscribe(result => {
    //   this.result = result
    // });
    return this.http.post(this.admin+"/",null,options);
  }

  LogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  LogOutAdmin(){
    localStorage.removeItem('token_admin');
    this.router.navigate(['/admin-login']);
  }

  Register(postbody: any){
    // this.http.post(this.register, postbody).subscribe(result => {
    //   this.result = result;    
    // });
    return this.http.post(this.register, postbody);
  }

  AddLoginLog(postbody:any){
    return this.http.post(this.LoginLog+"/Addlogin",postbody)
  }

  GetAllActiveUser(){
    return this.http.get(this.user+"GetActive");
  }

  GetFertHistory(id:String){
    return this.http.get(this.fert_log+"/GetByPlotconfig_id/"+id);
  }

  GetAllInactiveUser(){
    return this.http.get(this.user+"GetInactive");
  }

  GetUserData(){
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    return this.http.get(this.GetUser,options)
  }

  GetAdminData(){
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    return this.http.get(this.admin+"GetAdminAndVerify",options)
  }

  GetUserByID(id:string){
    return this.http.get(this.user+"GetUserByID/"+id);
  }

  GetPublicIP(){
    return this.http.get("https://api.ipify.org/?format=json");  
  }

  GetPlotByUser(id:string){
    return this.http.get(this.GetPlot+"GetByUser/"+id);
  }

  GetPlotByPlot(id:string){
    return this.http.get(this.GetPlot+"GetPlotByID/"+id);
  }

  GetPlotConfigByPlotID(id:string){
    return this.http.get(this.PlotConfig+"GetByPlotID/"+id);
  }

  GetAllPlant(){
    return this.http.get(this.Plant+"GetAll/");
  }

  GetAllActivePlant(){
    return this.http.get(this.Plant+"GetAllActive/");
  }
  
  GetAllInactivePlant(){
    return this.http.get(this.Plant+"GetAllInactive/");
  }

  GetSensorDataByID(id:string){
    return this.http.get(this.Sensordata+"GetDataByID/"+id);
  }

  GetSensorDataByIDAndTime(id:string,time:string){
    return this.http.get(this.Sensordata+"GetDataByIDAndTime/"+id+"/"+time);
  }

  GetSensorDataByIDAndTimeRange(id:string,time1:string,time2:string){
    return this.http.get(this.Sensordata+"GetDataByIDAndTimeRange/"+id+"/"+time1+"/"+time2);
  }

  GetLastedSensordataByID(Controller_Id:string){
    return this.http.get(this.Sensordata+"GetLastedRecordByID/"+Controller_Id);
  }

  GetPlantByID(id:string){
    return this.http.get(this.Plant+"GetByID/"+id);
  }

  AddPlotAndPlotConfig(postbody: any){
    return this.http.post(this.add_plot_plotconfig, postbody);
  }

  AddPlant(postbody: any){
    return this.http.post(this.Plant+"AddPlants/",postbody);
  }

  UpdateWaterpumpStatus(postbody:any){
    return this.http.put(this.PlotConfig+"Update_Waterpump_status/",postbody);
  }

  UpdateSlanStatus(postbody:any){
    return this.http.put(this.PlotConfig+"Update_Slan_status/",postbody);
  }

  UpdateControllerAndPlot(postbody: any){
    return this.http.put(this.update_controller_plot,postbody);
  }

  RemoveFromUser(postbody: any){
    return this.http.put(this.remove_from_user,postbody);
  }

  UpdatePlotConfigPlantSetting(postbody: any){
    return this.http.put(this.UpdatePlotConfig+"UpdatePlotConfigPlantSetting",postbody);
  }

  UpdateUser(postbody:any){
    return this.http.put(this.user+"UpdateUser",postbody);
  }

  Harvest(postbody:any){
    return this.http.put(this.PlotConfig+"Harvest/",postbody);
  }

  UpdateFertConfig(postbody:any){
    return this.http.put(this.PlotConfig+"Update_fert_config/",postbody);
  }

  SetUserInactive(postbody:any){
    return this.http.put(this.user+"InactiveUser",postbody);
  }

  SetUserActive(postbody:any){
    return this.http.put(this.user+"ActiveUser",postbody);
  }

  SetPlantInactive(postbody:any){
    return this.http.put(this.Plant+"/InactivePlant",postbody);
  }

  SetPlantActive(postbody:any){
    return this.http.put(this.Plant+"/ActivePlant",postbody);
  }

  UpdatePlant(postbody:any){
    return this.http.put(this.Plant+"/UpdatePlant",postbody);
  }

  UpdateInstaWater(postbody:any){
    return this.http.put(this.PlotConfig+"/Update_InstaWater/",postbody)
  }

}
