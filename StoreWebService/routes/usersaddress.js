var express = require('express');
var router = express.Router();
var useraddress=require('../models/useraddress');

router.post('/:id',function(req,res,next){
        console.log(req.body);
        console.log(req.params.id);
        useraddress.addaddress(req.params.id,req.body,function(err,count){
            if(err)
            {
                console.log(err);
                res.json(err);
            }
            else{
                 res.json(req.body);
            }
        });
});

router.delete('/:country/:city/:street',function(req,res,next){
    useraddress.deleteaddress(req.params.country,req.params.city,req.params.street,function(err,rows){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(rows);
        }
    })
})
router.get('/:iduser',function(req,res,next){
    useraddress.listaddress(req.params.iduser,function(err,rows){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(rows);
        }
    })
})
module.exports=router;