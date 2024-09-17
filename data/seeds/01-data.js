exports.seed = function (knex) {
    return knex('bugs').truncate()
        .then(function () {
            return knex('bugs').insert([
                { name: 'cicada killer', legnumber: 6 },
                { name: 'cicada', legnumber: 6 },
                { name: 'grasshopper', legnumber: 6 },
                { name: 'black widow', legnumber: 8 },
            ])
        })
}