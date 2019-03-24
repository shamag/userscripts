// ==UserScript==
// @name jiraGoods
// @description Мой самый первый юзерскрипт
// @author Andrey
// @license MIT
// @version 1.0
// @include https://jira.goods.ru/*
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    // В юзерскрипты можно вставлять практически любые javascript-библиотеки.
    // Код библиотеки копируется прямо в юзерскрипт.
    // При подключении библиотеки нужно передать w в качестве параметра окна window
    // Пример: подключение jquery.min.js
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    // [4] дополнительная проверка наряду с @include
    if (/https:\/\/jira.goods.ru/.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта
        const redoFn = () => {
        const transitions = document.querySelector("#activitymodule");
        const details = document.querySelector('#issuedetails');
        let isRedo = false;
        let redoEl;
        transitions.querySelectorAll(".jira-issue-status-lozenge").forEach(dom => {
            if (dom.textContent === "REDO") {
            isRedo = true;
                redoEl = dom;
            }
        });
            if (isRedo && transitions) {
            var li = document.createElement('li');
            li.className = "item";
            li.innerHTML = "<div clas='wrap'><strong class='name'>REDO</strong><span class=' jira-issue-status-lozenge aui-lozenge jira-issue-status-lozenge-yellow jira-issue-status-lozenge-indeterminate jira-issue-status-lozenge-max-width-medium'>REDO</span></div>";
            details.appendChild(li);
        }
        }
        redoFn();
    }
})(window);