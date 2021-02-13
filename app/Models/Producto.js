'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {

    static get hidden(){
        return ['created_at']
    }

    users (){
        return this.belongsTo('App/Models/User')
    }

    comentarios (){
        return this.hasMany('App/Models/Comentario')
    }
}

module.exports = Producto
