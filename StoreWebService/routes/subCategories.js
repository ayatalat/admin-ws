var express = require('express');
var router = express.Router();
var category=require('../models/subcategory');

router.get('/:idcategory?',function(req,res,next){

if(req.params.idcategory){

    category.getSubCategoryById(req.params.idcategory,function(err,rows){

        if(err)
        { 
            console.log(err);
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}
else{

 category.getAllSubCategories(function(err,rows){

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
}
});

router.post('/',function(req,res,next){
    category.addSubNewCategory(req.body,function(err,count){
        if(err){
            console.log(err);
            res.json(err);

        }else{
            res.json(req.body);
        }
    })
})
router.delete('/:id',function(req,res,next){

        category.deleteSubCategory(req.params.id,function(err,count){

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
router.put('/:id',function(req,res,next){

    category.updateSubCategory(req.params.id,req.body,function(err,rows){

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
module.exports=router;