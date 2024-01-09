//Server side code
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000

//create db connection
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db"
});

// using deps
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

//Route that handles login logic
app.post('/login', (req, res) =>{
     username = req.body.username;
    var password = req.body.password;

    var sql = "SELECT password FROM users WHERE username = ? ";

    con.connect(function(err) {
        if (err) throw err;

        con.query(sql,[username], function (err, result) {
          if (err) throw err;

          var storedPassword = result[0].password;
          
          if(password.localeCompare(storedPassword) == 0) res.status(200).send('Signup successful');
          else res.status(400).send('Incorrect username/password');
    
        });
      });
})

//Route that handles signup logic
app.post('/signup', (req, res) =>{
  console.log("test");
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;

    console.log(username) 
    console.log(email) 
    console.log(password) 
    console.log(confirm_password) 

    if(password.localeCompare(confirm_password) != 0){
        console.log('mismatch')
        res.status(400).send('Password mismatch');
        return;
    }

    var sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";

    con.query(sql, [username, password, email], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });

    res.status(200).send('Account created successfully');
})

//Route that handles become mentor page
app.post('/become_mentor', (req, res) =>{
  var skill = req.body.skill;
  
  var sql = "UPDATE users SET skills = ? where username = ?"

  con.query(sql, [skill, username], function (err, result) {
    if (err) throw err;
    console.log("Updated skill ", skill, " for user ", username);
    });

    res.status(200).send('Skill updated successfully');

})

//Route that handles find mentor page
app.post('/find_mentor', (req, res) =>{
 skill = req.body.skill;
  
  var sql = "SELECT * from users where skills = ?"
  results = "Here are the available mentors for mentoring in " + skill + ":<br><br>";

  con.query(sql ,[skill],function (err, result) {
    if (err) throw err;
    
    for (let i = 0; i < result.length; i++){
      results += result[i].username + ": " + result[i].email + "<br><br>";
    }

    res.status(200).send(results);
    });

})

//Route that handles mentor details page
app.post('/mentor_details', (req, res) =>{ 
     res.status(200).send(results);
     });
 

//Start server on a specified port
app.listen(port, ()=>{
  console.log(`Server is runing on port ${port}`)
})