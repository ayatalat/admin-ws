var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.get('/:id?', function(req, res, next) {

    if (req.params.id) {

        Order.getOrderByUserId(req.params.id, function(err, rows) {

            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Order.getAllOrders(function(err, rows) {

            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

router.get('/details/:orderid',function(req,res,next){
    Order.getOrderDetails(req.params.orderid,function(err,rows){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(rows);
        }
    })
})

router.post('/:id?', function(req, res, next) {

    if (req.params.id) {
        console.log("before loop", req.body);
        for (var i = 0; i < req.body.length; i++) {
            console.log("after loop", req.body[i]);
            Order.addProductToOrder(req.params.id, req.body[i]);
        }
        if (flag == true) {
            console.log("success");
        }
        res.json({
            "success": flag
        });
    } else {

        Order.addOrder(req.body, function(err, rows) {
            console.log(req.body);
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(rows.insertId);
            }
        });
    }
});

router.put('/:id', function(req, res, next) {

    if (req.params.id) {
        Order.updateOrder(req.params.id, req.body, function(err, rows) {

            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

module.exports = router;
