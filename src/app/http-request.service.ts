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

  private login = 'http://localhost:3000/user/login';
  private verify = 'http://localhost:3000/user/verify';
  private register = 'http://localhost:3000/user/AddUser';
  private GetUser = 'http://localhost:3000/user/GetUserAndVerify/';
  private GetPlot = 'http://localhost:3000/plot/';
  private add_plot_plotconfig = 'http://localhost:3000/combine/add_plot_plotconfig';
  private update_controller_plot = 'http://localhost:3000/combine/update_controller_plot';
  private getPlotConfig = 'http://localhost:3000/plotconfig/';
  private UpdatePlotConfig = 'http://localhost:3000/plotconfig/';

  private login_prod = 'https://smartflowfarm.xyz/api3000/user/login';
  private verify_prod = 'https://smartflowfarm.xyz/api3000/user/verify';
  private register_pord = 'https://smartflowfarm.xyz/api3000/user/AddUser';
  private GetUser_pord = 'https://smartflowfarm.xyz/api3000/user/';
  private GetPlot_pord = 'https://smartflowfarm.xyz/api3000/plot/GetByUser/';
  private add_plot_plotconfig_pord = 'https://smartflowfarm.xyz/api3000/combine/add_plot_plotconfig';
  private update_controller_plot_pord = 'https://smartflowfarm.xyz/api3000/combine/update_controller_plot';

  result: any;

  constructor(private http: HttpClient,private router:Router) { }
  
  Login(postbody: any){
    this.http.post(this.login, postbody).subscribe(result => {
      this.result = result;    
    });
    return this.result;
  }

  Verify() {
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    this.http.post(this.verify,null,options).subscribe(result => {
      this.result = result
    });
    return this.result;
  }

  LogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  Register(postbody: any){
    this.http.post(this.register, postbody).subscribe(result => {
      this.result = result;    
    });
    return this.result;
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

  AddPlotAndPlotConfig(postbody: any){
    return this.http.post(this.add_plot_plotconfig, postbody)
  }

  UpdateControllerAndPlot(postbody: any){
    return this.http.put(this.update_controller_plot,postbody)
  }

  UpdatePlotConfigPlantSetting(postbody: any){
    return this.http.put(this.UpdatePlotConfig+"UpdatePlotConfigPlantSetting",postbody)
  }
}
