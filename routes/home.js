var express = require("express");
var HOME = require("../database/homes");//cambia USER por USEROBJ para path
var router = express.Router();
router.post("/neighborhood", async(req,res,next) => {
    var params = req.body;
    var docs = await HOME.find({estado: params.estado});
    if (docs.length >= 1){
        res.status(300).json({
            "msn": "Nombre de usario invalido o email"
        });
        return;
    }
    params["registerdate"] = new Date();
    var user = new HOME(params);
    user.save().then(() => {
        res.status(200).json(params);
    });
});

router.get("/neighborhood",(req, res, next) => {
    HOME.find({},(err, docs) => {    
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