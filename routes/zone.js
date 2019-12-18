var express = require("express");
var ZONE = require("../database/zones");//cambia USER por USEROBJ para path
var router = express.Router();

router.post("/neighborhood",(req,res,next) => {
var params = req.body;
console.log("error");
params["registerdate"] =new Date();
var zone =new ZONE(params);
zone.save().then(() => {
    res.status(200).json(params);
 });
});

router.get("/neighborhood",(req, res, next) => {
    //var filter = {};
    //var params =req.query;
    /*var clave_sistemas = keyword;
    if(clave_sistemas){

    }*/
    ZONE.find({},(err, docs) => {    
        if(err){
            res.status(200).json({
                "msn": "Error en la base de datos"
            });
            return;
        }
        res.status(200).json(docs);
    });
});

module.exports = router;
