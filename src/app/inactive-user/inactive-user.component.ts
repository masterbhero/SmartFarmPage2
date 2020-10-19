import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {
  
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
      this.httpRequestService.GetAllInactiveUser().subscribe((result) =>{
        //console.log(result)
        this.UserData = result;
        this.dtTrigger.next();
      })
    })
  }

  EditUser(id:any,AllowEdit:any){
    if(AllowEdit.value == "true"){

    }else{
      alert("user doesn't allow edit")
    }
  }

  SetToActive(id:any){
    this.postbody = {
      id:id.value
    }
    this.httpRequestService.SetUserActive(this.postbody).subscribe((result) => {
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
