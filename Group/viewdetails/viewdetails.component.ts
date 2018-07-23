import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsergroupService } from '../usergroup.service';
import { Usergroup } from '../usergroup';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {
  groupId:string;
  usergroup:Usergroup[];
  keydata:Usergroup[];
  constructor(private route:ActivatedRoute,private usergroupService:UsergroupService) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['GroupId'];
    this.usergroupService.getGroupData(this.groupId).subscribe((usData)=>{
      this.usergroup=usData;
  });
  this.usergroupService.getKeyData(this.groupId).subscribe((usData)=>{
    this.keydata=usData;
});
}

}
