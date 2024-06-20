const express = require('express')//importar libreria
const app =express() //iniciar var libreria
const UserController = require('../controllers/UserController') //importar controlador
const controller = new UserController(); //crear una instancia

//servicios web
app.get('/usuario', controller.getUsuarios)
app.post('/usuario', controller.createUsuario)
app.get('/usuario/:id', controller.getUsuarioById)
app.put('/usuario/:id', controller.updateUsuario)
app.delete('/usuario/:id', controller.deleteUsuario)

module.exports = app