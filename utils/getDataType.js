/*
 * @Date: 2021-07-16 11:29:09
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-07-16 14:14:41
 * @FilePath: /project/DayCode/utils/getDataType.js
 */

/**
 * javascript数据类型判断通用方法
 * node utils/getDataType.js
 * @param {*} obj 
 */
function getDataType(obj) {
    let type = typeof obj;
    // 判断是否为基本数据类型
    if(type !== 'object'){
        return type;
    }
    // 除基本数据类型可以用Object.prototype.toString.call判断，需要正则取出类型
    type = Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
    return type;
}

console.log("1",getDataType(undefined));
console.log("2",getDataType({}));
console.log("3",getDataType([]));
console.log("4",getDataType(new Date()));
console.log("5",getDataType(function(){}));
console.log("6",getDataType(true));
console.log("7",getDataType(null));
console.log("8",getDataType(undefined));
console.log("9",getDataType(/\d/));
/* 
1 undefined
2 Object
3 Array
4 Date
5 function
6 boolean 
7 Null
8 undefined
9 RegExp
*/

/* 
涉及到的一些点
typeof
    1.判断原始类型，除了null都可以正确判断，null会判断为object
    2.判断引用类型，除了function都不能准确判断
    3.可以判断未声明的变量，类型为undefined，其他判断未声明变量会报错Uncaught referenceError
instanceof
    1.判断引用类型，不可判断基本数据类型
Object.prototype.toString.call()
    1.可以判断所有类型
    2.统一返回格式为 “[object Xxx]” 的字符串，其中 Xxx 就是对象的类型
 */