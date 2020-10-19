import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  UserData:any;
  Plant:any;
  Datatable:any;
  url: any;
  plant_id: any;
  user_id: any;
  harvest_day: any;

  
  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Plant = {
      name:""
    }
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plant_id = this.url[1];
    //console.log(this.plant_id);
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    this.httpRequestService.GetAdminData().subscribe(result => {
      //console.log(result)
      this.detail = result;
      this.httpRequestService.GetPlantByID(this.plant_id).subscribe((result) =>{
        //console.log(result)
        this.Plant = result[0];
        this.harvest_day = this.Plant['harvest_day']
      })
    })
  }

  UpdatePlantSetting(name:HTMLInputElement,
    StageOneDate:HTMLInputElement,StageOneDirthumid:HTMLInputElement,StageOnelight:HTMLInputElement,
    StageTwoDate:HTMLInputElement,StageTwoDirthumid:HTMLInputElement,StageTwolight:HTMLInputElement,
    StageThreeDate:HTMLInputElement,StageThreeDirthumid:HTMLInputElement,StageThreelight:HTMLInputElement,
    HarvestDay:HTMLInputElement){

    if(name.value != "" && StageOneDate.value != "" && StageOneDirthumid.value != "" && StageOnelight.value != ""
                        && StageTwoDate.value != "" && StageTwoDirthumid.value != "" && StageTwolight.value != ""
                        && StageThreeDate.value != "" && StageThreeDirthumid.value != "" && StageThreelight.value != ""){                 
      // if(parseInt(StageOneDate.value) < parseInt(StageTwoDate.value) && parseInt(StageOneDate.value) < parseInt(StageThreeDate.value) 
      //     && parseInt(StageTwoDate.value) < parseInt(StageThreeDate.value) ){ 
      if(this.CheckNumber(parseInt(StageOneDate.value)) 
      && this.CheckNumber(parseInt(StageOneDirthumid.value)) 
      && this.CheckNumber(parseInt(StageOnelight.value)) 
      && this.CheckNumber(parseInt(StageTwoDate.value)) 
      && this.CheckNumber(parseInt(StageTwoDirthumid.value))  
      && this.CheckNumber(parseInt(StageTwolight.value)) 
      && this.CheckNumber(parseInt(StageThreeDate.value))  
      && this.CheckNumber(parseInt(StageThreeDirthumid.value))  
      && this.CheckNumber(parseInt(StageThreelight.value)) ){                        
        this.postbody = {
          "name":name.value,
          "StageOneDate":parseInt(StageOneDate.value).toString(),
          "StageOneDirthumid":parseInt(StageOneDirthumid.value).toString(),
          "StageOnelight":parseInt(StageOnelight.value).toString(),
          "StageTwoDate":parseInt(StageTwoDate.value).toString(),
          "StageTwoDirthumid":parseInt(StageTwoDirthumid.value).toString(),
          "StageTwolight":parseInt(StageTwolight.value).toString(),
          "StageThreeDate":parseInt(StageThreeDate.value).toString(),
          "StageThreeDirthumid":parseInt(StageThreeDirthumid.value).toString(),
          "StageThreelight":parseInt(StageThreelight.value).toString(),
          "harvest_day":parseInt(HarvestDay.value).toString(),
          "id":this.Plant['_id']
        }
        //console.log(this.postbody)
        this.httpRequestService.UpdatePlant(this.postbody).subscribe(result => {
          //console.log(result);
          this.router.navigate(['/plantdb']);
        }) 
      }
      else{
        //alert("กรุณาใส่วันที่ให้ถูกต้อง")
        alert("ใส่แค่ตัวเลขเท่านั้น")
      }
    }
    else{
      alert("ใส่ข้อมูลให้ครบ")
    }
  }

  DateChange1(value:any){
    //console.log(value)
    let StageOneDate    = parseInt(value);
    if(this.CheckNumber(StageOneDate)){
      // console.log(isNaN(StageOneDate))
      // console.log(StageOneDate)
      this.Plant['StageOneDate'] = StageOneDate;
      let StageTwoDate    = parseInt(this.Plant['StageTwoDate']);
      let StageThreeDate  = parseInt(this.Plant['StageThreeDate']);
      this.harvest_day = StageOneDate+StageTwoDate+StageThreeDate;
    }else{
      // console.log(isNaN(StageOneDate))
      // console.log(StageOneDate)
      alert("ใส่ตัวเลขเท่านั้น");
    }
    //console.log(StageOneDate+StageTwoDate+StageThreeDate);
    //this.harvest_day = this.PlotConfig.StageOneDate
  }

  DateChange2(value:any){
    //console.log(value)
    let StageTwoDate    = parseInt(value);
    if(this.CheckNumber(StageTwoDate)){
      let StageOneDate    = parseInt(this.Plant['StageOneDate']);
      this.Plant['StageTwoDate'] = StageTwoDate;
      let StageThreeDate  = parseInt(this.Plant['StageThreeDate']);
      this.harvest_day = StageOneDate+StageTwoDate+StageThreeDate;
      //console.log(StageOneDate+StageTwoDate+StageThreeDate);
      //console.log(this.PlotConfig['StageOneDate'])
      //this.harvest_day = this.PlotConfig.StageOneDate
    }else{
      // console.log(isNaN(StageOneDate))
      // console.log(StageOneDate)
      alert("ใส่ตัวเลขเท่านั้น");
    }

  }

  DateChange3(value:any){
    //console.log(value)
    let StageThreeDate  = parseInt(value);
    if(this.CheckNumber(StageThreeDate)){
      let StageOneDate    = parseInt(this.Plant['StageOneDate']);
      let StageTwoDate    = parseInt(this.Plant['StageTwoDate']);
      this.Plant['StageThreeDate'] = StageThreeDate;
      this.harvest_day = StageOneDate+StageTwoDate+StageThreeDate;
      //console.log(StageOneDate+StageTwoDate+StageThreeDate);
      //this.harvest_day = this.PlotConfig.StageOneDate
    }else{
      // console.log(isNaN(StageOneDate))
      // console.log(StageOneDate)
      alert("ใส่ตัวเลขเท่านั้น");
    }
  }

  OnchangeCheckNumber(value:any){
    if(!this.CheckNumber(parseInt(value))){
      alert("ใส่ตัวเลขเท่านั้น");
    }
  }

  CheckNumber(Number:any){
    if(isNaN(Number)){
      console.log("isNan")
      return false
    }
    if(typeof Number !== 'number'){
      console.log("!== 'number'")
      return false
    }
    if (Number < 0) {
      console.log("< 0")
      return false
  }
    return true
  }

  Logout(){ 
    this.httpRequestService.LogOutAdmin();
  }

}
