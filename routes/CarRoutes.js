const express = require('express')
const app =express()
const CarController = require('../controllers/CarController');
const controller = new CarController();

app.get('/carros', controller.getCarros)
app.post('/carros', controller.addCarro)
app.get('/carros/:id', controller.getCarroById)
app.put('/carro/:id', controller.updateCarro)
app.delete('/carros/:id', controller.deleteCarro)

module.exports = app