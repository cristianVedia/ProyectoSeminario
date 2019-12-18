var express = require("express");
var HOME = require("../database/homes");//cambia USER por USEROBJ para path
//var HOME = HOMEOBJ.HOME;
var multer = require("multer");
//var HOME  = require("../../../database/collections/homes");
var router = express.Router();
/*var storageFolder = multer.diskStorage({
    destination:"/public/imagenes/homes/", 
    
    filename:function(req,res,cb){
        cb(null,"IMG_"+Date.now+".jpg");
    }
});
var uploap = multer({storage:storageFolder}).single("img"); 
*/
var storage = multer.diskStorage({
    destination: __dirname+"/../public/imagenes",
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+".jpg");
    }
  })
   
  var upload = multer({ storage: storage}).single("homes");
  router.post('/upimages', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(300).json({
            "msn": "Error" + multer.MulterError
        });
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).json({
            "msn": "Error" + err
        });
        return;
      }
      var nameimg =req.file.path;
      res.status(200).json({
        "msn": "Imagen Cargada correctamente" + nameimg
          });
   
      // Everything went fine.
    })
  })

router.post("/homes", (req,res,next) => {
    var params = req.body;
    params["registerdate"] = new Date();
    var user = new HOME(params);
    user.save().then(() => {
        res.status(200).json(params);
    });
});


router.get("/homes",function(req, res, next)  {
    var skip =0;
    var limit =20;
    var params = req.query;
    var filter ={};
    if(params.skip !=null){
        skip=Number(params.skip);
    }
    if(params.limit != null ){
        limit=Number(params.limit);
    }
    //no hay en la base de datos
    if(params.search!=null){
        filter["zone"] = new RegExp(params.search,"g");

     }
     if(params.rentalsale!=null ){
         filter["region"] = params.rentalsale;
     }
     //if(params.sale!=null){
       // filter["region"] = params.sale;
    //}
     if(params.streetnumber != null){
         filter["streetNumber"] = new RegExp(params.streetNumber,"g");
     }

     if(params.minimo != null && params.maximo != null){
        filter["precio"] = {"$gt": Number(params.min),"$lt": Number(params.max)}
     }
     if(params.id){
        filter["_id"]= params.id; 
    }
   

     var cad="property_descryption  photo latitud  longitud precio zone region";
     if(params.detail != null){
         console.log(params.detail);
        if(params.detail =="true"){
            cad="";

        }else if(params.detail=="false"){
            cad="property_descryption  photo latitud longitud precio zone region";

        }
     }
    if(cad == ""){
     HOME.find(filter).skip(skip).limit(limit).exec((err, docs)=> {
         console.log("Enter HEre")
        if(err){
            res.status(300).json({
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
        return;
    });
   }
});

module.exports = router;