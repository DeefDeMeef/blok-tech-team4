const express = require('express');
const router = express.Router();

router.get('/create', (req,res) =>{
    res.render('createProfile')
})

router.post('/create',(req,res)=>{
    console.log(req.body);
});

module.exports = router;