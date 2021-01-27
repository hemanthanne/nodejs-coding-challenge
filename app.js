const express = require("express");
const bodyParser = require("body-parser");
const routerName = require("./Routes/routes.js");
const app = express();




app.use(bodyParser.json());
 let port =  6090;


 app.use(function(req, res, next) {

   res.setHeader('Access-Control-Allow-Origin', '*');

 //Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware

   if (req.method === "OPTIONS") {
       return res.status(200).end();
  }

  return next();
 });



app.use('/Users',routerName);



app.listen(port,function(){
  console.log("Service is up and running on port number" +port);
});

