const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('tutorials', {
        linkActive: "tutorials",
        user: undefined
    })
})

module.exports = router;