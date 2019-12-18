var mongoose =require("./connect");
var ObjectId=mongoose.Schema.Types.ObjectId;
var Schema= mongoose.Schema;
var HOMESCHEMA = new Schema({
    city: String,//ciudad
    region: String,//region
    zone: String,//zona
    precio: String,//precios
    property_descryption: String, //descripciones
    bedrooms: String,//baños
    badrooms: String,//cuartos
    living_area: String,//living_area
    lot_area: String,//lot_area
    piscina:   String,//piscina
    photo: String,//
    servicios: String,//servicios
    garaje: String,//garaje
    latitud: String,
    longitud: String,
    registerdate: Date,
    año_construccion: String//año_construccion
    
    //homeID: ObjectId,
   // homophoto: String

});
const HOME = mongoose.model("home",HOMESCHEMA);
module.exports = HOME;