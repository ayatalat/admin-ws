var db=require('../dbconnection');

var user={
    addNewUser:function(user,callback){
        return db.query('insert into user (name,email,password) values (?,?,?)',[user.name,user.email,user.password],callback)
    }
    ,
    edituser:function(id,user,callback){
        return db.query("update user set name=?,email=? where iduser=?",[user.name,user.email,id],callback);
    },
    listallusers:function(callback){
    	return db.query('select * from user where status !=0 AND status !=-1',callback);
    },
    getuseremail:function(email,callback){
      return db.query('select * from user where email=?',[email],callback);
    }

}
module.exports=user;
