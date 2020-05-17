import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-managedevice',
  templateUrl: './managedevice.component.html',
  styleUrls: ['./managedevice.component.css']
})
export class ManagedeviceComponent implements OnInit {

  url: any;
  user_id: any;
  plot: any;

  constructor(public dialog: MatDialog,private http:HttpClient) { 
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
    let getploturl = 'http://localhost:3000/plot/GetByUser/'+this.user_id;
    this.http.get(getploturl).subscribe(result =>{
      this.plot = result;
      //console.log(this.plot)
    })
    // this.plot = 
    //   [
    //     {
    //         "_id": "5ebebe41b4e04b2d34af73ff",
    //         "Controller_id": "5ebebe3cb4e04b2d34af73fe",
    //         "User_id": "5ea7eb0cca5b9657ac4be27a",
    //         "Plotconfig_id": "5ebebe41b4e04b2d34af7400",
    //         "name": "retgrgth",
    //         "CreatedDate": "1589558849838",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "5ebebe8fb4e04b2d34af7402",
    //         "Controller_id": "5ebebe89b4e04b2d34af7401",
    //         "User_id": "5ea7eb0cca5b9657ac4be27a",
    //         "Plotconfig_id": "5ebebe8fb4e04b2d34af7403",
    //         "name": "retgrgth",
    //         "CreatedDate": "1589558927567",
    //         "__v": 0
    //     }
    //   ]
    //console.log(this.plot)
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      height: '300px'
    });
  }

  ngOnInit(): void {
    
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'popup-mangedevice.html',
})
export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
