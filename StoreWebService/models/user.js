var db=require('../dbconnection');

var user={
    addNewUser:function(user,callback){
        return db.query('insert into user (name,email,password) values (?,?,?)',[user.name,user.email,user.password],callback)
    }
    ,
    edituser:function(id,user,callback){
        return db.query("update user set name=?,email=?,password=? where iduser=?",[user.name,user.email,user.password,id],callback);
    },
    listallusers:function(callback){
    	console.log(db.query('select * from user where status !=0',callback));
    },
    getuseremail:function(email,callback){
      return db.query('select * from user where email=?',[email],callback);
    }

}
module.exports=user;
