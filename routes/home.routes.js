const express = require('express');
const router = express.Router();
import fetch from "node-fetch";

router.get('/', async function(req, res){
    let site = await fetch("https://fallguysstore.com/");
    let html = await site.text();

    let text = html.split("Item Shop")[1];
    text = text.split("</p>")[0];
    text = text.split("<p>")[1];

    res.render('home', {
        linkActive: "home",
        user: undefined,
        daily: text
    })
})

module.exports = router;