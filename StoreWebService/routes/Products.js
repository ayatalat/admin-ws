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
    console.log(req.params.oldId);
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
    console.log(req.params.id);

    Product.updateProduct(req.params.id, req.body, function(err, rows) {
        console.log("from web service", req.body);
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
