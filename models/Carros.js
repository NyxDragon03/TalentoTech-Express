const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({
    modelo: {
     type: Number,
     required: true,
     validate:{
        validator: function(modelo){
            return modelo>1900;
        },
        message: props.value+" no es un modelo valido"
        }
    },
    marca: {
     type: String,
     required: true
    },
    color: {
     type: String,
     required: true 
    },
    cilindraje: {
    type: Number,
    required: true,
    validate:{
        validator: function(cilindraje){
               return cilindraje>800;
           },
           message: props.value+" no es un cilindraje valido"
        } 
    },
    placa: {
        type: String,
        require: true,
        unique: true,
        validate:{
            validator: function(placa){
                     return /^[A-Z]{3}\d{3}$/.test(placa);
                },
                message: props.value+" no es un placa valida"
        } 
    },
    linea: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true,
        validate:{
            validator: function(capacidad){
                   return capacidad>0 & capacidad<7;
               },
               message: props.value+" no es una capacidad valida"
        } 
    }
})
 
 module.exports = mongoose.model('Carros', CarSchema)
 