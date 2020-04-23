import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  SavelocalStorage() {
    localStorage.setItem('key','Boongtest');
  }

  GetlocalStorage() {
    this.data = localStorage.getItem('key');
  }

  ResetlocalStorage() {
    localStorage.removeItem('key');
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement){
    this.postbody = {
      "email": username.value,
      "password": password.value
    }
    //https://smartflowfarm.xyz/api3000/user/login
    //http://localhost:3000/user/login
    this.http.post('https://smartflowfarm.xyz/api3000/user/login', this.postbody).subscribe(result => {

      const status = JSON.stringify(result['status']);

      if(status == "\"success\""){

        const str = JSON.stringify(result['token']);
        this.data = str;

        localStorage.setItem('token',str);
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