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
  Route.get('productos/usuario/:id', 'ProductoController.productoUsuario') //falta
  Route.get('comentarios/:id?', 'ComentarioController.index') 
  Route.get('comentarios/producto/:id', 'ComentarioController.comentarioProducto')
  Route.get('comentarios/usuario/:id', 'ComentarioController.comentarioUsuario')
  Route.post('registrar/productos', 'ProductoController.create') //falta
  Route.post('registrar/comentarios', 'ComentarioController.create') //falta
  Route.put('actualizar/productos/:id', 'ProductoController.update')  //falta
  Route.put('actualizar/comentarios/:id', 'ComentarioController.update') //falta
  Route.delete('borrar/productos/:id', 'ProductoController.delete') //falta
  Route.delete('borrar/comentarios/:id', 'ComentarioController.delete') //falta
  Route.delete('logout', 'UserController.logout') 
  
  
}).middleware('auth');
