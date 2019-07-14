const request = require('request');
const jsdom = require('jsdom');
const log4js = require('log4js');
const fs = require('fs');
const config = require('./config.js');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;
// Configuration for the log file, splitting every 10MB
log4js.configure({
    appenders: {
        tw_script: {
            type: 'file',
            filename: 'log/tw_script.log',
            maxLogSize: 1048576, // Splitting the log every 10MB
            compress: true
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['tw_script', 'console'],
            level: 'info'
        }
    }
});
const logger = log4js.getLogger('tw_login');
const url = config.userData.url.endsWith("/") ? config.userData.url : config.userData.url + "/";
const loginUrl = url + "page/auth"; // URL for account login
const loginWorldUrl = url + "page/play/" + config.userData.world; // URL for world login
let cookie = request.jar(); // Cookies!

getToken();

/**
 * Gets Cross-Site Request Forgery (CSRF) token
 */
function getToken() {
    request(url, function(error, response, body) {
        const dom = new JSDOM(body);
        const document = dom.window.document;
        login(document.querySelector("[name=csrf-token]").getAttribute("content"))
    })
}

/**
 * Log into account
 * @param {String} token CSRF token
 */
function login(token) {
    let t0 = (new Date).getTime();
    logger.info("Logging in ...");
    request({
        url: loginUrl,
        // Headers have been copied from the real POST
        headers: {
            "Host": url.split("/")[2],
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": url,
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRF-Token": token,
            "X-Requested-With": "XMLHttpRequest",
            "Content-Length": 48,
            "Connection": "keep-alive"
        },
        method: 'POST',
        followAllRedirects: true,
        form: {
            username: config.userData.userName,
            password: config.userData.password,
            remember: 1
        },
        jar: cookie
    }, (error, response, body) => {
        const dom = new JSDOM(body);
        // If you desire to see the content of the cookie
        cookie._jar.store.getAllCookies(function(err, cookieArray) {
            if(err) throw new Error("Failed to get cookies");
            logger.debug(JSON.stringify(cookieArray, null, 4)); // Change debug to info to see cookie
        });
        if (error) {
            logger.error(error);
            log4js.shutdown(() => { // .shutdown ensures that the log file is written to correctly and finished writing. Else the process ends before it finishes writing the log file
                return;
            });
        } else if (dom.window.document.getElementsByClassName("error-box").length != 0) { // If an error occurred
            logger.error("Couldn't login.");
            for (let i = 0; i < dom.window.document.getElementsByClassName("error-box").length; i++) {
                logger.error(dom.window.document.getElementsByClassName("error-box")[i].textContent);
            }
            logger.info(response);
            log4js.shutdown(() => { 
                return;
            });
        } else {
            logger.info("Login successful, it took " + ((new Date).getTime() - t0) / 1000 + " seconds.");
            loginWorld();
        }
    })
}

/**
 * Log into world
 */
function loginWorld() {
    request({
        url: loginWorldUrl,
        method: 'GET',
        followAllRedirects: true,
        jar: cookie
    }, function(error, response, body) {
        if (error) {
            logger.error("Couldn't login to world.");
            logger.error(error);
            log4js.shutdown(() => {
                return;
            });
        }
        logger.info("Login to world " + config.userData.world + " successful.");
        fs.writeFile("log/loginWorldBody.html", body, function(err) {
            if(err) {
                return logger.error(err);
            }
        }); 
        startScripts();
    })
}

function startScripts() {
/**
 * -----------------------------------------------------------
 * Call your functions here
 * -----------------------------------------------------------
 */
console.log("Hello world!");
}