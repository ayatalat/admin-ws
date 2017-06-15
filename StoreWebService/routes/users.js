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

router.get('/:email', function (req, res, next) {
    user.getuseremail(req.params.email, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            rows = JSON.stringify(rows);
            console.log(rows);
            res.json(rows);
        }
    })
})


//check password 
router.get('/:email/:password', function (req, res, next) {
    user.getuseremail(req.params.email, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            rows = JSON.parse(JSON.stringify(rows));
            //  console.log("res",rows[0]);
            // var res=bcrypt.compareSync(req.params.password,rows[0].password);
            // console.log("res",res);
            bcrypt.compare(req.params.password, rows[0].password, function (err, result) {
                if(result && req.params.email== rows[0].email){
                    res.json(true);
                }else{
                    res.json(false);
                }
            });
            console.log("entered password", req.params.password);
            console.log("database password", rows[0].password);
            // if (!(req.params.email == rows[0].email && bcrypt.compareSync(req.params.password, rows[0].password))) {
            //     console.log("failed to login ");
            //     res.json(false);
            // } else {
            //     res.json(true);
            // }

        }
    })
})

router.post('/', function (req, res, next) {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

    console.log("password", req.body.password);
    user.addNewUser(req.body, function (err, count) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});
router.put('/:id', function (req, res, next) {

    user.edituser(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;
