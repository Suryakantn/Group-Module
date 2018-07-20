import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../usergroup.service';
import { Usergroup } from '../usergroup';

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit {
  usergroup:Usergroup[];
  constructor(private usergroupService:UsergroupService) { }

  ngOnInit() {
    this.usergroupService.getuserGroup().subscribe((usData)=>{
      this.usergroup=usData;
    });
  }

}
