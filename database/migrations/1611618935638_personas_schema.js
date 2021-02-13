'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonasSchema extends Schema {
  up () {
    this.create('personas', (table) => {
      table.increments('id').primary().unique()
      table.string('Nombre', 20).notNullable()
      table.string('Apellidos', 45).notNullable()
      table.string('Email').notNullable().unique()
      table.string('Contraseña').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('personas')
  }
}

module.exports = PersonasSchema
