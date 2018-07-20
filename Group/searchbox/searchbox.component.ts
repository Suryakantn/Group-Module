import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../usergroup.service';
import { Usergroup } from '../usergroup';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  usergroup:Usergroup[];
  constructor(private usergroupService:UsergroupService) { }

  ngOnInit() {
    this.usergroupService.getuserGroup().subscribe((usData)=>{
      this.usergroup=usData;
    });
  }

}
