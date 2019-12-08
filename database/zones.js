var mongoose =require("./connect");
var ZONESCHEMA ={
    city: String,
    namezome: String,
    zoom: Number,
    lat: Number,
    lng: Number,  
    coordenadas: String,
    registerdate: Date  
};
const  ZONE = mongoose.model("zone",ZONESCHEMA);
module.exports = ZONE;