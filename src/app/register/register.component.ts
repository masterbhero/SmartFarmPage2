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
    console.log(this.postbody)
    console.log(this.validateEmail(this.postbody.email))
    if( this.IsComplete(this.postbody) && 
      ( this.postbody.password == this.postbody.confirmpassword ) &&
      ( this.validateEmail(this.postbody.email) ) ){
        this.httpRequestService.Register(this.postbody).subscribe(result =>{
        const status = JSON.stringify(result['status']);

        if(status == "\"success\""){
          this.router.navigate(['/login']);
        }
        else if(status == "\"user already exist\""){
          alert("user already exist")
        }
        else{
          alert("result")
        }
      }) 
    }else if(!(this.IsComplete(this.postbody))){
      alert(this.whatMissing(this.postbody))
    }else if(this.postbody.password != this.postbody.confirmpassword){
      alert("password และ confirmpassword ไม่ตรงกัน")
    }else if(!this.validateEmail((this.postbody.email))){
      alert("email ไม่ถูกต้อง")
    }

  }

  IsComplete(SArray : any){
    let complete = 1;
    
    Object.entries(SArray).forEach(element => {
      if(element[1] == ""){
        complete = 0;
      }
    });
    //console.log(!complete)
    return complete;
  }

  whatMissing(SArray : any){
    let missing = "ข้อมูลไม่ครบ ";

    Object.entries(SArray).forEach(element => {
      if(element[1] == ""){
        missing = missing+element[0]+" ";
      }
    });

    return missing;
  }

  validateEmail(email : any){
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
