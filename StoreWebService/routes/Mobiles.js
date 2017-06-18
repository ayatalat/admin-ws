var express = require('express');
var router = express.Router();
var Mobile=require('../models/Mobile');

router.get('/:id?',function(req,res,next){

 Mobile.getAllMobiles(req.params.id,function(err,rows){

        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
});
router.post('/:iduser', function (req, res, next) {

        Mobile.addMobile(req.params.iduser,req.body, function (err, count) {
            console.log(req.body);
            console.log(res);
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log("success");
                res.json(req.body);
            }
         });
});
router.delete('/:id',function(req,res,next){
        // console.log(req.params.id);
        Mobile.removeMobile(req.params.id,function(err,count){
            
            if(err)
            {
                console.log(err);
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
module.exports=router;