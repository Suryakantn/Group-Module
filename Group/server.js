const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
var app = express();
var email 	= require("emailjs/email");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var generator = require('generate-password');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var connection = mysql.createConnection({
  host: "localhost", // 127.0.0.1
  user: "root",
  password: "surya",
  database: "vcore"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connection accepted");
});

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

  
const server = app.listen(3000, "localhost", () => {
  console.log("server listening || host =", connection.config.host, "|| database = ", connection.config.database);
});

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('./template', { root: __dirname })
})


  app.post('/register/checkemail', (req, res) => {
    var emailid=req.body.email;
    console.log("emailid",emailid);
    connection.query("select password from user where email = ?",[emailid], (err, result) => {
      if (err) throw err;
      var x=JSON.parse(JSON.stringify(result));
      console.log("x",x);
      if(x.length<=0){
        res.send({
          "code":100,
          "success":""
        });
      }
      else{
        res.send({
          "code":200,
          "success":"Email already Exists "
        });
      }
      
       })
  });

  app.post('/register/insert', (req, res) => {
  var id=0;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var emailid=req.body.email;
  var gender=req.body.gender;
  var password = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase:true
}); 
var data=[];
data.push(firstname);
data.push(emailid);
data.push(password);
  var encryptedString = cryptr.encrypt(password);
  var mobile=req.body.mobile;
  var decryptedString = cryptr.decrypt(encryptedString);
  console.log("password",password);
  console.log("encry",encryptedString);
  console.log("decy",decryptedString);
  var date=new Date();
    connection.query("insert into user (id,firstname,lastname,email,gender,password,mobile,date) values(?,?,?,?,?,?,?,?)",
    [id,firstname,lastname,emailid,gender,encryptedString,mobile,date],
     (err, results) => {
      if (err) throw err;
    })
    console.log("in serverss  go ahed ");
 var server   = email.server.connect({
    user:    "nirmalsuryakant@gmail.com", 
    password:"ghirtkytdcgqvema", 
    host:    "smtp.gmail.com", 
    ssl:     true,
    port:465
 });

 server.send({
    text:    "i hope this works", 
    from:    "nirmalsuryakant@gmail.com", 
    to:      emailid,
    subject: "Registration Form",
    attachment: 
    [
       {data:"<html><h1>Hello "+firstname+"</h2><h1>Registration successfull</h1><br><h1>Your password is "+password +"</h1><br><a href='http://127.0.0.1:4200/login'>click here to continue</a> </html>", alternative:true},
       //{ data:emailbody, alternative:true}
    ]
 }, function(err, message) { 
   if (err) throw err;
   res.send({
    "code":20,
    "success":"You have been registered..Check your email for Password"
      });
  });
  });
  
  app.get('/tabs', (req, res) =>{
    var xml ="example.xml";
    fs.readFile(xml, 'utf8',function(err,text){
      parser.parseString(text,function(error,results){
        var user=results['userdata']['user'];
         res.json(user);
      });
    });
  });
  app.get('/subtabs', (req, res) =>{
    var xml ="example.xml";
    fs.readFile(xml, 'utf8',function(err,text){
      parser.parseString(text,function(error,results){
        var user=results['userdata']['user'];
         res.json(user);
      });
    });
  });

  app.post('/login', (req, res) => {
    var email=req.body.email;
    if(email==undefined){
      res.send({
        "code":300,
        "success":"Email should not be empty"
          });
      }
      else{
    connection.query("select id,firstname,lastname,email,gender,password,mobile,date from user where email = ?",[email], (err, results) => {
      if (err) throw err;
      var x=JSON.parse(JSON.stringify(results));
      var pass=x[0].password;
    var password1 = cryptr.decrypt(pass);
    var password2 = req.body.password;
    console.log("email",email);
    console.log("user password",password2);
    console.log("db password",password1);
    console.log("first name",x[0].firstname);
    console.log("ID",x[0].id);
    var userid=x[0].id;
    var firstname=x[0].firstname;
    if(password2==password1){   
       res.send({
        "userid":userid,
        "firstname":firstname,
        "code":200,
        "success":"login sucessfull"
          });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
        }
    })
  }
  });
  app.get('/group/getdata', (req, res) => {
    connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME FROM vc_user_group where GROUP_LEVEL=0", (err, results) => {
      if (err) throw err;
      //console.log(results);
      var x=JSON.parse(JSON.stringify(results));
      var GROUP_ID=x[0].GROUP_ID;
      var GROUP_NAME=x[0].GROUP_NAME;
      var GROUP_LEVEL=x[0].GROUP_LEVEL;
      var PARENT_GROUP=x[0].PARENT_GROUP;
      var FQN_NAME=x[0].FQN_NAME;
      res.send({
        "GroupData":results,
        "GROUP_ID":GROUP_ID,
        "GROUP_NAME":GROUP_NAME,
        "GROUP_LEVEL":GROUP_LEVEL,
        "PARENT_GROUP":PARENT_GROUP,
        "FQN_NAME":FQN_NAME
          });
    })
  });
  app.get('/group/getsub', (req, res) => {
    connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME FROM vc_user_group where PARENT_GROUP >0 ", (err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.get('/group/getallsub/:fkid', (req, res) => {
    connection.query("SELECT GROUP_ID,GROUP_LEVEL,PARENT_GROUP,FQN_NAME FROM vc_user_group where GROUP_ID=? ",[req.params.fkid], (err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.get('/group/getalldata', (req, res) => {
    connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME FROM vc_user_group ", (err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.post('/group/creategroup', (req, res) => {
    var GROUP_ID=0;
    var SITE_ID=1;
    var GROUP_NAME=req.body.GROUP_NAME;
    var G_LEVEL=req.body.GROUP_LEVEL;
    var GROUP_LEVEL=parseInt(G_LEVEL,10)+1;
    var PARENT_GROUP=req.body.PARENT_GROUP;
    var CREATION_TIME=new Date();
    var CREATED_BY=req.body.userid;
    var LAST_UPDATED_BY=req.body.userid;
    var DESCRIPTION=req.body.DESCRIPTION;
    var FQN=req.body.FQN_NAME;
    var FQN_NAME=FQN+"/"+GROUP_NAME;

    var COUNTRY_ID=req.body.COUNTRY_ID;
    var STATE_ID=req.body.STATE_ID;
    var CITY_ID=req.body.CITY_ID;
    var ADDRESS1=req.body.ADDRESS1;
    var ADDRESS2=req.body.ADDRESS2;
    var ZIP=req.body.ZIP;
    var PHONE=req.body.PHONE;
    var FAX=req.body.FAX;
    var EMAIL=req.body.EMAIL;
    var WEB=req.body.WEB;
    var LANGUAGE_ID=req.body.LANGUAGE_ID;
    var CURRENCY_ID=req.body.CURRENCY_ID;
    var ORGANIZATION_TYPE=req.body.ORGANIZATION_TYPE;

    var SEQUENCE=1;
    var namearray = req.body.namearray;
    var phonearray = req.body.phonearray;
    var emailarray = req.body.emailarray;
    var faxarray = req.body.faxarray;
    var mobilearray = req.body.mobilearray;
    var desiarray = req.body.desiarray;
   
    console.log("table1...."+GROUP_LEVEL+".."+PARENT_GROUP+".."+FQN_NAME+".."+CREATED_BY+".."+DESCRIPTION+".."+GROUP_NAME);
    console.log("table2...."+COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE);
    var usergroupsql="insert into vc_user_group (SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME) values(?,?,?,?,?,?,?,?,?)";
    var groupdetailsql="insert into USER_GROUP_DETAILS (GROUP_ID,COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var groupkeysql="insert into USER_GROUP_KEY_CONTACTS (GROUP_ID,SEQUENCE,CONTACT_NAME,CONTACT_PHONE,CONTACT_EMAIL,CONTACT_FAX,CONTACT_MOBILE,CONTACT_DESIGNATION) values ?";
    connection.query(usergroupsql,[SITE_ID ,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME], (err, results) => {
      if (err) throw err;
   
    })
    connection.query("select GROUP_ID from vc_user_group where GROUP_NAME=?", GROUP_NAME,(err, gid) => {
      console.log("groupid",gid)
      var x=JSON.parse(JSON.stringify(gid));
      var groupId=x[0].GROUP_ID;
      console.log("groupId",groupId)
     connection.query(groupdetailsql,[groupId,COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE], (err, results) => {
         if (err) throw err;
     
       })
       var values=[ ];
       for(var i=0;i<namearray.length;i++){
        var arr=[groupId,1,namearray[i],phonearray[i],emailarray[i],faxarray[i],mobilearray[i],desiarray[i]]
         values.push(arr);
     }
     console.log("values",values);
    connection.query(groupkeysql,[values], (err, results) => {
        if (err) throw err;
        res.send({
          "code":204,
          "success":"Group created Successfully!"
            });
       })
      })
   
  });

  app.post('/register/createpass/:email', (req, res) => {
    var password=req.body.password;
    connection.query("UPDATE user set password=? where email = ?",[password,req.params.email], (err, results) => {
      if (err) throw err;
      res.json(results);
   
    })
  });

 
  app.get('/user/updatedata', (req, res) => {
    connection.query("SELECT * FROM user", (err, results) => {
      if (err) throw err;
      var dat=results;
      res.json(results);

    })
  });
  app.get('/user/get/:id', (req, res) => {
    connection.query("select id,firstname,lastname,email,gender,mobile,date from user where id = ?",[req.params.id], (err, results) => {
      if (err) throw err;
      //var data=results;
      res.json(results);
    })
  });