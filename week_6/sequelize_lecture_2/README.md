# sequelize_lecture
This is a NodeJS Express app using the ORM 'Sequelize'

0. create app
1. create Express
2. add dependencies (modules)
3. add a route
4. create a db
5. add middleware for the dependencies
6. add HTML People view
7. add FORM tag to collect:  Name, Phone, ZipCode

- const models = require("./models");

- const person = models.persons.build({name:'John', phone:5551212, zip:37076};

- person.save().then( function(newPerson) {
    console.log(newPerson);
});