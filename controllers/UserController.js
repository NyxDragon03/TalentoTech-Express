const UserSchema = require('../models/Usuario') //acceder a los datos del modelo
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

//permite agrupar atributos y funciones
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
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        var updateUser={
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,
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

    async login(req, res){
        //capturar el correo y contraseña ingresadas
        var correo = req.body.correo;
        var password = req.body.password

        //buscar usuario por el correo
        var usuario = await UserSchema.findOne({correo})
        if(usuario){
            //comparar la contraseña ingresada con la registrada por el usuario
            var verificacionClave = await bcrypt.compare(password, usuario.password)
                                                        //ingreso  datos almacenados
            if(verificacionClave){
                //crear un token con la info codificada del usuario
                usuario.password = null
                const token = jwt.sign({usuario}, 'secret', {expiresIn: '1h'})
                res.send({
                    //verificación exitosa
                    "status": "success",
                    "message": "Bienvenido "+usuario.nombre+" "+usuario.apellidos,
                    "user_id": usuario._id,
                    "token": token
                })
            }else{
                //verificación erronea por contraseña
                res.status(401).send({"status": "error", "message": "Datos invalidos, verifique su contraseña."})
            }
        }else{
            //verificación fallida por correo
            res.status(401).send({"status": "error", "message": "El correo ingresado no está registrado"})
        }
    }
}

module.exports = UserController