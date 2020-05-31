import { Router } from '@angular/router';
import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plotconfig',
  templateUrl: './plotconfig.component.html',
  styleUrls: ['./plotconfig.component.css']
})
export class PlotconfigComponent implements OnInit {

  url: any;
  plot_id: any;
  postbody: any;
  PlotConfig: any;
  constructor(private httpRequestService:HttpRequestService,private router:Router) { 
  }

  ngOnInit(): void {
    this.PlotConfig = {
      name:"",
      dirthumid:"",
      light:""
    }
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1]
    this.httpRequestService.GetPlotConfigByPlotID(this.plot_id).subscribe(result =>{
      console.log(result); 
      this.PlotConfig = result;
    })
  }

  UpdatePlotConfigPlantSetting(name:HTMLInputElement,dirthumid:HTMLInputElement,light:HTMLInputElement){

    if(name.value != "" && dirthumid.value != "" && light.value != ""){

    this.postbody = {
      "name":name.value,
      "dirthumid":dirthumid.value,
      "light":light.value,
      "id":this.PlotConfig['_id']
    }

    this.httpRequestService.UpdatePlotConfigPlantSetting(this.postbody).subscribe(result => {
      console.log(result);
      this.router.navigate(['/plotmenu',{id:this.plot_id}]);
    })

    }
    else{
      alert("กรุณาใส่ข้อมูลให้ครบ")
    }
  }

}
