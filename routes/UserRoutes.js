const express = require('express')//importar libreria
const app =express() //iniciar var libreria
const UserController = require('../controllers/UserController') //importar controlador
const controller = new UserController(); //crear una instancia

//servicios web
app.get('/usuario', controller.getUsuarios) //obtener
app.post('/usuario', controller.createUsuario)//crear nuevo
app.get('/usuario/:id', controller.getUsuarioById)//consultar
app.put('/usuario/:id', controller.updateUsuario)//actualizar
app.delete('/usuario/:id', controller.deleteUsuario)//eliminar
app.post('/login', controller.login)//hacer login

module.exports = app