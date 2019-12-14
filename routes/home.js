var express = require("express");
var HOME = require("../database/homes");//cambia USER por USEROBJ para path
var router = express.Router();

router.post("/homes", (req,res,next) => {
    var params = req.body;
    params["registerdate"] = new Date();
    var user = new HOME(params);
    user.save().then(() => {
        res.status(200).json(params);
    });
});

router.get("/homes",(req, res, next) => {
    var skip =0;
    var limit =20;
    var params = req.query;
    var filter ={};
    if(params.skip !=null){
        skip=Number(params.skip);
    }
    if(params.limit!=null ){
        limit=Number(params.limit);
    }
    if(params.search!=null){
        filter["directions"] = new RegExp(params.search,"g");

     }
     if(params.streetnumber != null){
         filter["streetNumber"] = new RegExp(params.streetNumber,"g");
     }
     if(params.mim != null &&params.max != null){
        filter["listPrice"]={"$gt": Number(params.min),"$lt": Number(params.max)}
     }
     if(params.id){
        filter["_id"]= params.id; 
    }
     HOME.find(filter).skip(skip).limit(limit).exec((err, docs) => {    
        if(err){
            res.status(200).json({
                "msn": "Error en la base de datos"
            });
            return;
        }
        res.status(200).json(docs);
    });
});


    /* var cad="property_descryption,directions, latitud, longitud";
     if(params.detail != null){
        if(params.detail =="true"){
            cad="";

        }else if(params.detail=="false"){
            cad="property_descryption,directions, latitud, longitud";

        }
     }
    if(cad == ""){
     HOME.find(filter).skip(skip).limit(limit).exec((err, docs)=> {
        if(err){
            res.status(200).json({
                "msn": "Error en la base de datos"
            });
            return;
        }
        res.status(200).json(docs);
    });
   }else{
    HOME.find(filter).skip(skip).limit(limit).select(cad).exec((err, docs)=> {
        if(err){
            res.status(200).json({
                "msn": "Error en la base de datos"
            });
            return;
        }
        res.status(200).json(docs);
    });
   }
});
     /*if(params.mlsId != null ){
         filter["mlsId"]= params.mlsId;
     }*/
   /*  var cad="property_descryption,directions, latitud, longitud";
     if(params.detail != null){
        if(params.detail =="true"){
            cad="";

        }else if(params.detail=="false"){
            cad="property_descryption,directions, latitud, longitud";

        }
     }
     if(cad == ""){
        HOME.find(filter).skip(skip).limit(limit).exec((err, docs) => {   
            console.log("ENTER HERE") 
            if(err){
                res.status(200).json({
                    "msn": "Error en la base de datos"
                });
                return;
            }
            res.status(200).json(docs);
            return;
        });
    }else{
        HOME.find(filter).skip(skip).limit(limit).select(cad).exec((err, docs) => {   
            console.log("ENTER HERE") 
            if(err){
                res.status(200).json({
                    "msn": "Error en la base de datos"
                });
                return;
            }
            res.status(200).json(docs);
            return;
        });
    }
});*/

module.exports = router;