const puppeteer=require("puppeteer");
let cTab;
let {answer}=require("./code");
(async function fn(){
    try{
        let browseropenPromise=puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        let browser=await browseropenPromise;
        let allTabs= await browser.pages();
        cTab=allTabs[0];
        await cTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await cTab.type("input[name='username']","gajof45160@zcai77.com",{delay:100});
        await cTab.type("input[name='password']","123456",{delay:100});
        await cTab.click("button[type='submit']");
        await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        await waitAndClick("a[data-attr1='warmup']");
        await cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']");
        let curPageurl=await cTab.url();
        for(let i=0;i<answer.length;i++){
            let qObj=answer[i];
            await questionSolver(qObj.qName,qObj.soln,curPageurl);
        }

    }
    catch(err){
        return new Error(err);
    }
})();

async function waitAndClick(selector){
        try{
            await cTab.waitForSelector(selector,{visible:true});
        await cTab.click(selector);
        }
        catch(err){
            return new Error(err);
        }
}

async function questionSolver(qName,soln,mainPage){
    await cTab.goto(mainPage);
    await cTab.evaluate(consoleFn,qName,".challengecard-title");
    await cTab.waitForSelector("div[data-attr2='Submissions']", { visible: true });
    await waitAndClick(".checkbox-input");
    await cTab.waitForSelector(".custominput", { visible: true });
    await cTab.type(".custominput", soln, { delay: 10 });
    await cTab.keyboard.down("Control");
    await cTab.keyboard.press("a");
    await cTab.keyboard.press("x");
    await cTab.click(".monaco-editor.no-user-select.vs");
    await cTab.keyboard.press("a");
    await cTab.keyboard.press("v");
    await cTab.click(".hr-monaco-submit");
    await cTab.keyboard.up("Control");
}

function consoleFn(qName,selector){
    let queElem=document.querySelectorAll(selector);
    for(let i=0;i<queElem.length;i++){
        let cName=queElem[i].innerText.split("\n")[0];
        if(qName==cName){
            return queElem[i].click();
        }
    }
}