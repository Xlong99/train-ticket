var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var db = require('./db');

router.get('/welcome', function(req, res, next) {
    res.send("Welcome to ts-ticket-office-service");
});

// router.get('/init', function(req, res, next) {
//     db.initMongo(function(result){
//         res.set({'Content-Type':'text/json','Encodeing':'utf8'});
//         result = JSON.stringify(result);
//         console.log("initResult=" + result);
//         res.end(result);
//     });
// });

router.get('/office/getRegionList', function(req, res, next) {
    /*读取region.json*/
    fs.readFile(path.join(__dirname, "./region.json"), 'utf8', function (err, data) {
        data = JSON.parse( data );
        console.log("getRegionList=" + JSON.stringify(data));
        res.json(data);
    });
});

router.get('/office/getAll', function(req, res, next) {
    db.getAll(function(result){
        res.set({'Content-Type':'text/json','Encodeing':'utf8'});
        console.log("getAll=" + JSON.stringify(result));
        res.json(result);
    });
});

router.post('/office/getSpecificOffices', function(req, res, next) {
    db.getSpecificOffices(req.body.province, req.body.city, req.body.region, function(result){
        res.set({'Content-Type':'text/json','Encodeing':'utf8'});
        console.log("getSpecificOffices=" + JSON.stringify(result));
        res.json(result);
    });
});

router.post('/office/addOffice', function(req, res, next) {
    db.addOffice(req.body.province, req.body.city, req.body.region, req.body.office, function(result){
        res.set({'Content-Type':'text/json','Encodeing':'utf8'});
        console.log("addOffice=" + JSON.stringify(result));
        res.json(result);
    });
});

//此处注意，同一个区默认不能有两个名字相同的代售点
router.post('/office/deleteOffice', function(req, res, next) {
    db.deleteOffice(req.body.province, req.body.city, req.body.region, req.body.officeName, function(result){
        res.set({'Content-Type':'text/json','Encodeing':'utf8'});
        console.log("deleteOffice=" + JSON.stringify(result));
        res.json(result);
    });
});

//此处注意，同一个区默认不能有两个名字相同的代售点
router.post('/office/updateOffice', function(req, res, next) {
    db.updateOffice(req.body.province, req.body.city, req.body.region, req.body.oldOfficeName, req.body.newOffice, function(result){
        res.set({'Content-Type':'text/json','Encodeing':'utf8'});
        console.log("updateOffice=" + JSON.stringify(result));
        res.json(result);
    });
});

module.exports = router;
