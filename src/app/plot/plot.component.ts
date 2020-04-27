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

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token'),observe: 'result'});
    //https://smartflowfarm.xyz/api3000/user/verify
    this.http.post('http://localhost:3000/user/verify', this.postbody,this.Header).subscribe(result => {
      this.error = JSON.stringify(result);
      this.error = catchError(this.handleError);
      const status = JSON.stringify(result['status']);
      localStorage.setItem('debug',JSON.stringify(result));
      if(status == "\"Forbidden\""){
        this.router.navigate(['/login']);
      }

    });
  }

  handleError(error) {
    this.error = "enter handle error";
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return errorMessage;
}

}
