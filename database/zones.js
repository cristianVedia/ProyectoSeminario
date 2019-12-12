var mongoose =require("./connect");
var ZONESCHEMA ={
    city: String,
    namezome: String,
    superficie_total: String, 
    latitud: String,
    longitud: String,
    registerdate: Date  
};
const  ZONE = mongoose.model("zone",ZONESCHEMA);
module.exports = ZONE;