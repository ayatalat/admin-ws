var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

router.get('/:id?', function(req, res, next) {

    if (req.params.id) {

        Product.getProductById(req.params.id, function(err, rows) {
            // console.log("param",req.params.id);
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Product.getAllProducts(function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.get('/:categoryid?/:productid?', function(req, res, next) {
    console.log(req.params.categoryid);
    Product.getproductsbycategory(req.params.categoryid, function(err, rows) {
        if (err) {
            console.log(err)
            res.json(err);
        } else {
            res.json(rows);
        }
    })
})
router.put('/:oldId/:newId', function(req, res, next) {
    console.log("kfk",req.params.oldId);
    console.log(req.params.newId);
    Product.updateProductByCategoryId(req.params.newId, req.params.oldId, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    Product.addProduct(req.body, function(err, count) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function(req, res, next) {
    console.log("id",req.params.id);

    Product.updateProduct(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log("success");
            res.json(rows);
        }
    });
});
router.put('/', function(req, res, next) {

    console.log("before loop",req.body);

   // for (var i=0; i<req.body.length; i++) {
        console.log("after loop",req.body[i]);
        
        Product.decreaseProductQuantity(req.body[i], function(err, rows) {
            if (err) {
                console.log("error");
                 res.json(err);
            } 
            else {
                console.log("success");
                 res.json(rows);
            
            }
        });

//    }
});



router.put('/edit/quantity/:id', function(req, res, next) {
    console.log("req",req.params.id);

    Product.updateProductQuantity(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    // console.log(req.params.id);
    Product.removeProduct(req.params.id, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});

module.exports = router;
