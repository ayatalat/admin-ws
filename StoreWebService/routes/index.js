var express = require('express');
var router = express.Router();
var fs = require("fs");

var multer = require('multer');

var DIR = './uploads/';

var upload = multer({ dest: DIR }).single('photo');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Store ' });

});

router.get('/uploads/:imagename', function (req, res, next) {

  var file = "/uploads/" + req.params.imagename;
  var img = fs.readFileSync(file);
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');


})
router.post('/', function (req, res, next) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    // No error occured.
    path = req.file.path;
    // return res.send("Upload Completed for "+path); 
    res.json(path);
  });
})


module.exports = router;
