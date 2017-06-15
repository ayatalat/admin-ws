var mysql=require('mysql');
var connection=mysql.createPool({

// host:'sql11.freemysqlhosting.net',
// user:'sql11179838',
// password:'XQIX8kHaGS',
// database:'sql11179838'


host:'localhost',
user:'root',
password:'iti',
database:'Store'

});
module.exports=connection;
