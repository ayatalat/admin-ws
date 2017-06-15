var db=require('../dbconnection');

var Category={

getAllCategories:function(callback){

return db.query("Select * from category where idsupercategory IS NULL AND status !=0",callback);
}

,
getCategoryById:function(idcategory,callback){

    return db.query("select name  from category where idcategory=? AND status !=0",[idcategory],callback);
},
addNewCategory:function(category,callback){
return db.query("Insert into category(name,idsupercategory,categorydesc,status,image) values(?,?,?,?,?)",[category.name,category.idsupercategory,category.categorydesc,category.status,category.image],callback);
},
deleteCategory:function(id,callback){
    return db.query("update category set status=0  where idcategory=?",[id],callback);
},
updateCategory:function(id,category,callback){
    return  db.query("update category set name=?,categorydesc=? ,image =? where idcategory=?",[category.name,category.categorydesc,category.image,id],callback);
}
};
module.exports=Category;
