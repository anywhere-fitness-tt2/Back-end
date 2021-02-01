exports.seed = function(knex) {
  return knex('enrolled')
    .then(function () {
      return knex('enrolled').insert([
        {userId: 1, classId: 1},
        {userId: 2, classId: 1},
        {userId: 4, classId: 1},
        {userId: 6, classId: 2},
        {userId: 2, classId: 2},
        {userId: 5, classId: 2},
        {userId: 3, classId: 2}
      ]);
    });
};