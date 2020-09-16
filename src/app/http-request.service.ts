import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private login = 'https://smartflowfarm.info/api3001/user/login';
  private verify = 'https://smartflowfarm.info/api3001/user/verify';
  private register = 'https://smartflowfarm.info/api3001/user/AddUser';
  private GetUser = 'https://smartflowfarm.info/api3001/user/GetUserAndVerify/';
  private GetPlot = 'https://smartflowfarm.info/api3001/plot/';
  private add_plot_plotconfig = 'https://smartflowfarm.info/api3001/combine/add_plot_plotconfig';
  private update_controller_plot = 'https://smartflowfarm.info/api3001/combine/update_controller_plot';
  private remove_from_user = 'https://smartflowfarm.info/api3001/combine/remove_from_user';
  private getPlotConfig = 'https://smartflowfarm.info/api3001/plotconfig/';
  private UpdatePlotConfig = 'https://smartflowfarm.info/api3001/plotconfig/';
  private Sensordata = 'https://smartflowfarm.info/api3001/sensordata/'

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

  Verify() {
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    // this.http.post(this.verify,null,options).subscribe(result => {
    //   this.result = result
    // });
    return this.http.post(this.verify,null,options);
  }

  LogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  Register(postbody: any){
    // this.http.post(this.register, postbody).subscribe(result => {
    //   this.result = result;    
    // });
    return this.http.post(this.register, postbody);
  }

  GetUserData(){
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    return this.http.get(this.GetUser,options)
  }

  GetPlotByUser(id:string){
    return this.http.get(this.GetPlot+"GetByUser/"+id);
  }

  GetPlotByPlot(id:string){
    return this.http.get(this.GetPlot+"GetPlotByID/"+id);
  }

  GetPlotConfigByPlotID(id:string){
    return this.http.get(this.getPlotConfig+"GetByPlotID/"+id);
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

  AddPlotAndPlotConfig(postbody: any){
    return this.http.post(this.add_plot_plotconfig, postbody)
  }

  UpdateControllerAndPlot(postbody: any){
    return this.http.put(this.update_controller_plot,postbody)
  }

  RemoveFromUser(postbody: any){
    return this.http.put(this.remove_from_user,postbody)
  }

  UpdatePlotConfigPlantSetting(postbody: any){
    return this.http.put(this.UpdatePlotConfig+"UpdatePlotConfigPlantSetting",postbody)
  }
}
