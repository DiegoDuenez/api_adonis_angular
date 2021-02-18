'use strict'

const Persona = use('App/Models/Persona') //Modelo Persona
const Hash = use('Hash') //HASHEO CONTRASEÑAS
const {
  validate
} = use('Validator') //Validator

class PersonaController {

  async index({
    params: {
      id
    },
    request,
    response
  }) {

    if (id == null) {

      const personas = await Persona.all()
      return response.status(200).json({
        Personas: personas
      })

    } else if (id) {

      const persona = await Persona.find(id)
      return response.status(200).json({
        Persona: persona
      })

    } else {

      return response.status(400).json({
        mensaje: "No se encontro a la persona"
      })

    }

  }

  async create({
    request,
    response
  }) {

    const validation = await validate(request.post(), {
      nombre: 'required|min:3|max:255',
      apellidos: 'required|min:3',
      email: 'required|email|unique:personas,email',
      contraseña: 'required'
    });
    if (validation.fails()) {
      return validation.messages()
    }

    const persona = new Persona()
    persona.Nombre = request.input('nombre')
    persona.Apellidos = request.input('apellidos')
    persona.Email = request.input('email')
    persona.Contraseña = await Hash.make(request.input('contraseña'))

    await persona.save()
    return response.status(200).json({
      mensaje: "Se ha registrado a la persona",
      persona: persona
    })

  }

  async update({
    response,
    request,
    params: {
      id
    }
  }) {


    const persona = await Persona.find(id)

    if (id) {

      const validation = await validate(request.all(), {
        nombre: 'required|min:3|max:255',
        apellidos: 'required|min:3',
        email: 'required|email|unique:personas,email',
        contraseña: 'required'
      });
      if (validation.fails()) {
        return validation.messages()
      }


      persona.id = id
      persona.Nombre = request.input('nombre')
      persona.Apellidos = request.input('apellidos')
      persona.Email = request.input('email')
      persona.Contraseña = await Hash.make(request.input('contraseña'))

      await persona.save()
      return response.status(200).json({
        mensaje: "Se ha actualizado a la persona",
        persona: persona
      })


    } else {
      return response.status(400).json({
        mensaje: "No se ha podido actualizar a la persona",

      })
    }

  }

  async delete({
    response,
    request,
    params: {
      id
    }
  }) {

    const persona = await Persona.find(id)

    if (id) {

      await persona.delete()

      return response.status(200).json({
        mensaje: "La persona se elimino correctamente",
        persona: id
      })
    } else {
      return response.status(400).json({
        mensaje: "No se ha podido borrar a la persona",

      })
    }


  }


}

module.exports = PersonaController
