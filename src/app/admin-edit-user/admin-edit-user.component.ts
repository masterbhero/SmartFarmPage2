import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  UserData:any;
  PlotData:any;
  Datatable:any;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  url: any;
  user_id: any;

  
  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.UserData = {
      firstname:"",
      lastname:""
    }
    // this.PlotData = {
    //   name:"",
    //   id:""
    // }
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    this.httpRequestService.GetAdminData().subscribe(result => {
      //console.log(result)
      this.detail = result;
      this.httpRequestService.GetUserByID(this.user_id).subscribe((result) =>{
        //console.log(result)
        this.UserData = result[0];
        this.httpRequestService.GetPlotByUser(this.user_id).subscribe((result) => {
          //console.log(result)
          this.PlotData = result;
          //console.log(this.PlotData);
          this.dtTrigger.next();
        })
      })
    })
  }

  EditPlotConfig(id:any,user_id:any){
    this.router.navigate(['/adminPlotconfig',{id:id.value,user_id:user_id.value}]);
  }

  EditFertConfig(id:any,user_id:any){
    this.router.navigate(['/adminFertconfig',{id:id.value,user_id:user_id.value}]);
  }

  Logout(){ 
    this.httpRequestService.LogOutAdmin();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
