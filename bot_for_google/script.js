// ==UserScript==
// @name         Bot for google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'],
    "crushdrummers.ru":['Барабанное шоу','Заказать барабанное шоу','Шоу барабанщиков в Москве']
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let googleInput = document.getElementsByName('q')[0];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];
let btnK = document.getElementsByName('btnK')[0];
let i =0;
let links = document.links;

if (btnK != undefined){
    document.cookie = "site="+site;
}else if (location.hostname == "www.google.com"){
    site = getCookie("site");
}else{
    site = location.hostname;
}


if (btnK != undefined){
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        googleInput.value += keyword[i];
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },1000);
}else if(location.hostname == site){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if (getRandom(0,101)>=80){
            location.href = 'https://www.google.com/';
        }
        else if (links[index].href.indexOf(site) != -1)
            links[index].click();
    },getRandom(3000,7000));
}else{
    let nextGooglePage = true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site) != -1){
            let link = links[i];
            nextGooglePage = false;
            setTimeout(()=>{link.click();},getRandom(1000,4000));
            break;
        }
    }
    if (document.querySelector('.YyVfkd').innerText=="10"){
        nextGooglePage = false;
        location.href = 'https://www.google.com/';
    }

    if (nextGooglePage){
        setTimeout(()=>{pnnext.click();},getRandom(1000,4000));
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
