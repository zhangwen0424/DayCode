/*
 * @Date: 2021-07-18 17:57:39
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-07-18 17:58:22
 * @FilePath: /DayCode/utils/throttle.js
 */

// 节流函数

function throttle(fn,time=300) {
    let flag;
    return function(){
        if(flag) return;
        flag = setTimeout(function(){
            fn.apply(this);
            flag = null
        },time);
    }
}

/**
 * 规定时间内直执行一次
 */