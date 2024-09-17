exports.up = function(knex) {
    return knex.schema
        .createTable('bugs', tbl => {
            tbl.increments('bug_id')
            tbl.text('name').notNullable()
            tbl.text('legnumber').notNullable()
        })
}

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('bugs')
}