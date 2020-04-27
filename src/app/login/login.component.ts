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

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') != '' && localStorage.getItem('token') != null){
      this.router.navigate(['/plot']);
    }
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement){
    //this.data = "login";
    this.postbody = {
      "email": username.value,
      "password": password.value
    }
    this.data = this.postbody['email'];    
    //https://smartflowfarm.xyz/api3000/user/login
    //http://localhost:3000/user/login
    this.http.post('https://smartflowfarm.xyz/api3000/user/login', this.postbody).subscribe(result => {

      const status = JSON.stringify(result['status']);
      //this.data = status;
      if(status == "\"success\""){
        //this.data = "success";
        const str = JSON.stringify(result['token']);
        this.data = str;

        localStorage.setItem('token',str);

        this.router.navigate(['/plot']);

      }
      else if(status == "\"wrong password\""){

      }
      else if(status == "\"User does not exist\""){

      }
      //this.obj = JSON.parse(str);
    });

  }
}

// , {
//   headers: new HttpHeaders({
//     'Authorization': 'my-auth-token',
//     'x-header': 'x-value'
//   })
// } 