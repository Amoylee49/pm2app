const puppeteer = require('puppeteer');
const path = require("path");


// https://www.lfhacks.com/tech/puppeteer-screenshot/

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    // 设置窗口的大小，可以注释下方的一行查看截图的区别
    await page.setViewport({width: 1000, height: 500});
    await page.screenshot(
        {
            path: path.join(__dirname, '../../../', 'resources', 'screenshot.jpeg')
            , quality: 100
        });

    let newPath = path.join(__dirname, "exam.png")
    // let newFile = path.join(__filename, "exam.png")
    await browser.close();
})();