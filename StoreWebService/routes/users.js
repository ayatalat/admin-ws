var express = require('express');
var router = express.Router();
var user = require('../models/user');
var bcrypt = require('bcrypt');

const saltRounds = 10;

router.get('/', function (req, res, next) {
    user.listallusers(function (err, rows) {

        if (err) {
            console.log(err)
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
//return user all user details by email
router.get('/:email', function (req, res, next) {
    user.getuseremail(req.params.email, function (err, rows) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
           // rows = JSON.stringify(rows);
           // console.log(rows);
            res.json(rows);
        }
    })
})


//check password 
router.get('/:type/:email/:password', function (req, res, next) {
    console.log(req.params.type);
    user.getuseremail(req.params.email, function (err, rows) {
        if (err) {
            console.log(err);
            res.end({ "err": err, "messsage": "invaild email" });
        } else {
            if (rows.length > 0) {
                rows = JSON.parse(JSON.stringify(rows));
                console.log("res", rows[0]);
                bcrypt.compare(req.params.password, rows[0].password, function (err, result) {
                    if (!err) {
                        if (req.params.type == "admin") {
                            if (result && rows[0].status == -1) {
                                res.json(true);
                            } else {
                                res.json(false);
                            }
                        } else {
                            if (result) {
                                res.json(true);
                            } else {
                                res.json(false);
                            }
                        }
                    } else {
                        res.json(false);
                    }

                });
            } else {
                res.json(false);
            }


        }
    })
})

router.post('/', function (req, res, next) {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

    console.log("password", req.body.password);
    user.addNewUser(req.body, function (err, rows) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            res.json(rows.insertId);
        }
    });
});
router.put('/:id', function (req, res, next) {

    user.edituser(req.params.id, req.body, function (err, rows) {

        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;
