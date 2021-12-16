/*
 * @Date: 2021-12-13 13:42:38
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 14:13:23
 * @FilePath: /DayCode/src/function.js
 */

module.exports = {
  call,
  bind,
  apply,
  debounce,
  throttle,
}

/**
 * 
 * @param {function} fn 
 * @param {object} obj 
 * @param  {...any} args 
 * @returns 
 */
function call(fn, obj, ...args){
  if(obj === undefined || obj === null){
    obj = globalThis;
  }
  obj.tmp = fn;
  let result = obj.tmp(...args);
  delete obj.tmp;
  return result;
}

/**
 * 
 * @param {function} fn 
 * @param {object} obj 
 * @param {*} args 
 * @returns 
 */
function apply(fn, obj, args){
  if(obj === undefined || obj === null){
    obj = globalThis;
  }
  obj.tmp = fn;
  let result = obj.tmp(...args);
  delete obj.tmp;
  return result;
}

/**
 * 
 * @param {function} fn 
 * @param {object} obj 
 * @param  {...any} args 
 * @returns 
 */
function bind(fn, obj, ...args){
  return function(...arg2){
    return call(fn, obj, ...args, ...arg2);
  }
}

/**
 * 
 * @param {function} fn 
 * @param {number} time 
 * @returns 
 */
function debounce(fn, time=1000) {
  let timer;
  return function(e){
    timer && clearTimeout(timer);
    timer = setTimeout(function(){
      fn.call(this, e);
      timer = null;
    }, time);
  }
}

function throttle(fn, time=1000){
  let start = 0;
  return function(e){
    let now = new Date();
    if(now-start>=time){
      fn.call(this, e);
      start =  now;
    }
  }
}

