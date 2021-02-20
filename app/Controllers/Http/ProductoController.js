'use strict'

const Db = use('Database')
const User = use('App/Models/User') //Modelo User
const Comentario = use('App/Models/Comentario') //Modelo Comentario
const Producto = use('App/Models/Producto') //Modelo Producto
const {
  validate
} = use('Validator') //Validator

class ProductoController {

  async index({
    params: {
      id
    },
    response
  }) {

    if (id == null) {

      /*const productos = await Producto.all()*/
      // const comentarios = await Comentario.query().where('user_id', id).fetch()
     /* const usuarios = await User.all()
      const productos = await Producto.query().where('user_id').fetch()*/
      const productos = await Db
      .select('users.nombre', 'productos.*')
      .from('productos')
      .innerJoin('users', 'users.id', 'productos.user_id')



      return response.status(200).json({
        productos: productos
      })

    } else if (id) {

  
      //const producto = await Producto.find(id)

      const producto = await Db
      .select('users.nombre', 'productos.*')
      .from('productos')
      .innerJoin('users', 'users.id', 'productos.user_id').where("productos.id", id)

      return response.status(200).json({
        producto: producto
      })
    } else {

      return response.status(400).json({
        mensaje: "No se encontro el producto"
      })
    }
  }

  async productoUsuario({
    params: {
      id
    },
    request,
    response
  }) {

    if (id) {
      //const productos = await Producto.query().where('user_id', id).fetch()

      const productos = await Db
      .select('users.nombre', 'productos.*')
      .from('productos')
      .innerJoin('users', 'users.id', 'productos.user_id').where("user_id", id)

      return response.status(200).json({
        productos: productos
      })
    } else {
      return response.status(400).json({
        mensaje: "No se han encontrado productos"
      })
    }
  }

  async create({
    request,
    response,
    auth
  }) {

    const user = await auth.getUser()
    const input = request.all();

    const validation = await validate(request.post(), {
      nombre_producto: 'required',
      descripcion: 'required|min:3|max:255',
      precio: 'required'

    });
    if (validation.fails()) {
      return validation.messages()
    }

    await user.productos().create(input);


    return response.status(200).json({
      mensaje: "Se ha registrado el producto",
      producto: Producto
    })

  }




  async update({response, auth, request, params: {id}}){

    const producto = await Producto.find(id)
    const user = await auth.getUser()

    if(producto.user_id == user.id && id && producto.id==id){

        const input = request.all();
        const validation = await validate(request.all(),{
            nombre_producto: 'required',
            descripcion: 'required|min:1|max:255',
            precio: 'required'
        });
        if(validation.fails()){
          return validation.messages() 
        }

        await user.productos().update(input).where("id", "=", id)
        


        return response.status(200).json({
            mensaje: "La informacion de tu producto se actualizo con exito",
        })
        
        
    }





  }






  async delete({
    response,
    auth,
    request,
    params: {
      id
    }
  }) {

    const producto = await Producto.find(id)
    const user = await auth.getUser()

    if (producto.user_id == user.id && id) {
      const comentarios = await Comentario.query().where('producto_id', id).delete()
      await producto.delete()
      return response.status(200).json({
        mensaje: "Tu producto se elimino con exito"
      })
    } else {
      return response.status(400).json({
        mensaje: "Este producto no es tuyo",
      })
    }
  }

}

module.exports = ProductoController
