import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-watering',
  templateUrl: './watering.component.html',
  styleUrls: ['./watering.component.css']
})
export class WateringComponent implements OnInit {

  controller_id: any;
  plot_id: any;
  url: any;
  testdata: any;
  testvalue: any;
  testDate: any;
  one: any;

  typeChart: any;
  dataChart: any;
  optionsChart: any;
  constructor(private httpRequestService:HttpRequestService) { }

  ngOnInit(): void {
    this.one = 100;
    this.SetVar();
    this.httpRequestService.GetSensorDataByID(this.controller_id).subscribe((result) =>{
      //console.log(result)
      this.SetArray(result);
      this.SetChart();
    })

  }

  SetChart(){
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: this.testDate,
      datasets: [
        {
          label: "ความชื้น",
          data: this.testvalue,
        }
      ]
    };
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [{
          ticks: {
          }
        }], 
        xAxes: [{
          ticks: {
             userCallback: function(item, index) {
                if (!(index % 864)) return item;
             },
             autoSkip: false
          }
       }]
    }
    };
  }

  SetVar(){
    this.url = window.location.href;
    this.url = this.url.split("=", 3); 
    this.plot_id = this.url[1];
    this.plot_id = this.plot_id.split(";",2);
    this.plot_id = this.plot_id[0];
    this.controller_id = this.url[2];
  }

  SetArray(RawData){
    this.testvalue = [];
    this.testDate = [];
    this.testdata = RawData;
    for (var i = 0; i < Object.keys(this.testdata).length; i++) {
      var counter = this.testdata[i];
      //console.log(counter);
      this.testvalue.push(counter.dirthumid); 
      this.testDate.push(this.convert(parseInt(counter.CreatedDate)));     
      //console.log(counter.value);
      //console.log(this.convert(counter.CreatedDate));
    }
    //console.log(this.convert(parseInt("1596843699721"))); 
    //this.convert(parseInt("1596843699721"))
    //console.log(this.testvalue);
    //console.log(this.testDate);
  }

  convert(t) {
    //console.log(t)
    const dt = new Date(t);
    //console.log(dt)
    const hr = dt.getHours();
    //console.log(hr)
    const m = "0" + dt.getMinutes();
    //console.log(m)
    
    return hr + ':' + m.substr(-2)
  }

}
