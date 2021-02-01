
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('userId')
            tbl.string('username', 128).notNullable().unique()
            tbl.string('email', 128).notNullable().unique()
            tbl.string('password', 128).notNullable().unique()
            tbl.string('role', 128).notNullable()
        })
        .createTable('classes', tbl => {
            tbl.increments('classId')
            tbl.string('name', 128).notNullable()
            tbl.string('type', 128).notNullable()
            tbl.string('time', 128).notNullable()
            tbl.string('duration', 128).notNullable()
            tbl.string('intensityLvl', 128).notNullable()
            tbl.string('location', 128).notNullable()
            tbl.integer('attendees').notNullable().unsigned()
            tbl.integer('maxSize').notNullable().unsigned()
        })
        .createTable('enrolled', tbl => {
            tbl.increments()
            tbl.integer('userId')
                .references('userId')
                .inTable('users')
                .unsigned()
                .notNullable()
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            tbl.integer('classId')
                .references('classId')
                .inTable('classes')
                .unsigned()
                .notNullable()
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('enrolled')
        .dropTableIfExists('classes')
        .dropTableIfExists('users')
};
