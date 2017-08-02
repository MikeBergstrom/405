import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User()
  registerError = false;
  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
  }
  register(){
    console.log("register function component", this.user)
    this._apiService.register(this.user)
    .then(() => {console.log("register success in component"); this._router.navigate(['toll'])})
    .catch(err => {console.log("register fail component", err); this.registerError = true})
  }

}
