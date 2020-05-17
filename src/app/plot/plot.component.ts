import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService
    ) { 
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
      //console.log(result['_id']);
      let getploturl = 'http://localhost:3000/plot/GetByUser/'+result['_id'];
      this.http.get(getploturl).subscribe(result =>{
        //console.log(result);
        this.plot = result;
      })
    })
  }

  Logout(){ 
    this.httpRequestService.LogOut();
  }
}
