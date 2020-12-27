
var express = require('express');
var router = express.Router();
var stockService = require('../model/stockDetails');


router.post('/insertRecords', (req, res) => {
    let dataObj = req.body;
    stockService.addStock(dataObj, (err, result)=>{
        if(err){
            return res.json({ err: true, result: err});
        }
            return res.json({ err: false, result: err});
    })
    
});


router.get('/getAllRecords', (req, res) => {
    stockService.getStock((err, result)=>{
        if(err){
            return res.json({ err: true, result: err});
        } else
            return  res.json({ err: false, result: result});
    })
    
});






module.exports = router;