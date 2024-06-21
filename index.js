//coniguración de express
const express= require('express') //import librería
const app= express() //inicializar la variable de la librería
const port= 3000 //def. el puerto a usar

const mongoose= require('mongoose'); //import. libreria mongoose
require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION) //cadena de conexión

//agg configuración de cors
const cors = require('cors')
app.use(cors());

//import. rutas de otro archivo
app.use(express.urlencoded({extended: true})) //acceder a la info de la url
app.use(express.json()) //analizar info en formato json
const UserRoutes= require('./routes/UserRoutes')
app.use('/', UserRoutes)
const CarRoutes= require('./routes/CarRoutes')
app.use('/', CarRoutes)

/*crear el serv web + funcionalidad de la API
res-> response/respuesta
req-> request/info de entrada*/

app.get('/', (req, res) => {
    res.send("Hola mundooo") //muestra en pantalla
})

app.get('/saludar', (req, res) => {
    res.send("Hola!!")
})

app.get('/despedirse', (req, res) => {
    res.send("Adiós")
})

app.get('/ingles', (req, res) => {
    res.send("Hello!!")
})

app.get('/italiano', (req, res) => {
    res.send("Ciao!!")
})

app.get('/aleman', (req, res) => {
    res.send("Hallo!!")
})

app.get('/frances', (req, res) => {
    res.send("Salut!!")
})

app.get('/japones', (req, res) => {
    res.send("Kon'nichiwa!!")
})

app.get('/saludar/:nombre', (req, res) => {
    var nombre= req.params.nombre
    res.send("Hola "+nombre+"!!")
})

app.get('/despedirse/:nombre', (req, res) => {
    var nombre= req.params.nombre
    res.send("adiós "+nombre)
})

app.get('/saludar/:nombre/:edad', (req, res) => {
    var nombre= req.params.nombre
    var edad= req.params.edad
    res.send("Hola, me llamo "+nombre+" y tengo "+edad+" años.")
})

app.get('/mascota/:tipo', (req, res) => {
    var tipo= req.params.tipo
    var animal=""
    if(tipo=="perro"){
        animal="guau"
    }else if(tipo=="gato"){
        animal="miau"
    }else if(tipo=="pollo"){
        animal="pio pio"
    }else if(tipo=="vaca"){
        animal="muuuu"
    }else if(tipo=="cerdo"){
        animal="oing oing"
    }else if(tipo=="cabra"){
        animal="meeeeh"
    }else if(tipo=="abeja"){
        animal="bzzzzz"
    }else{
        animal= "no se encontró el animal"
    }
    res.send(animal)
})

// Solicitud get
app.get('/usuario', (req, res) => {
    res.send("Estoy consultando un usuario")
})
// Solicitud por post
app.post('/usuario', (req, res) => {
    res.send("Estoy creando un usuario")
})
// Solicitud por PUT
app.put('/usuario', (req, res) => {
    res.send("Estoy actualizando un usuario con PUT")
})
//Solicitud por PATCH
app.patch('/usuario', (req, res) => {
    res.send("Estoy actualizando un usuario con PATCH")
})
app.delete('/usuario', (req, res) => {
    res.send("Estoy eliminando un usuario")
})

//ejecutar el server
app.listen(port, () => {
    console.log("listen on "+port)
})

