const { text, response } = require('express');
const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const cheerio = require('cheerio');


const got = (...args) => import('got').then(({default: got}) => got(...args)); 
const extractLinks = async (url) => {
  try {
    // Fetching HTML
    const response = await got(url);
    const html = response.body;

    // Using cheerio to extract <a> tags
    const $ = cheerio.load(html);

    const linkObjects = $('a');
    // this is a mass object, not an array

    // Collect the "href" and "title" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(), // get the text
        href: $(element).attr('href'), // get the href attribute
      });
    });
    return links;
    // do something else here with these links, such as writing to a file or saving them to your database
  } catch (error) {
    console.log(error.response.body);
  }
};


router.get('/', async function(req, res){
    let site = await extractLinks("https://fallguysstore.com/");
    let skins = []

    site.forEach(el => {
        if(el.href.includes("https://fallguysstore.com/wp-content/uploads/")){
            console.log(el.href);
            skins.push(el.href);
        }
    });


    res.render('home', {
        linkActive: "home",
        user: undefined,
        skins: skins
    })
})

module.exports = router;