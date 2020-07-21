import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient
    ,private router: Router
    ,private httpRequestService: HttpRequestService
    ,private fb:FormBuilder) { }

  postbody: any;
  regis_form: FormGroup;

  ngOnInit(): void {
    this.regis_form = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: ''
    })
  }

  Register(){
    this.postbody = {
      firstname: this.regis_form.value['firstname'],
      lastname: this.regis_form.value['lastname'],
      email: this.regis_form.value['email'],
      password: this.regis_form.value['password'],
      confirmpassword: this.regis_form.value['confirmpassword']
    }

    this.httpRequestService.Register(this.postbody).subscribe(result =>{

      const status = JSON.stringify(result['status']);

      if(status == "\"success\""){
        this.router.navigate(['/login']);
      }
      else if(status == "\"user already exist\""){
  
      }
      else{
  
      }
    }) 

  }

}
