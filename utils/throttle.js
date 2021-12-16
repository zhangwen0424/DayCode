/*
 * @Date: 2021-07-18 17:57:39
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 11:52:44
 * @FilePath: /DayCode/utils/throttle.js
 */



/**
 * 规定时间内直执行一次
 */


/**
 * 节流函数
 * @param {回调函数} fn 
 * @param {时间间隔} time 
 * @returns 
 */
/* function throttle(fn,time=300) {
    let flag;
    return function(){
        if(flag) return;
        flag = setTimeout(function(){
            fn.apply(this);
            flag = null
        },time);
    }
} */
function throttle(fn, time=300){
    let start = 0;
    return function(){
        let now = new Date();
        if(now-start > time){
            start = now;
            fn.call(this);
        }
    }
}
