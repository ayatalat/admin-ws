var express = require('express');
var router = express.Router();
var Mobile=require('../models/Mobile');

router.get('/:id?',function(req,res,next){

 Mobile.getAllMobiles(req.params.id,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
});

router.delete('/:id',function(req,res,next){
        // console.log(req.params.id);
        Mobile.removeMobile(req.params.id,function(err,count){
            
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
module.exports=router;