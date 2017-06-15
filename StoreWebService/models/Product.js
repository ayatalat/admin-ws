var db=require('../dbconnection'); //reference of dbconnection.js

var Product={

getAllProducts:function(callback){
return db.query("Select * from product where status = 1",callback);

},
getProductById:function(id,callback){
    return db.query("select * from product where idproduct=?",[id],callback);
},
getProductByBarcode:function(barcode,callback){
    return db.query("select * from product where barcode=?",[barcode],callback);
},
addProduct:function(product,callback){
   console.log("inside service");
    return db.query("Insert into product (name, barcode, price, quantity, description, image, idcategory) values(?,?,?,?,?,?,?)",[product.name, product.barcode, product.price, product.quantity, product.description, product.image, product.idcategory],callback);
},
updateProduct:function(id,product,callback){
   console.log("query");
    return db.query("update product set name=?, barcode=?, price=?, quantity=?, description=?, image=? where idproduct=?",[product.name, product.barcode, product.price, product.quantity, product.description, product.image, id],callback);
},
updateProductQuantity:function(id,product,callback){
   console.log("query");
    return db.query("update product set quantity=? where idproduct=?",[ product.quantity, id],callback);
},
removeProduct:function(id,callback){
    return  db.query("update product set status=0 where idproduct=?",[id],callback);
},
updateProductByCategoryId(newcategoryid,oldcategoryid,callback){
    return db.query('update product set idcategory=? WHERE idproduct in (select idproduct from (select idproduct from product where idcategory=?) as t)',[newcategoryid,oldcategoryid],callback)
},
getproductsbycategory(id, callback) {
       return db.query("select * from product where idcategory=?", [id], callback);
   }
};
 module.exports=Product;
