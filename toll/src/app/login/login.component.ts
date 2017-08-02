import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  loginError = false;
  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
  }
  login(){
    console.log("login function component", this.user)
    this._apiService.login(this.user)
    .then(() => {console.log("login success in component"); this._router.navigate(['toll'])})
    .catch(err => {console.log("login fail component", err); this.loginError = true})
  }
}
