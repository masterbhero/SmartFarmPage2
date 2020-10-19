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
  user_id: any;

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

    if(this.postbody.email != "" && this.postbody.password != ""){
      this.httpRequestService.Login(this.postbody).subscribe(result =>{
        const status = JSON.stringify(result['status']);
        if(status == "\"success\""){
          const str = JSON.stringify(result['token']);
          localStorage.setItem('token',str);
          this.user_id = result['user'];
          //console.log(result['user'])
          this.httpRequestService.GetPublicIP().subscribe((result) => {
            //console.log(result)
            this.postbody = {
              user_id : this.user_id,
              username : username.value,
              public_ip : result['ip']
            }
            //console.log(this.postbody)
            this.httpRequestService.AddLoginLog(this.postbody).subscribe((result) => {
              this.router.navigate(['/plot']);
            })
          })
        }
        else if(status == "\"wrong password\""){
          //alert("wrong password");
          alert("wrong username or password");
        }
        else if(status == "\"User does not exist\""){
          //alert("User does not exist");
          alert("wrong username or password");
        }
      }) 
    }else{
      alert("ข้อมูลไม่ครบ");
    }


    
  }
}
