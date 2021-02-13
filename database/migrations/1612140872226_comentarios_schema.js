'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComentariosSchema extends Schema {
  up () {
    this.create('comentarios', (table) => {
      table.increments('id').primary().unique()
      table.string('titulo', 30).notNullable()
      table.text('contenido').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('producto_id').unsigned().references('id').inTable('productos')
      table.timestamps()
    })
  }

  down () {
    this.drop('comentarios')
  }
}

module.exports = ComentariosSchema
