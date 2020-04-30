import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any;
  postbody: any;
  obj: any;
  Header: any;

  constructor(private http: HttpClient,private router: Router,private httpRequestService: HttpRequestService) { }

  ngOnInit() {
    if(localStorage.getItem('token') != '' && localStorage.getItem('token') != null){
      this.router.navigate(['/plot']);
    }
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement){
    this.postbody = {
      "email": username.value,
      "password": password.value
    }

    let result = this.httpRequestService.Login(this.postbody);    

    const status = JSON.stringify(result['status']);
    if(status == "\"success\""){
      const str = JSON.stringify(result['token']);
      localStorage.setItem('token',str);
      this.router.navigate(['/plot']);
    }
    else if(status == "\"wrong password\""){

    }
    else if(status == "\"User does not exist\""){

    }
  }
}
