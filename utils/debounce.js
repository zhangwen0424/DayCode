/*
 * @Date: 2021-07-17 22:33:09
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-07-19 15:00:09
 * @FilePath: /DayCode/utils/debounce.js
 */

/* 
    使用：
        <button onclick="debounce(function submit(){}, 1000)">按钮点击</button>
    作用：
        onresize,mouseover,mousehover等频繁触发耗费计算机性能的场景
    缺点：
        规定时间内不断触发会被不断延迟
 */


/**
 * 防抖函数
 * @param {回调函数} fn 
 * @param {时间间隔} time 
 * @returns 
 */
function debounce(fn, time=300) {
    let timer;
    return function() {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this);
            timer = null;
        }, timeout);
    }
}