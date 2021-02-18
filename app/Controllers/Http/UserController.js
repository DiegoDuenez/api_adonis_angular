'use strict'


const User = use('App/Models/User') //Modelo User
const Token = use('App/Models/Token')
const {
  validate
} = use('Validator') //Validator


class UserController {

  async index({
    params: {
      id
    },
    response
  }) {

    if (id == null) {

      const usuarios = await User.all()
      return response.status(200).json({
        usuarios: usuarios
      })

    } else if (id) {

      const usuario = await User.find(id)
      return response.status(200).json({
        usuario: usuario
      })

    } else {

      return response.status(400).json({
        mensaje: "No se encontro al usuario"
      })

    }

  }

  async create({
    request,
    response
  }) {
    const input = request.all();
    const validation = await validate(request.post(), {
      nombre: 'required|min:3|max:255',
      apellidos: 'required|min:3',
      email: 'required|email|unique:users,email',
      password: 'required',
      edad: 'required'
    });
    if (validation.fails()) {
      return validation.messages()
    }

    await User.create(input);


    return response.status(200).json({
      mensaje: "Se ha registrado al usuario",
      usuario: User
    })

  }

  async login({
    request,
    response,
    auth
  }) {
    let input = request.all()
    let token = await auth.withRefreshToken().attempt(input.email, input.password)
    return response.json({
      token,
      mensaje: "Inicio de sesion correcto"
    })
  }


  async getUser({
    auth,
    response
  }) {
    try {
      return await auth.getUser()
    } catch {
      response.send("ningun usuario autenticado")
    }
  }

  async logout({
    auth,
    response,
    request
  }) {
    const user = auth.getUser()
    /*await auth
    .authenticator('jwt')
    .revokeTokens(user)*/
    await auth.authenticator('jwt').revokeTokens(user, true)
    /*const refreshToken = '' // get it from user

    await auth
    .authenticator('jwt')
    .revokeTokens([refreshToken], true)*/
    

    return response.json({
      mensaje: "Cerro sesion",
      
    })
  }

}
module.exports = UserController
