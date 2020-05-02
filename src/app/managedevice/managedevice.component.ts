import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managedevice',
  templateUrl: './managedevice.component.html',
  styleUrls: ['./managedevice.component.css']
})
export class ManagedeviceComponent implements OnInit {

  url: any;
  user_id: any;
  plot: any;

  constructor() { 
    this.url = window.location.href;
    this.plot = {
      name:['plot1'],
      _id:['someid']
    }
  }

  ngOnInit(): void {
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
  }

}
