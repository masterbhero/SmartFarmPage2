import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  data:any;
  postbody: any;
  obj: any;
  Header: any;

  constructor(private http: HttpClient,private router: Router,private httpRequestService: HttpRequestService) { }

  ngOnInit(): void {
  }

  LogIn(username: HTMLInputElement, password: HTMLInputElement){
    this.postbody = {
      "email": username.value,
      "pass": password.value
    }
    if(this.postbody.email != "" && this.postbody.password != ""){
      this.httpRequestService.LoginAdmin(this.postbody).subscribe(result =>{
        const status = JSON.stringify(result['status']);
        if(status == "\"success\""){
          const str = JSON.stringify(result['token']);
          localStorage.setItem('token_admin',str);
          this.router.navigate(['/admin']);
        }
        else if(status == "\"wrong password\""){
          alert("wrong password");
        }
        else if(status == "\"User does not exist\""){
          alert("User does not exist");
        }
      }) 
    }else{
      alert("ข้อมูลไม่ครบ");
    }
  }

}
