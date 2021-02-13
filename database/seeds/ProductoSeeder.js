'use strict'

/*
|--------------------------------------------------------------------------
| ProductoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProductoSeeder {
  async run () {
    await Factory.model('App/Models/Producto').createMany(5)
  }
}

module.exports = ProductoSeeder
