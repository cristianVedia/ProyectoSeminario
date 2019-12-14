var mongoose =require("./connect");
var ObjectId=mongoose.Schema.Types.ObjectId;
var Schema= mongoose.Schema;
var HOMESCHEMA = new Schema({
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
    latitud: String,
    longitud: String,
    registerdate: Date,
    año_construccion: String
});
const HOME = mongoose.model("home",HOMESCHEMA);
module.exports = HOME;