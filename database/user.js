var mongoose = require("./connect");
var USERSCHEMA ={
    username: String,
    apellidos: String,
    password: String,
    email: String,
    sexo: String,
    address: String,
    phone: Number,
    registerdate: Date,
    rols: Array
};
const USER = mongoose.model("user",USERSCHEMA);
module.exports = {USER, keys: ["username","apellidos","password","email","sexo","address",'phone']};//que datos se pueden actualizar
