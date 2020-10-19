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
  watering: any;
  Date1: any;
  Date2: any;
  multiply: any;

  typeChart: any;
  dataChart: any;
  optionsChart: any;

  constructor(private httpRequestService:HttpRequestService) { }
  //1601398800000
  //1601485200000
  ngOnInit(): void {
    this.httpRequestService.GetUserData().subscribe(result => {
      this.SetVar();
      let NewDate2 = new Date().getTime();
      //console.log(new Date())
      //console.log(new Date().toISOString())
      //console.log(NewDate2.toString())
      let NewDate1 = NewDate2 - 1*60*60*1000;
      //console.log(NewDate2.toString())
      this.httpRequestService.GetSensorDataByIDAndTimeRange(this.controller_id,NewDate1.toString(),NewDate2.toString()).subscribe((result) =>{
        //console.log(this.controller_id)
        //console.log(NewDate1.toString())
        //console.log(NewDate2.toString())
        //console.log(result)
        this.SetArray(result);
        this.SetChart();
      })
    })
  }

  CallGraph(){
    this.typeChart = null;
    this.dataChart = null;
    this.optionsChart = null;
    //this.multiply = 1;
    //let timestamp1 = Date.now() - 3600000*this.multiply;
    //let timestamp2 = Date.now();
    //console.log(timestamp1)
    //console.log(timestamp2)
    this.httpRequestService.GetSensorDataByIDAndTimeRange(this.controller_id,this.Date1.toString(),this.Date2.toString()).subscribe((result) =>{
      //console.log(this.controller_id)
      //console.log(this.Date1.toString())
      //console.log(this.Date2.toString())
      //console.log(result)
      this.SetArray(result);
      this.SetChart();
    })
  }

  SetChart(){
    var x = this.multiply;
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      backgroundColor: "transparent",
      labels: this.testDate,
      datasets: [
        {
          label: "ความแห้ง",
          data: this.testvalue,
          borderColor: "#34c9eb",
          //backgroundColor: "rgb(255,230, 255)",
        },
        {
          label: "การรดน้ำ",
          data: this.watering,
          borderColor: "#ff0000",
          //backgroundColor: "#a8e0ed",
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
          // ticks: {
          //    userCallback: function(item, index) {
          //       if (!(index % (x*1))) return item;
          //    },
          //    autoSkip: false
          // }
       }]
      },
      elements: {
        point:{
            radius: 2
        }
      }
    };
  }

  GetDate(DateIn: HTMLInputElement,time1: HTMLInputElement,time2: HTMLInputElement){
    //console.log("start :"+DateIn.value+": end")
    //console.log(time1.value < time2.value)
    if(DateIn.value != "" && time1.value != "nan" && time2.value != "nan"){
      //console.log((parseInt(time1.value) < parseInt(time2.value)))
      //console.log(time2.value == "0")
      if( (parseInt(time1.value) < parseInt(time2.value)) || (time2.value == "0") ){
        this.Date1 = [];
        this.Date2 = [];

        let time1s = this.makeHour(time1.value);
        let time2s = this.makeHour(time2.value);

        this.Date1 = DateIn.value+"T"+time1s;
        this.Date2 = DateIn.value+"T"+time2s;
        
        var newDate1 = new Date(this.Date1);
        var newDate2 = new Date(this.Date2);

        this.Date1 = newDate1.getTime();
        this.Date2 = newDate2.getTime();
        
        this.multiply = parseInt(time2.value) - parseInt(time1.value);

        if(time2.value == "0" ){
          this.Date2 += 86400000;
          this.multiply = (this.Date2 - this.Date1)/3600000;
        }

        //console.log(new Date(this.Date1));
        //console.log(this.Date1);

        //console.log(new Date(this.Date2));
        //console.log(this.Date2);

        //console.log(this.multiply);

        this.CallGraph();

      }
      else{
        alert("กรุณาใส่เวลาให้ถูกต้อง 2");
      }

    }
    else if(DateIn.value == ""){
      alert("กรุณาใส่วันที่");
    }
    else if(time1.value >= time2.value || time1.value == "nan" || time2.value == "nan"){
      alert("กรุณาใส่เวลาให้ถูกต้อง 1");
    }
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
    //console.log(RawData)
    this.testvalue = [];
    this.testDate = [];
    this.watering = [];
    this.testdata = RawData;
    for (var i = 0; i < Object.keys(this.testdata).length; i++) {
      var counter = this.testdata[i];
      //console.log(counter);
      var dirthumid = parseInt(counter.dirthumid)/10;
      this.testvalue.push(dirthumid); 
      //this.testvalue.push((dirthumid+0)*(0-100)/(1023-0)+100); 
      //this.testvalue.push((parseInt(counter.dirthumid)+0)*(0-100)/(1023-0)+100); 	
      this.watering.push(parseInt(counter.waterpump)*50);
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

  makeHour(hour: any){
    let hourformat;
    if(hour < 10){
      hourformat = "0"+hour+":00:00";
    }else{
      hourformat = hour+":00:00";
    }
    return hourformat;
  }

}
