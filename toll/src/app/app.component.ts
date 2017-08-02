import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _apiService: ApiService, private _router:Router){}
 
  getToll(){
    this._apiService.getTolls()
    .then( data => {console.log(data[0]['CurrentToll'])})
    .catch((err) => {console.log("error from get toll component"), err})
  }
}
