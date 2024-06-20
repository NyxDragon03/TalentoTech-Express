const CarSchema = require("../models/Carros")

class CarController{

    async getCarros(req, res){
        var carros = await CarSchema.find();
        res.json(carros)
    }

    async addCarro(req, res){
        var nuevoCarro={
            modelo: req.body.modelo,
            marca: req.body.marca,
            color: req.body.color,
            cilindraje: req.body.cilindraje,
            placa: req.body.placa,
            linea: req.body.linea,
            capacidad: req.body.capacidad,
        }

        await CarSchema(nuevoCarro).save().then((result) =>{
            res.send({"status": "success", "message": "carro guardado con exito"})
        }).catch((error) => {
            res.status(400).send({"status": "error", "message": error.message})
        })
    }

    async getCarroById(req, res){
        var id = req.params.id
        var carro = await CarSchema.findById(id)
        res.json(carro)
    }

    async updateCarro(req, res){
        var id = req.params.id;
        var updateCar={
            modelo: req.body.modelo,
            marca: req.body.marca,
            color: req.body.correo,
            cilindraje: req.body.cilindraje,
            placa: req.body.placa,
            linea: req.body.linea,
            capacidad: req.body.capacidad,
        }

        await CarSchema.findByIdAndUpdate(id, updateCar, {new: true})
        .then((result) =>{ 
            res.send({"status": "success", "message": "Carro actualizado correctamente"})
        }).catch((error) => {
            res.status(400).send({"status": "error", "message": error.message})
        })
    }

    async deleteCarro(req, res){
        var id = req.params.id
        await CarSchema.deleteOne({_id: id})
        res.json({"status": "success", "message": "Carro eliminado correctamente"})
    }
}

module.exports = CarController