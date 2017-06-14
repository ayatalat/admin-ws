var mysql=require('mysql');
var connection=mysql.createPool({

host:'localhost',
user:'root',
password:'iti',
database:'Store'


});
module.exports=connection;
