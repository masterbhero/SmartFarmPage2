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

  constructor(private http: HttpClient,private router: Router,private httpRequestService: HttpRequestService) { }

  ngOnInit(): void {
    this.httpRequestService.Verify();
  }

  Logout(){
    this.httpRequestService.LogOut();
  }
}
