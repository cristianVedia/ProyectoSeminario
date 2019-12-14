var mongoose = require("./connect");
var USERSCHEMA ={
    username: String,
    apellidos: String,
    ci: String,
    password: String,
    email: String,
    address: String,
    phone: String,
    registerdate: Date,
    rols: Array
};
const USER = mongoose.model("user",USERSCHEMA);
module.exports = {USER, keys: ["username","apellidos","ci","password","email","address","phone"]};//que datos se pueden actualizar
