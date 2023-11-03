
exports.up = knex => knex.schema.createTable("menu", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
});

exports.down = knex => knex.schema.dropTable("menu"); 