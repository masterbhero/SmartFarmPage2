import { HttpRequestService } from './../http-request.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-plot-menu',
  templateUrl: './plot-menu.component.html',
  styleUrls: ['./plot-menu.component.css']
})
export class PlotMenuComponent implements OnInit {

  light:any;
  temp:any;
  dirt_moisure:any;
  air_moisure:any;
  user_id:any;
  url: any;
  controller_id: any;
  plot_id: any;
  plot_name: any;
  CurrentDate: any;
  CreatedDate:any;
  HarvestDay:any;
  Lastet_Harvest:any;
  constructor(private socketIoService:SocketIoService,private http:HttpClient,private httpRequestService:HttpRequestService) {

  }

  ngOnInit(): void {
    this.light = "Nan";
    this.temp = "Nan";
    this.dirt_moisure = "Nan";
    this.air_moisure = "Nan";
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1];
    //console.log(this.plot_id)
    this.httpRequestService.GetPlotByPlot(this.plot_id).subscribe((result) => {
        //console.log(result);
        this.controller_id = result['Controller_id'];
        this.CreatedDate = result['CreatedDate'];
        this.plot_name = result['name'];
        this.user_id = result['User_id'];
        this.CreatedDate = result['CreatedDate']
        
        //console.log(this.user_id)
        this.httpRequestService.GetPlotConfigByPlotID(result['_id']).subscribe((result) =>{
          //console.log(result)
          this.Lastet_Harvest = result['Lastest_harvest_date'];
          this.HarvestDay = new Date(result['Lastest_harvest_date']).getTime() + (result['harvest_day']*24*60*60*1000);
          this.httpRequestService.GetLastedSensordataByID(this.controller_id).subscribe((result) => {
            this.light = result[0]['light'];
            this.temp = result[0]['temp'];    
            this.dirt_moisure = result[0]['dirthumid'];
            this.air_moisure = result[0]['airhumid'];
            this.CurrentDate = result[0]['CreatedDate']; 
            this.socketIoService.listen('chat message',this.user_id).subscribe((data) => {
              //this.socketIoService.listen('join room',this.user_id).subscribe((data) => {
                //console.log(data)
                if(data['sender'] == this.url[1]){  
                  this.light = data['light'];
                  this.temp = data['temp'];    
                  this.dirt_moisure = data['dirt'];
                  this.air_moisure = data['air'];
                  this.CurrentDate = new Date();
                }
              })          
          })
        })
    })
  }

  disconnected(){
    this.socketIoService.disconnect();
  }

  ngOnDestroy(){
    this.socketIoService.disconnect();
  }

}
