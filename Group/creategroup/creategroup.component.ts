import { Component, OnInit } from '@angular/core';
import { Usergroup } from '../usergroup';
import { Router } from '@angular/router';
import { UsergroupService } from '../usergroup.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})

export class CreategroupComponent implements OnInit {
  usergroup:Usergroup[];
  group:any={}
  keycont:any={}
  userid:string;
  groupId:string;
  GROUP_NAME:string;
  grouplevel:string;
  parentgroup:string;
  fqnname:string;
  id:string;
  public keyList=[];
  public user: any = {};

  constructor(private router:Router,private usergroupservice:UsergroupService) { }
  
  ngOnInit() {
    this.userid= localStorage.getItem('id');
    this.usergroupservice.showGroupinfo().subscribe((userdata)=>{
    this.usergroup=userdata.GroupData;
      this.id=this.userid;
      this.GROUP_NAME=userdata.GROUP_NAME;
      this.grouplevel=userdata.GROUP_LEVEL;
      this.parentgroup=userdata.GROUP_ID;
      this.fqnname=userdata.FQN_NAME;

    });
    this.onData();
  }

  onData(){
    this.keyList.push({
    "CONTACT_NAME":"",
    "CONTACT_PHONE":"",
    "CONTACT_EMAIL":"",
    "CONTACT_FAX":"",
    "CONTACT_MOBILE":"",
    "CONTACT_DESIGNATION":""
    });
    
  }

  addFormfield(){
    this.keyList.push({
    "CONTACT_NAME":"",
    "CONTACT_PHONE":"",
    "CONTACT_EMAIL":"",
    "CONTACT_FAX":"",
    "CONTACT_MOBILE":"",
    "CONTACT_DESIGNATION":""
    }); 
    }
    removeElement()
    {
    this.keyList.pop();
    }

 
  onSubmit(){ 
     // console.log(this.group);
      var PARENT_GROUP = ((document.getElementById('PARENT_GROUP') as HTMLInputElement).value);
      var FQN_NAME = ((document.getElementById('FQN_NAME') as HTMLInputElement).value);
      var GROUP_LEVEL = ((document.getElementById('GROUP_LEVEL') as HTMLInputElement).value);
      var GROUP_NAME = ((document.getElementById('GROUP_NAME') as HTMLInputElement).value);
      var DESCRIPTION = ((document.getElementById('DESCRIPTION') as HTMLInputElement).value);
      var userid=localStorage.getItem('id');
      var COUNTRY_ID = ((document.getElementById('COUNTRY_ID') as HTMLInputElement).value);
      var STATE_ID = ((document.getElementById('STATE_ID') as HTMLInputElement).value);
      var CITY_ID = ((document.getElementById('CITY_ID') as HTMLInputElement).value);
      var ADDRESS1 = ((document.getElementById('ADDRESS1') as HTMLInputElement).value);
      var ADDRESS2 = ((document.getElementById('ADDRESS2') as HTMLInputElement).value);
      var ZIP = ((document.getElementById('ZIP') as HTMLInputElement).value);
      var PHONE = ((document.getElementById('PHONE') as HTMLInputElement).value);
      var FAX = ((document.getElementById('FAX') as HTMLInputElement).value);
      var EMAIL = ((document.getElementById('EMAIL') as HTMLInputElement).value);
      var WEB = ((document.getElementById('WEB') as HTMLInputElement).value);
      var LANGUAGE_ID = ((document.getElementById('LANGUAGE_ID') as HTMLInputElement).value);
      var CURRENCY_ID = ((document.getElementById('CURRENCY_ID') as HTMLInputElement).value);
      var ORGANIZATION_TYPE = ((document.getElementById('ORGANIZATION_TYPE') as HTMLInputElement).value);
      var namearray = [];
      var phonearray = [];
      var emailarray = [];
      var faxarray = [];
      var mobilearray = [];
      var desiarray = [];

      for(var i=0;i<this.keyList.length;i++){
      var CONTACT_NAME = ((document.getElementById('CONTACT_NAME'+i) as HTMLInputElement).value);
      var CONTACT_PHONE = ((document.getElementById('CONTACT_PHONE'+i) as HTMLInputElement).value);
      var CONTACT_EMAIL = ((document.getElementById('CONTACT_EMAIL'+i) as HTMLInputElement).value);
      var CONTACT_FAX = ((document.getElementById('CONTACT_FAX'+i) as HTMLInputElement).value);
      var CONTACT_MOBILE = ((document.getElementById('CONTACT_MOBILE'+i) as HTMLInputElement).value);
      var CONTACT_DESIGNATION = ((document.getElementById('CONTACT_DESIGNATION'+i) as HTMLInputElement).value);
      namearray.push(CONTACT_NAME);
      phonearray.push(CONTACT_PHONE);
      emailarray.push(CONTACT_EMAIL);
      faxarray.push(CONTACT_FAX);
      mobilearray.push(CONTACT_MOBILE);
      desiarray.push(CONTACT_DESIGNATION);

  }
      console.log(namearray);
      console.log(phonearray);
      console.log(emailarray);
      

    var ugroup={
    PARENT_GROUP:PARENT_GROUP,FQN_NAME:FQN_NAME,GROUP_LEVEL:GROUP_LEVEL,GROUP_NAME:GROUP_NAME,DESCRIPTION:DESCRIPTION,userid:userid,
    COUNTRY_ID:COUNTRY_ID,STATE_ID:STATE_ID,CITY_ID:CITY_ID,ADDRESS1:ADDRESS1,ADDRESS2:ADDRESS2,ZIP:ZIP,PHONE:PHONE,FAX:FAX,
    EMAIL:EMAIL,WEB:WEB,LANGUAGE_ID:LANGUAGE_ID,CURRENCY_ID:CURRENCY_ID,ORGANIZATION_TYPE:ORGANIZATION_TYPE,mobilearray:mobilearray,
    namearray:namearray,phonearray:phonearray,emailarray:emailarray,faxarray:faxarray,desiarray:desiarray
   }
      console.log(ugroup);
      this.usergroupservice.add(ugroup) 
      .subscribe((data) => {
        alert(data.success)
        this.router.navigate(['/showdata']);
      });
   
  }
    
}
