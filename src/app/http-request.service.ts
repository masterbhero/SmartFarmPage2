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

  private login_prod = 'https://smartflowfarm.xyz/api3000/user/login';
  private verify_prod = 'https://smartflowfarm.xyz/api3000/user/verify';
  private register_pord = 'https://smartflowfarm.xyz/api3000/user/AddUser';
  private GetUser_pord = 'https://smartflowfarm.xyz/api3000/user/';

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

  async GetUserData(){
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    this.http.get(this.GetUser,options).subscribe(result => {
      console.log("result is : "+result);
      this.result = result;
      console.log("this.result is : "+this.result);
      return this.result;
    })
  }
}
