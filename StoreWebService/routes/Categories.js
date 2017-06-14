var express = require('express');
var router = express.Router();
var category=require('../models/category');

router.get('/:idcategory?',function(req,res,next){

if(req.params.idcategory){

    category.getCategoryById(req.params.idcategory,function(err,rows){

        if(err)
        {
		console.log(err);
            res.json(err);
        }
        else{
		console.log(rows);
            res.json(rows);
        }
    });
}
else{

 category.getAllCategories(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
}
});

router.post('/',function(req,res,next){
        console.log(req.body);
        category.addNewCategory(req.body,function(err,count){
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
router.delete('/:id',function(req,res,next){

        category.deleteCategory(req.params.id,function(err,count){

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
router.put('/:id',function(req,res,next){

    category.updateCategory(req.params.id,req.body,function(err,rows){

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
