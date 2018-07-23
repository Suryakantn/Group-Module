import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../usergroup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  public collection=[];
  user:any= {};
  public isLoaded=true;
  constructor( private router:Router,private usergroupservice:UsergroupService) {

    
   }

  ngOnInit() {
    this.onSearch();
  }

  onSearch()
  {
    var searchData=this.user.search.trim();
    this.usergroupservice.onSearch(searchData).subscribe(data=>{
   
     if(data[0].flag==0)
     {
       alert("Group Not Found");
     }
     else if(data[0].flag==1)
     {
      this.user=data[1];

      
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
