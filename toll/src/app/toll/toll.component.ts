import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Route } from '../route';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-toll',
  templateUrl: './toll.component.html',
  styleUrls: ['./toll.component.css']
})
export class TollComponent implements OnInit {
  user = new User()
  route = new Route()
  save = false
  tolls={}
  currToll = {}
  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
    this._apiService.getUser()
    .then(user => {this.user=user; console.log("got user comp")})
    .catch(() => {console.log("get user fail comop"); this._router.navigate(['/'])})

    this._apiService.getTolls()
    .then(tolls => {this.tolls=tolls;console.log("got tolls comp")})
    .catch(() => {console.log("get tolls fail comp")})
  }
  calculate(){
    if(this.save){
      this._apiService.saveRoute(this.route)
      .then( () => {console.log("comp route saved")})
      .catch( () => {console.log("route save fail")})
    }
    this.user.routes.push(this.route)
    this.route = new Route();
  }
  delete(idx){
    let route = this.user.routes[idx]; 
    let status = confirm("Are you sure you want to delete " + route.name+ "?")
    if(status){
      this._apiService.deleteRoute(route)
      .then( () => {console.log("route deleted"); this.user.routes.splice(idx, 1)})
      .catch( () => {console.log("route delete fail")})
    }
  }
}
