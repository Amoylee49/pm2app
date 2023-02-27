const express = require('express')
const puppeteer = require('puppeteer')
const app = express()
const contentType = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
}
app.get('/puppe', (req, res) => {
    let query = req.query;
    // let query = eval(req.query);

    // let pic = scrapeYoutube( query);

    const youtubeVideos = new Promise((resolve, reject) => {
        scrapeYoutube(query)
            .then(data => {
                res.type('jpeg')
                res.send(data)
            })
            .catch(
                err => res.status(500).send("访问错误？"))
    })

})

const scrapeYoutube = async (query) => {
    console.log(query)
    const browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 3000,
            // devtools: false
            //处理多开卡死
            // 'dumpio': True
        }
    )
    const page = await browser.newPage()
    await page.setViewport({width: 393, height: 180})

    await page.goto('https://wiki.biligame.com/cq/' + query.heroName)
        .catch(err => {
            console.log('this error happen',err)
        });


    const title = await page.title()
    console.log(title)
    let awaited = await page.$('#mw-content-text > div > div.raw.ibook > div.col-md-5 > div:nth-child(1)');
    let newVar = await awaited.screenshot({
        // path: 'form.jpeg',
        type: 'jpeg',
        encoding: "binary",
        quality: 100
    });
    // let newVar = await page.$('#hero_skill > div.cqframe_box')
    // await newVar.screenshot(
    //     {path: 'form1.png'}
    // )
    await browser.close()
    return newVar
}

app.listen(process.env.PORT || 3000)