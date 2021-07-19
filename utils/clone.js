/*
 * @Date: 2021-07-19 14:25:03
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-07-19 14:50:24
 * @FilePath: /DayCode/utils/clone.js
 */

/**
   浅拷贝：只拷贝第一层，基本数据类型值，引用类型的引用地址
   使用场景：
        Object.assign();
        Array.protptype.concat();
        Array.protptype.slice();
        [...array]
 */



/**
 * 浅拷贝
 * @param {拷贝对象} source 
 * @returns 
 */
function cloneShallow(source){
    let target = {};
    for(let key in source) {
        if(Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
    return target;
}


// 测试用例
let a = {
    a: '1',
    b: {name: 'stduy', book: 'js高级'},
    c: null,
    d: undefined,
    e: function(){},
}

// 通过Object.assign()
// let b = Object.assign({}, a);
// a.a = "test";
// a.b.book1 = "vue高级"
// console.log("Object.assign:", b);

// 通过cloneShallow
let b = cloneShallow(a);
a.a = "test";
a.b.book1 = "vue高级"
console.log("cloneShallow:", b);
/* 
cloneShallow: { a: '1',
  b: { name: 'stduy', book: 'js高级', book1: 'vue高级' },
  c: null,
  d: undefined,
  e: [Function: e] } 
*/