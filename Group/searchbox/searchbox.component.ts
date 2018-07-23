import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../usergroup.service';
import { Usergroup } from '../usergroup';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  usergroup:Usergroup[];
  userdata:Usergroup[];
  public collection=[];
  user:any= {};
  public isLoaded=true;
  constructor(private usergroupService:UsergroupService) { }

  ngOnInit() {
    this.usergroupService.getuserGroup().subscribe((usData)=>{
      this.usergroup=usData;
    });
  }

  onSearch()
  {
    var search2 = ((document.getElementById('search2') as HTMLInputElement).value);
    var searchData=search2.trim();
    this.usergroupService.onSearch(searchData).subscribe(data=>{
   
     if(data[0].flag==0)
     {
       alert("Group Not Found");
     }
     else if(data[0].flag==1)
     {
      this.userdata=data[1];

      
      for(let i=0;i<100;i++)
    {
      this.collection.push(i);
    }
      

      this.isLoaded=false;
     
     }
     else{
       alert("something wrong");
     }

    })


  }


}
