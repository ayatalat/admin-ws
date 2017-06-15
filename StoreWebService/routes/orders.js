var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {

        Order.getOrderByUserId(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

    else {

        Order.getAllOrders(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    }
});

router.post('/:id?', function (req, res, next) {

    if (req.params.id) {
        Order.addProductToOrder(req.params.id, req.body, function (err, count) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(req.body);

            }
        });
    }
    else {

        Order.addOrder(req.body, function (err, count) {

            if (err) {

                res.json(err);
            }
            else {
                res.json(req.body);
            }
        });
    }
});

router.put('/:id', function (req, res, next) {

    if (req.params.id) {
        Order.updateOrder(req.params.id, req.body, function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});

module.exports = router;
