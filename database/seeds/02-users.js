const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users')
    .then(function () {
      return knex('users').insert([
        {username: 'Kevin Smith', email: 'totallyrealemail@gmail.com', password: bcrypt.hashSync('1234', 10), role:'instructor'},
        {username: 'Quentin Tarantino', email: 'ingloriousbasterd@hotmail.com', password: bcrypt.hashSync('4321', 10), role:'student'},
        {username: 'Robert Rodriguez', email: 'iheartsalmahayek@yahoo.com', password: bcrypt.hashSync('12345', 10), role:'student'},
        {username: 'Sam Raimi', email: 'notsoevildead@aol.com', password: bcrypt.hashSync('54321', 10), role:'student'},
        {username: 'David Fincher', email: 'whatzinthebox@nuetronmail.com', password: bcrypt.hashSync('654321', 10), role:'student'},
        {username: 'Michael Bay', email: 'thingsgoboom@doge.com', password: bcrypt.hashSync('123456', 10), role:'instructor'}
      ]);
    });
};
