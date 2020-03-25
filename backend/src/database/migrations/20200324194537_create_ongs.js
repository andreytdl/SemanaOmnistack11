
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {

    // Id Chave Primária
    table.string('id').primary();

    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();

    //Tamanho do texto fixado em 2
    table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
