import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private httpRequestService: HttpRequestService) { }

  postbody: any;

  ngOnInit(): void {
  }

  Register(){
    
    this.httpRequestService.Register(this.postbody);
  }

}
