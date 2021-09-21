const puppeteer=require("puppeteer");
let cTab;
let {answer}=require("./code");
let browseropenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
})

browseropenPromise
.then(function(browser){
    let allTabsPromise=browser.pages();
    return allTabsPromise;
})
.then(function(allTabs){
    cTab=allTabs[0];
    let visitLoginPagePromise=cTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    return visitLoginPagePromise;
})
.then(function(){
    let emailTypingPromise=cTab.type("input[name='username']","gajof45160@zcai77.com",{delay:100});
    return emailTypingPromise;
})
.then(function(){
    let passwordTypingPromise=cTab.type("input[name='password']","123456",{delay:100});
    return passwordTypingPromise;
})
.then(function(){
    let buttonPromise=cTab.click("button[type='submit']");
    return buttonPromise;
})
.then(function(){
    let IPkitPromise=waitAndClick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return IPkitPromise;
})
.then(function(){
    let WarmupPromise=waitAndClick("a[data-attr1='warmup']");
    return WarmupPromise;
})
.then(function(){
    let waitLinkPromise=cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']");
    return waitLinkPromise;
})
.then(function(){
    function ConsoleWalaFn(){
        let allElem=document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']");
        let linkArr=[];
        for(let i=0;i<allElem.length;i++){
            linkArr.push(allElem[i].getAttribute("href"));
        }
        return linkArr;
    }
    let linkArrPromise=cTab.evaluate(ConsoleWalaFn);
    return linkArrPromise;
})
.then(function(linkArr){
    let QueWillBeSolvedPromise=questionSolver(linkArr[0],0) ;
    for(let i=1;i<linkArr.length;i++){
        QueWillBeSolvedPromise=QueWillBeSolvedPromise.then(function(){
            let qsp=questionSolver(linkArr[i],i);
            return qsp;
        })
    }
    return QueWillBeSolvedPromise;
})

function waitAndClick(selector){
    return new Promise(function(resolve,reject){
        let waitPromise=cTab.waitForSelector(selector,{visible:true})
        waitPromise.then(function(){
            let clickPromise=cTab.click(selector);
            return clickPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })
}

function questionSolver(url,idx){
    return new Promise(function(resolve,reject){
        let fullLink=`https://hackerrank.com${url}`;
        let goToQuestionPromise=cTab.goto(fullLink);
        goToQuestionPromise
        .then(function(){
            console.log(1);
            let waitForCheckBoxAndClick=waitAndClick(".checkbox-input");
            return waitForCheckBoxAndClick;
            //input wait box and click
         })
        .then(function(){
            console.log(2);
            let waitForTextbox=cTab.waitForSelector(".custominput",{visible:true});
            return waitForTextbox;
        })
        .then(function(){
            console.log(3);
            let codewillBeAddedPromise=cTab.type(".custominput",answer[idx],{delay:10});
            return codewillBeAddedPromise;
        })
        .then(function () {
            console.log(4);
            let ctrWillBeDownPromise = cTab.keyboard.down("Control");
            return ctrWillBeDownPromise;
        }).then(function () {
            let aWillBepressedPromise = cTab.keyboard.press("a");
            return aWillBepressedPromise;
        }).then(function () {
            let xWillBepressedPromise = cTab.keyboard.press("x");
            return xWillBepressedPromise;
        }).then(function () {
            let pointerWillBeclicked = cTab.click(".monaco-editor.no-user-select.vs");
            return pointerWillBeclicked;
        }).then(function () {
            let awillBePressedOnpinter = cTab.keyboard.press("a");
            return awillBePressedOnpinter;
        }).then(function () {
            let codePastePromise = cTab.keyboard.press("v");
            return codePastePromise;
        }).then(function () {
            let submitWillClickedPromise = cTab.click(".hr-monaco-submit");
            return submitWillClickedPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })
}