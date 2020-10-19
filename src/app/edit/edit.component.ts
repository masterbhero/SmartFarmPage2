import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  firstname:any;
  lastname:any;
  AllowEdit:any;
  Udata:any;
  postbody:any;
  url: any;
  user_id: any;

  constructor(private httpRequestService:HttpRequestService) { }

  ngOnInit(): void {
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
    this.Udata = {
      firstname:"",
      lastname:""
    }
    this.httpRequestService.GetUserData().subscribe((result) => {
      //console.log(result);
      this.Udata = result;
      this.AllowEdit = Boolean(JSON.parse(result["AllowEdit"]));
      //console.log(this.AllowEdit)
    })
  }

  UpdateUser(firstname:any,lastname:any){
    this.postbody = {
      id : this.user_id,
      firstname : firstname.value,
      lastname : lastname.value,
      AllowEdit : String(this.AllowEdit)
    }
    //console.log(this.postbody)
    this.httpRequestService.UpdateUser(this.postbody).subscribe((result) => {
      window.location.reload();
    })
  }

}
