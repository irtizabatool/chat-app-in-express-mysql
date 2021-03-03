const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const db = require('../connection');

router.get('/getusers', (req, res) => {
    let sql = `SELECT *FROM users`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({ users: result });
    });
});

router.get('/getmessages', function(req, res) {
   
    let sql = `SELECT *FROM messages WHERE (leftuser = '${req.query.sender}' AND rightuser = '${req.query.receiver}') OR leftuser = '${req.query.receiver}' AND rightuser = '${req.query.sender}'`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        const sortedUser = result.sort((a,b) => b.date < a.date? 1: -1 );
        res.send({ users: sortedUser});
    });
});

router.post('/messages', (req,res) => {
    if(req.body.sender === req.body.receiver){
        res.send("You Cannot Send Message to Yourself");
    }else{
        let add = {id: uuid.v4(), leftuser: req.body.sender, rightuser: req.body.receiver, message: req.body.message}
        let sql = 'INSERT INTO messages SET ?';
        db.query(sql, add, (err, result) => {
            console.log(result);
            if (err) throw err;
            res.send(result);
        });
    }
});

module.exports = router;