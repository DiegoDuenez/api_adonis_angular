'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('mensaje', () => {
  return { title: 'Hello world in JSON' }
})

Route.post('registro', 'UserController.create')
Route.post('login', 'UserController.login')


Route.group(() =>{
  Route.get('usuarios/:id?', 'UserController.index') 
  Route.get('perfil', 'UserController.getUser')
  Route.get('productos/:id?', 'ProductoController.index')
  Route.get('productos/usuario/:id', 'ProductoController.productoUsuario')
  Route.get('comentarios/:id?', 'ComentarioController.index') 
  Route.get('comentarios/producto/:id', 'ComentarioController.comentarioProducto')
  Route.get('comentarios/usuario/:id', 'ComentarioController.comentarioUsuario')

  Route.post('registrar/productos', 'ProductoController.create')
  Route.post('registrar/comentarios', 'ComentarioController.create')

  Route.put('actualizar/productos/:id', 'ProductoController.update') 
  Route.put('actualizar/comentarios/:id', 'ComentarioController.update')
  Route.put('actualizar/usuarios/:id', 'UserController.update')

  Route.delete('borrar/productos/:id', 'ProductoController.delete')
  Route.delete('borrar/comentarios/:id', 'ComentarioController.delete')
  Route.delete('logout', 'UserController.logout') 
  
}).middleware('auth');
