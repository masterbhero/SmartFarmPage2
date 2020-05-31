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

  dirt_moisure:any;
  air_moisure:any;
  light:any;
  user_id:any;
  url: any;
  plot_id: any;
  constructor(private socketIoService:SocketIoService,private http:HttpClient,private httpRequestService:HttpRequestService) {

  }

  ngOnInit(): void {
    this.dirt_moisure = "Nan";
    this.air_moisure = "Nan";
    this.light = "Nan";
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1]
    //console.log(this.plot_id)
    this.httpRequestService.GetPlotByPlot(this.plot_id).subscribe((result) => {
        console.log(result);
        this.user_id = result['User_id'];
        console.log(this.user_id)
        this.socketIoService.listen('chat message',this.user_id).subscribe((data) => {
          //console.log(data['sender'])
          if(data['sender'] == this.url[1]){      
            this.dirt_moisure = data['dirt'];
            this.air_moisure = data['air'];
            this.light = data['light'];
          }
        })
    })
  }

}
