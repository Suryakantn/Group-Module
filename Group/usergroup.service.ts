import { Injectable } from '@angular/core';
import { Usergroup } from './usergroup';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
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
  onSearch(data)
  {  
    var headers = new Headers();
    headers.append("Content-Type","application/json")
    console.log("data",data);
    console.log(JSON.stringify(data));
    var data1={"search":data};
    return this.http.post(`http://localhost:3000/getSearchItem`, data1,{headers:headers})
    .map((response:Response) =>response.json());
  }
  getGroupData(fkGroupId){
    return this.http.get("http://localhost:3000/group/getallgroupdata/"+fkGroupId)
    .map((response:Response) => response.json());
  }
  getKeyData(fkGroupId){
    return this.http.get("http://localhost:3000/group/getallkey/"+fkGroupId)
    .map((response:Response) => response.json());
  }
}
