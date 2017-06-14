var db=require('../dbconnection');

var useraddress={
  addaddress:function(id,useraddress,callback){
    return db.query('insert into useraddress (iduser,country,city,street) values (?,?,?,?)',[id,useraddress.country,useraddress.city,useraddress.street],callback);
  }
,
  deleteaddress:function(country,city,street,callback){
      return db.query('update useraddress  set  status=0 where street=? and country=? and city=? ',[street,country,city],callback);
  },
  listaddress:function(id,callback){
      return db.query('select * from useraddress where iduser=?',[id],callback);
  }
}
module.exports=useraddress;
