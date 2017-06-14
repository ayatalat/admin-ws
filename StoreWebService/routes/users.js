var express = require('express');
var router = express.Router();
var user=require('../models/user');


router.get('/',function(req,res,next){

    user.listallusers(function(err,rows){

        if(err)
        {
            console.log(err)
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get('/:email',function(req,res,next){
    user.getuseremail(req.params.email,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    })
})


router.post('/',function(req,res,next){
        console.log(req.body);
        user.addNewUser(req.body,function(err,count){
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
router.put('/:id',function(req,res,next){

    user.edituser(req.params.id,req.body,function(err,rows){

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

module.exports=router;
