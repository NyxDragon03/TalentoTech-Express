const UserSchema = require('../models/Usuario') //acceder a los datos del modelo
const bcrypt =require('bcrypt')
//permiote agrupar atributos y funciones
class UserController {
    async getUsuarios(req, res){
        var usuarios = await UserSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){

        const hashedPassword = await bcrypt.hash(req.body.password, 10) //encriptar contraseña
        var nuevoUser={
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,
        }

        await UserSchema(nuevoUser).save().then((result) =>{
            res.send({"status": "success", "message": "Usuario creado correctamente"})
        }).catch((error) => {
            res.send({"status": "error", "message": error.message})
        })
    }

    async getUsuarioById(req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){
        var id = req.params.id;
        var updateUser={
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,
        }

        await UserSchema.findByIdAndUpdate(id, updateUser, {new: true})
        .then((result) =>{ //ejecución correcta//
            res.send({"status": "success", "message": "Usuario actualizado correctamente"})
        }).catch((error) => { //ejecución con fallas//
            res.send({"status": "error", "message": error.message})
        })
    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Usuario eliminado correctamente"})
    }
}

module.exports = UserController