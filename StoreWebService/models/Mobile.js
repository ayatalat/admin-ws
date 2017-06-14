var db=require('../dbconnection'); //reference of dbconnection.js
 
var Mobile={
 
getAllMobiles:function(id,callback){
return db.query("Select * from mobile where status = 1 and iduser=?",[id],callback);
},
removeMobile:function(id,callback){
    return  db.query("update mobile set status=0 where iduser=?",[id],callback);
}
};
 module.exports=Mobile;