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
  plot_id: any;
  plot_name: any;
  CurrentDate: any;
  CreatedDate:any;
  constructor(private socketIoService:SocketIoService,private http:HttpClient,private httpRequestService:HttpRequestService) {

  }

  ngOnInit(): void {
    this.light = "Nan";
    this.temp = "Nan";
    this.dirt_moisure = "Nan";
    this.air_moisure = "Nan";
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1]
    //console.log(this.plot_id)
    this.httpRequestService.GetPlotByPlot(this.plot_id).subscribe((result) => {
        //console.log(result);
        this.CreatedDate = result['CreatedDate'];
        this.plot_name = result['name'];
        this.user_id = result['User_id'];
        this.CreatedDate = result['CreatedDate']
        //console.log(this.user_id)
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
  }

  

}
