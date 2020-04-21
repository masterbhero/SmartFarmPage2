import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any;
  postbody: any;
  obj: any;

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

    this.http.post('http://localhost:3000/user/login', this.postbody).subscribe(result => {
      const status = JSON.stringify(result['status']);
      if(status == 'success'){
        const str = JSON.stringify(result['token']);
        localStorage.setItem('token',str);
      }
      else if(status == 'wrong password'){

      }
      else if(status == 'User does not exist'){

      }
      //this.obj = JSON.parse(str);
    });

  }
}
