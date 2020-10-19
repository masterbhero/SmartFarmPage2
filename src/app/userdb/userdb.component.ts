import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-userdb',
  templateUrl: './userdb.component.html',
  styleUrls: ['./userdb.component.css']
})
export class UserdbComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  UserData:any;
  Datatable:any;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    this.httpRequestService.GetAdminData().subscribe(result => {
      //console.log(result)
      this.detail = result;
      this.httpRequestService.GetAllActiveUser().subscribe((result) =>{
        //console.log(result)
        this.UserData = result;
        this.dtTrigger.next();
      })
    })
  }

  EditUser(id:any,AllowEdit:any){
    if(AllowEdit.value == "true"){
      this.router.navigate(['/admin-edit-user',{id:id.value}]);
    }else{
      alert("user doesn't allow edit")
    }
  }

  SetToInactive(id:any){
    this.postbody = {
      id:id.value
    }
    this.httpRequestService.SetUserInactive(this.postbody).subscribe((result) => {
      //console.log(result);
      window.location.reload();
    })
  }

  Logout(){ 
    this.httpRequestService.LogOutAdmin();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
