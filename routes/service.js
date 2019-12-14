var express = require("express");
var USEROBJ = require("../database/user");//cambia USER por USEROBJ para path
var KEYS = USEROBJ.keys;
var USER = USEROBJ.USER;//cambia USER a USEROBJ.USER para path
var router = express.Router();
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
const keycypher = "password123456"; 

function verytoken(req, res, next){
    //recibir el token 
    const header = req.headers["authorization"];
    if(header == null){
        res.status(300).json({
            "msn": "No tiene el permiso "
        });
        return;
    }
    req.token = header;
    //console.log(req);
    jwt.verify(req.token, keycypher,(err,authData)=>{
        if(err){
            res.status(403).json({
                "msn": "Token incorrecto "
            });
            return;
        }
        var email = authData.name;
        USER.find({email:email}).exec((err,docs)=>{
            if(err){
            res.status(300).json({
                "msn": "Error en la base de datos"
            });
            return;
         }
            if(docs[0].toJSON().rols[0] == "administrador(a)" || docs[0].toJSON().rols[0] == "usuario"){ //solo tienen permiso los administrador(a) a get, post, delete y patch
                next();
         }else{
            res.status(300).json({
                "msn": "Usted no cuenta con el rol para este servicio"
            });
            return;
         }
        });
        //res.status(403).json(authData);
    });
}



router.patch("/user",verytoken,(req, res, next) => {
    var params = req.query;
    var data = req.body;
    if (params.id == null){
        res.status(300).json({
            "msn": "Faltan parametros"
        });
        return;
    }
    var objkeys = Object.keys(data);
    for (var i=0; i< objkeys.length; i++){
        if (!checkKeys(objkeys[i])){
            res.status(300).json({
                "msn": "Tus parametros son incorrectos "+ objkeys[i]
            });
            return;
        };
    }
    USER.update({_id: params.id}, data).exec((err, docs) => {
        res.status(300).json(docs);
    });
});
    function checkKeys(key){
            for(var j=0; j < KEYS.length; j++){
                if(key== KEYS[j]){
                    return true;
                }
            } 
            return false;
    }
 router.post("/login",(req, res, next) => {
        var params = req.body;
        var passwordcypher =crypto.createHash("md5").update(params.password).digest("hex");
        USER.find({email: params.email, password: passwordcypher}).exec((err,docs)=> {
            if(err){
                res.status(600).json({
                    "msn": "Problema con la base de datos"
                });
                return;
            }
            if (docs.length == 0){
                res.status(700).json({
                    "msn": "Usuario y Password Incorrecto "
                });
                return;
            }else{
                jwt.sign({name: params.email, password: passwordcypher}, keycypher,(err, token) =>{
                    if(err){
                        res.status(300).json({
                            "msn": "Error con JSONWEBTOKEN"
                        });
                        return;
                    }
                    res.status(200).json({
                        "token": token
                    });
                    return;
                });
            }
        });
    });

router.post("/user",async(req,res,next) => {
    var params = req.body;
    //las siguientes lineas son para ver no repetir un nombre de usuario o password
    // mongo ya tiene por defecto promaiser
    var docs = await USER.find({username: params.username, email: params.email});
    if (docs.length >= 1){
        res.status(300).json({
            "msn": "Nombre de ususario invalidado o correo"
        });
        return;
    }

    params["registerdate"] = new Date();
    params["rols"]=["usuario"];
    //añadiendo para la libreria crypto
    if(params.password == null){
        res.status(300).json({
            "msn": "No tiene el password"
        });
        return;    
    }
    //hash de passsword
    params["password"] = crypto.createHash("md5").update(params.password).digest("hex");
    var user = new USER(params);
    user.save().then(() => {
        res.status(200).json(params);
    });
});

router.get("/user",verytoken,(req, res, next) => {
    //crear paginacion
    var params =  req.query;
    var SKIP = 0;//contar usuarios SKIP=1 nosmuestra el primer usuario
    var LIMIT = 10;//limite para devolver usuarios LIMIT=10 solo nos dara 10 usuarios
    var order =1;//ordenar es un numero que puede ser 1 o -1 ordenar por nombre usuario
    var filter ={};
    if (params.skip){
        SKIP = parseInt(params.skip);
    }
    if (params.limit){
        LIMIT = parseInt(params.limit);
        console.log(order);
    }
    if (params.order){
        order = parseInt(params.order);
    }
    if(params.username){
        filter["username"]= params.username; 
    }
    if(params.id){
        filter["_id"]= params.id; 
    }
    if(params.email){
        filter["email"]= params.email; 
    }
    //buscar por nombre de usuario pero solo por el primer caracter de la letra 
    if(params.search){
        var regularexpresion = new RegExp(params.search,"g");
        filter["username"]= regularexpresion; 
    }
//filtros
    USER.find(filter).skip(SKIP).limit(LIMIT).sort({username: order}).exec((err, docs)=> {
        if(err){
            res.status(200).json({
                "msn": "Error en la base de datos"
            });
            return;
        }
        res.status(200).json(docs);
    });
});

router.delete("/user",verytoken,(req,res,next) => {
    var params = req.query;
    if(params.id==null){
        res.status(300).json({
            "msn":"Faltan parametros"
        });
        return;
    }
    USER.remove({_id: params.id}, (err, docs) => {
        if(err){
            res.status(300).json({
                "msn": "No se logro eliminar el registro"
            });
            return
        }
        res.status(300).json(docs)
    });
});


module.exports = router;