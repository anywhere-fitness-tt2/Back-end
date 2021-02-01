
exports.seed = function(knex) {
  return knex('classes')
    .then(function () {
      return knex('classes').insert([
        {name:'Thigh Blastin', type:'dance', time:'8:00 am', duration:'1hr', intensityLvl:'extreme', location:'Houston, Tx', attendees: 2, maxSize: 10},
        {name:'Do You Even Lift?', type:'weight-training', time:'12:45 pm', duration:'1hr 30 min', intensityLvl:'easy', location:'Los Angeles, CA', attendees: 3, maxSize: 5},
      ]);
    });
};
