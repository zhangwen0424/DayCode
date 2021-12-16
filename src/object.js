/*
 * @Date: 2021-12-14 14:54:24
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 15:19:47
 * @FilePath: /DayCode/src/object.js
 */

/**
 * 手写new
 * @param {function} Fn 
 * @param  {...any} args 
 * @returns 
 */
function myInstance(Fn, ...args) {
  let obj = {};
  obj.__proto__ = Fn.prototype;
  let result = Fn.call(obj, ...args);
  // console.log("result",result)
  return result instanceof Object ? result : obj;
}

/**
 * 手写instanceof
 * @param {obj,function} obj 
 * @param {*} Fn 
 * @returns 
 */
function myInstanceOf(obj, Fn){
  let prototype = Fn.prototype;
  let proto = obj.__proto__;
  while(proto){
    if(prototype === proto){
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

function mergeObject(obj1, obj2){
  
}
