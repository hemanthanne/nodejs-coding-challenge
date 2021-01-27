
var Request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs')
let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

/**
 * Create a new user
 * @route CREATE /users
 */

exports.AddUser = (request, response, next) => {
    if(request.body){
        users.push(request.body)
        response.status(200).send("User Added successfully...");
                            response.end();
    }else{
        response.status(401).send("Please send proper data..");
                            response.end();
    }
    
}

/**
 * Update an existing user
 * @route UPDATE /users
 */

exports.UpdateUser = (request, response, next) => {


    users.map(item => {
        if (item.email === request.query["currentEmail"]) {
            item.email = request.query["newEmail"];
        } else {
          return item;
        }
    });


    response.status(200).send("updated successfully..");
    response.end();
}

/**
 * Delete an existing user
 * @route DELETE /users
 */

exports.DeleteUser = (request, response, next) => {
let newUser = users.filter(x=>x.email !== request.query["email"]);
if(newUser.length > 0){
    users = [];
    users = newUser;
    response.status(200).send("user deleted successfully...");
    response.end();
}else{
    response.status(401).send("Record not found..");
                        response.end();
}
}

/**
 * Get all Available users
 * @route GET /users
 */

exports.GetUsers = (request, response, next) => {
    let sortedusers = [];
    if(request.query["sortBy"] === "email"){
        if(request.query["sortDirection"] === "ascending"){
            
            sortedusers = users.sort(compareValues('email'));
        }else{
            sortedusers = users.sort(compareValues('email', 'desc'));
        }
    }else if(request.query["email"] !== ""){
        sortedusers =  users.filter(x=>x.email === request.query["email"]);
    }
   
    response.status(200).send(sortedusers);
    response.end();
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }