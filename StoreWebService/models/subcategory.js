var db=require('../dbconnection');

var subCategory={

getAllSubCategories:function(callback){

return db.query("Select * from category where idsupercategory IS NOT NULL AND status !=0",callback);
}
,
getSubCategoryById:function(idcategory,callback){

    return db.query("select * from category where idsupercategory=? AND status !=0 ",[idcategory],callback);
},

addSubNewCategory:function(subcategory,callback){

return db.query("Insert into category(name,idsupercategory,categorydesc,status,image) values(?,?,?,?,?)",[subcategory.name,subcategory.idsupercategory,subcategory.categorydesc,subcategory.status,subcategory.image],callback);
},
deleteSubCategory:function(id,callback){
    return db.query("update category set status=0  where idcategory=?",[id],callback);
},
updateSubCategory:function(id,subcategory,callback){

    return  db.query("update category set name=?,categorydesc=?,idsupercategory=? where idcategory=?",[subcategory.name,subcategory.categorydesc,subcategory.idsupercategory,id],callback);
}
};
module.exports=subCategory;
