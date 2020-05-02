import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  plot: any;

  constructor(private http: HttpClient,private router: Router,private httpRequestService: HttpRequestService) { 
    this.plot = {
      name:['plot1'],
      _id:['someid']
    }
    this.detail = {
      firstname:[],
      lastname:[]
    }
  }

  ngOnInit(){
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')});
    let options = { headers: Header };
    this.http.get('http://localhost:3000/user/GetUserAndVerify/',options).subscribe(result => {
      this.detail = result;
    })
    
    
  }

  Logout(){ 
    this.httpRequestService.LogOut();
  }
}
