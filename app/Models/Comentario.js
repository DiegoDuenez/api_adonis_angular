'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comentario extends Model {

    users (){
        return this.belongsTo('App/Models/User')
    }
    productos (){
        return this.belongsTo('App/Models/Producto')
    }
}

module.exports = Comentario
