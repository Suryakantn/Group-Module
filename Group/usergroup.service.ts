import { Injectable } from '@angular/core';
import { Usergroup } from './usergroup';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class UsergroupService {

  constructor(private http:Http) { }

  add(group) {
    var headers = new Headers();
    headers.append("Content-Type","application/json")
    console.log("group",group);
    console.log(JSON.stringify(group));
    return this.http.post(`http://localhost:3000/group/creategroup`, group,{headers:headers})
    .map((response:Response) =>response.json());
}
  showGroupinfo(){
    return this.http.get("http://localhost:3000/group/getdata")
    .map((response:Response) => response.json());
  }
  getuserGroup(){
    return this.http.get("http://localhost:3000/group/getalldata")
    .map((response:Response) => response.json());
  }
  getsubGroup(){
    return this.http.get("http://localhost:3000/group/getsub")
    .map((response:Response) => response.json());
  }
  onShowdata(fkGroupId){
    return this.http.get("http://localhost:3000/group/getallsub/"+fkGroupId)
    .map((response:Response) => response.json());
  }
}
