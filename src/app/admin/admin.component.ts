import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  plot: any;

  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService) { }

  ngOnInit(): void {
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    this.httpRequestService.GetAdminData().subscribe(result => {
      //console.log(result)
      this.detail = result;
    })
  }

  Logout(){ 
    this.httpRequestService.LogOutAdmin();
  }

}
