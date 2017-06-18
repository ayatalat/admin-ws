var db = require('../dbconnection'); //reference of dbconnection.js

var Order = {

    getAllOrders: function (callback) {
        return db.query("Select * from `order`", callback);
    },
    getOrderDetails: function (idorder, callback) {
        return db.query("Select * from orderproduct where idorder=?",[idorder], callback);
    },
    getOrderByUserId: function (iduser, callback) {
        return db.query("select * from `order` where iduser=?", [iduser], callback);
    },
// deit queery 
    addOrder: function (Order, callback) {
        return db.query("Insert into `order` (iduser,status,selectedtime,selectedaddress,totalprice) values(?,?,?)", [Order.iduser, Order.status,Order.selectedtime,Order.selectedaddress,Order.totalprice], callback);
    },

    updateOrder: function (idorder, Order, callback) {
        return db.query("update `order` set status=? where idorder=?", [Order.status, idorder], callback);
    },

    addProductToOrder: function (idorder,Order,callback){
        console.log(idorder,Order.idproduct,Order.unitprice,Order.quantity)
        return db.query("insert into orderproduct(idorder,idproduct,unitprice,quantity) values(?,?,?,?)",[idorder,Order.idproduct,Order.unitprice,Order.quantity],callback )
    }
};
module.exports = Order;