import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-fertconfig',
  templateUrl: './fertconfig.component.html',
  styleUrls: ['./fertconfig.component.css']
})
export class FertconfigComponent implements OnInit {

  url: any;
  plot_id: any;
  plotconfig_id: any;
  PlotConfig: any;
  postbody: any;
  fertilizercycle: any;
  fertilizercycle_last: any;
  fertilizercycle_next: any;

  constructor(private httpRequestService:HttpRequestService,private router:Router) { }

  ngOnInit(): void {
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1];
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
      this.router.navigate(['/plotmenu',{id:this.plot_id}]);
    })
  }
}
