'use strict'

const Db = use('Database')
const Comentario = use('App/Models/Comentario') //Modelo Comentario
const {
  validate
} = use('Validator') //Validator

class ComentarioController {




  //mostrar comentarios
  async index({
    params: {
      id
    },
    request,
    response
  }) {
    if (id == null) {
      const comentarios = await Db
      .select('users.nombre', 'comentarios.*', 'productos.nombre_producto')
      .from('comentarios')
      .innerJoin('users', 'users.id', 'comentarios.user_id')
      .innerJoin('productos', 'productos.id', 'comentarios.producto_id')
      //.where("user_id", id)

     // const comentarios = await Comentario.all()
      return response.status(200).json({
        comentarios: comentarios
      })
    } else if (id) {

      const comentario = await Db
      .select('users.nombre', 'comentarios.*', 'productos.nombre_producto')
      .from('comentarios')
      .innerJoin('users', 'users.id', 'comentarios.user_id')
      .innerJoin('productos', 'productos.id', 'comentarios.producto_id')
      .where("comentarios.id", id)

      return response.status(200).json({
        comentario: comentario
      })
    } else {
      return response.status(400).json({
        mensaje: "No se ha encontrado el comentario"
      })
    }
  }

  //mostrar los comentarios de un determinado producto
  async comentarioProducto({
    params: {
      id
    },
    request,
    response
  }) {
    if (id) {
      //const comentarios = await Comentario.query().where('producto_id', id).fetch()

      const comentarios = await Db
      .select('users.nombre', 'comentarios.*', 'productos.nombre_producto')
      .from('comentarios')
      .innerJoin('users', 'users.id', 'comentarios.user_id')
      .innerJoin('productos', 'productos.id', 'comentarios.producto_id')
      .where("comentarios.producto_id", id)
      

      return response.status(200).json({
        comentarios: comentarios
      })
    } else {
      return response.status(400).json({
        mensaje: "No se han encontrado comentarios"
      })
    }
  }

  //mostrar los comentarios de una determinada pesona
  async comentarioUsuario({
    params: {
      id
    },
    request,
    response
  }) {
    if (id) {
     
      //const comentarios = await Comentario.query().where('user_id', id).fetch()

      const comentarios = await Db
      .select('users.nombre', 'comentarios.*', 'productos.nombre_producto')
      .from('comentarios')
      .innerJoin('users', 'users.id', 'comentarios.user_id')
      .innerJoin('productos', 'productos.id', 'comentarios.producto_id')
      .where("comentarios.user_id", id)

      return response.status(200).json({
        comentarios: comentarios
      })
    } else {
      return response.status(400).json({
        mensaje: "No se han encontrado comentarios"
      })
    }
  }


  //crear comentarios
  async create({
    request,
    response,
    auth
  }) {
    const user = await auth.getUser()
    const input = request.all();
    const validation = await validate(request.post(), {
      titulo: 'required',
      contenido: 'required|min:1|max:255',
      producto_id: 'required|number'
    });
    if (validation.fails()) {
      return validation.messages()
    }
    await user.comentarios().create(input);
    return response.status(200).json({
      mensaje: "Se ha publicado el comentario",
      comentario: Comentario
    })
  }

  //actualizar comentarios
  async update({response,auth,request,params: {id}}) 
  {
    const comentario = await Comentario.find(id)
    const user = await auth.getUser()

    if (comentario.user_id == user.id && id) {
      const input = request.all();
      const validation = await validate(request.all(), {
        titulo: 'required',
        contenido: 'required|min:1|max:255'
      });

      
      if (validation.fails()) {
        return validation.messages()
      }


      await user.comentarios().update(input).where("id", "=", id)



      return response.status(200).json({
        mensaje: "La informacion de tu comentario se actualizo con exito",
      })
    } else {
      return response.status(400).json({
        mensaje: "Este comentario no es tuyo",
      })
    }
  }


  //eliminar un comentario
  async delete({
    response,
    auth,
    request,
    params: {
      id
    }
  }) {
    const comentario = await Comentario.find(id)
    const user = await auth.getUser()
    if (comentario.user_id == user.id && id) {
      await comentario.delete()
      return response.status(200).json({
        mensaje: "Tu comentario se elimino con exito"
      })
    } else {
      return response.status(400).json({
        mensaje: "Este comentario no es tuyo",
      })
    }
  }
}

module.exports = ComentarioController
