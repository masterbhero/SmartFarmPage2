import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any;

  constructor() { }

  ngOnInit() {
  }

  SavelocalStorage() {
    localStorage.setItem('key','Boongtest');
  }

  GetlocalStorage() {
    this.data = localStorage.getItem('key');
  }

  ResetlocalStorage() {
    localStorage.removeItem('key');
  }

}
