import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-inactive-plants',
  templateUrl: './inactive-plants.component.html',
  styleUrls: ['./inactive-plants.component.css']
})
export class InactivePlantsComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  PlantData:any;
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
      this.httpRequestService.GetAllInactivePlant().subscribe((result) =>{
        //console.log(result)
        this.PlantData = result;
        this.dtTrigger.next();
      })
    })
  }

  SetToActive(id:any){
    //console.log(id.value)
    this.postbody = {
      id:id.value
    }
    this.httpRequestService.SetPlantActive(this.postbody).subscribe((result) => {
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
