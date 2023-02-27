// https://segmentfault.com/a/1190000037537056

const {Cluster} = require('puppeteer-cluster');
const path = require('path')
const launchOptions = {
    headless: true,
    ignoreHTTPSErrors: true, //忽略证书错误
    waitUntil: 'networkidle2',
    defaultViewport: {
        width: 500, high: 500
    },
    args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-xss-auditor',    // 关闭 XSS Auditor
        '--no-zygote',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--allow-running-insecure-content',     // 允许不安全内容
        '--disable-webgl',
        '--disable-popup-blocking',
        //'--proxy-server=http://127.0.0.1:8080'      // 配置代理
    ],
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
};

const clusterLanuchOptions = {
    concurrency: Cluster.CONCURRENCY_PAGE, //单chrome 多 Tab模式
    maxConcurrency: 20,//并发work数
    retryLimit: 2,//重试次数
    skipDuplicateUrls: true, //不爬重复 url
    monitor: true,//显示消耗性能
    puppeteerOptions: launchOptions,
}
(async () => {
    const cluster = await Cluster.launch(clusterLanuchOptions);
    const cluster2 = await Cluster.launch(clusterLanuchOptions);
    await cluster2.task(async ({page, data: url})=>{
        let urlTrue = url.split();
        await page.goto(urlTrue);
        await page.waitForSelector('html');
        let title= await page.title()
        let x = path.join(__dirname,'pantrue.txt');
        if (title.indexOf('不存在') === -1){
            let value = '';
            if (title.indexOf('分享无限制')){
                value = urlTrue + ' ' + title + '\n';
            }else{
                value = url.split(' ')[1].substr(0, 20) + ' ' + url.split(' ')[2] + ' ' + urlTrue + ' ' + title + '\n';
            }
            // fs.writeFile(x,value,{flag,'a'},function (err){
            //     if (err !==null){
            //         console.log(err);
            //     }
            // });
        }
    });

    await cluster.task(async ({page, data: url}) => {
        await page.goto(url);
        await page.waitForSelector('html');
        let title = await page.title();
        await page.content();
        let x = "D:\\workspace\\node\\check\\bbs\\controllers\\pan.txt";
        let y = "D:\\workspace\\node\\check\\bbs\\controllers\\outDomain.txt";
        let yuanDomain = urllib.parse(urlTrue);
        let newDomain = urllib.parse(url);

        if (yuanDomain.hostname !== newDomain.hostname) {
            if (!outUrlSet.has(newDomain.hostname)) {
                fs.writeFile(y, url + ' ' + title + '\n', {
                    flag: 'a'
                }, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                outUrlSet.add(newDomain.hostname);
            }
        } else {
            let links = await page.$$eval('[src],[href],[action],[data-url],[longDesc],[lowsrc]', get_src_and_href_links);
            let res = await parseLinks(links, url);
            console.log({links: links.length}, {res: res.length});
            for (let i = 0; i < res.length; i++) {
                let link = res[i];
                if (link !== undefined && link.indexOf("pan.baidu.com") !== -1) {
                    // todo 存起来
                    if (!panSet.has(link)) {
                        fs.writeFile(x, link + ' ' + title + ' ' + url + '\n', {
                            flag: 'a'
                        }, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        });
                        cluster2.queue(link + ' ' + title + ' ' + url);
                        panSet.add(link);
                    }
                } else {
                    cluster.queue(link);
                }
            }
        }
    });

    cluster.queue('http://www.xxxxx.com/');
    await cluster.idle();
    await cluster.close();
})();
async function parseLinks(links, url) {
    let result = [];
    // 处理url
    return result;
}

function get_src_and_href_links(nodes) {
    let result = [];
    // 获取节点中的所有
    return result;
}

let {text,html} = await page.$$eval('strong', getTiQuMa);
function getTiQuMa(nodes) {
    let html = '';
    let text = '';
    for (let node of nodes) {
        let treeWalker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function (node1) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        while (treeWalker.nextNode()) {
            let element = treeWalker.currentNode;
            text = text + ' ' + element.innerText;
        }
    }
    return {text: text, html: html};
}
