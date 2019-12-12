var mongoose =require("./connect");
var HOMESCHEMA ={
    city: String,
    region: String,
    zone: String,
    precio: String,
    property_descryption: String,
    bedrooms: String,
    badrooms: String,
    living_area: String,
    lot_area: String,
    piscina:   String,
    photo: String,
    servicios: String,
    garaje: String,
    latitud_longitud: String,
    registerdate: Date,
    año_construccion: String
};
const HOME = mongoose.model("home",HOMESCHEMA);
module.exports = HOME;