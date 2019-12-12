const mongoose =require("mongoose");
//const databasename ="Base_Inmobiliaria";
mongoose.connect("mongodb://172.25.0.2:27017/Base_Inmobiliaria" , {
    useNewUrlParser: true
}).then(() => {
    console.log('conexion a mongodb exitosa');
}).catch(err => {
    console.log('Error en la conexion', err);
});
module.exports =mongoose;