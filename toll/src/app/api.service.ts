import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private _http:Http) { }

    getTolls(){
      return this._http.get("http://www.wsdot.wa.gov/traffic/api/api/tolling?accesscode=1362087f-e048-4d10-b705-bbf06a0eef8d")
      .map(data=>data.json())
      .toPromise()
    }

    register(user){
      return this._http.post('register', user)
      .map(data=>data.json())
      .toPromise()
    }

    login(user){
      return this._http.post('login', user)
      .map(data=>data.json())
      .toPromise()
    }

    saveRoute(route){
      return this._http.post('saveRoute', route)
      .map(data=>data.json())
      .toPromise()
    }

    getUser(){
      return this._http.get('get_user')
      .map(data=>data.json())
      .toPromise()
    }
    deleteRoute(route){
      return this._http.post('deleteRoute', route)
      .map(data=>data.json())
      .toPromise()
    }
}
