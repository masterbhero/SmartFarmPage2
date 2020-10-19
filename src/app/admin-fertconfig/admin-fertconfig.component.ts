import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-admin-fertconfig',
  templateUrl: './admin-fertconfig.component.html',
  styleUrls: ['./admin-fertconfig.component.css']
})
export class AdminFertconfigComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  UserData:any;
  PlotConfig:any;
  Plants:any;
  Datatable:any;
  url: any;
  plot_id: any;
  user_id: any;
  plotconfig_id: any;
  fertilizercycle: any;
  fertilizercycle_last: any;
  fertilizercycle_next: any;

  
  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.PlotConfig = {
      name:""
    }
    this.url = window.location.href;
    this.url = this.url.split("=", 3); 
    let url1 = this.url[1].split(";",2);
    this.plot_id = url1[0];
    this.user_id = this.url[2];
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    this.httpRequestService.GetAdminData().subscribe(result => {
      //console.log(result)
      this.detail = result;
      this.fertilizercycle = "";
      this.fertilizercycle_last = "";
      this.fertilizercycle_next = "";
      this.httpRequestService.GetPlotConfigByPlotID(this.plot_id).subscribe((result) => {
      //console.log(result)
      this.PlotConfig = result;
      this.plotconfig_id = result['_id'];
      this.fertilizercycle = result['fertilizercycle'];
      this.fertilizercycle_last = result['fertilizercycle_last'];
      this.fertilizercycle_next = result['fertilizercycle_next']
      //console.log(this.fertilizercycle)
    })

    })
  }

  UpdateFertConfig(fertilizercycle:any){
    //console.log(fertilizercycle.value);
    let newtime = new Date(this.fertilizercycle_last).getTime() + fertilizercycle.value*24*60*60*1000
    //console.log(this.fertilizercycle_last)
    //console.log(new Date(newtime).toISOString())
    let newDate = new Date(newtime).toISOString();
    this.postbody = {
      id:this.plotconfig_id,
      fertilizercycle:fertilizercycle.value,
      fertilizercycle_last:this.fertilizercycle_last,
      fertilizercycle_next:newDate
    }
    //console.log(this.postbody);
    this.httpRequestService.UpdateFertConfig(this.postbody).subscribe((result) =>{
      this.router.navigate(['/admin-edit-user',{id:this.user_id}]);
    })
  }

  Logout(){ 
    this.httpRequestService.LogOutAdmin();
  }

}
