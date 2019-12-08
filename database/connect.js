const mongoose =require("mongoose");
const databasename ="Base_Inmobiliaria";
mongoose.connect("mongodb://172.25.0.2:27017/" + databasename);
module.exports =mongoose;