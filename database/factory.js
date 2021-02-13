'use strict'

const { foreignKey } = require('../app/Models/User')

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint('App/Models/User', (faker) => {
    return {
   
   nombre: faker.first(),
   apellidos: faker.last(),
   email: faker.email(),
   password: Hash.make(faker.password()),
   edad: faker.age()
    }
})

Factory.blueprint('App/Models/Producto', (faker) =>{
    return{
        nombre_producto: faker.word(),
        descripcion: faker.paragraph(),
        precio: faker.floating({ min: 0, max: 1000, fixed: 2 }),
        user_id: 1

    }
})

Factory.blueprint('App/Models/Comentario', (faker) =>{
    return{
        titulo: faker.sentence({ words: 3 }),
        contenido: faker.paragraph(),
        user_id: 1,
        producto_id: 8
    }
})

