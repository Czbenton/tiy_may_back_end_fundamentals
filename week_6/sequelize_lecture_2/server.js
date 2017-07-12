const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const models = require("./models");

const app = express();

const person = models.persons.build(
     {name:'Tanner', phone:5551212, zip:12345, course:'courseID'}
);

person.save().then( function(newPerson) {
    console.log('name is: ',newPerson.name, ' zip = ', newPerson.zip);
});

app.listen(3000, function(){
  console.log('Listening on port: ', 3000);
});