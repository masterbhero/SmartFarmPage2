import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  postbody: any;
  Header: any;
  error: any;
  detail: any;
  UserData:any;
  PlotConfig:any;
  Plant:any;  // plant data
  Plants:any; //list of Plants
  harvest_day:any;
  Datatable:any;
  url: any;
  plot_id: any;
  user_id: any;

  
  constructor(private http: HttpClient,
    private router: Router,
    private httpRequestService: HttpRequestService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Plant = {
      "name":"",
      "StageOneDate":"0",
      "StageOneDirthumid":"",
      "StageOnelight":"",
      "StageTwoDate":"0",
      "StageTwoDirthumid":"",
      "StageTwolight":"",
      "StageThreeDate":"0",
      "StageThreeDirthumid":"",
      "StageThreelight":"",
      "harvest_day":""
    }
    this.harvest_day = "";
    this.httpRequestService.Verify();
    let Header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token_admin')});
    let options = { headers: Header };
    this.httpRequestService.GetAdminData().subscribe(result => {
      //console.log(result)
      this.detail = result;
    })
  }

  AddPlant(name:HTMLInputElement,
    StageOneDate:HTMLInputElement,StageOneDirthumid:HTMLInputElement,StageOnelight:HTMLInputElement,
    StageTwoDate:HTMLInputElement,StageTwoDirthumid:HTMLInputElement,StageTwolight:HTMLInputElement,
    StageThreeDate:HTMLInputElement,StageThreeDirthumid:HTMLInputElement,StageThreelight:HTMLInputElement,
    HarvestDay:HTMLInputElement){

    if(name.value != "" && StageOneDate.value != "" && StageOneDirthumid.value != "" && StageOnelight.value != ""
                        && StageTwoDate.value != "" && StageTwoDirthumid.value != "" && StageTwolight.value != ""
                        && StageThreeDate.value != "" && StageThreeDirthumid.value != "" && StageThreelight.value != ""){
      if(parseInt(StageOneDate.value) < parseInt(StageTwoDate.value) && parseInt(StageOneDate.value) < parseInt(StageThreeDate.value) 
          && parseInt(StageTwoDate.value) < parseInt(StageThreeDate.value) ){                   
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
          "harvest_day":parseInt(HarvestDay.value).toString()
        }
        //console.log(this.postbody)
        this.httpRequestService.AddPlant(this.postbody).subscribe(result => {
          //console.log(result);
          this.router.navigate(['/plantdb']);
        })
      }
      else{
        alert("กรุณาใส่วันที่ให้ถูกต้อง")
      }
    }
    else{
      alert("กรุณาใส่ข้อมูลให้ครบ")
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
