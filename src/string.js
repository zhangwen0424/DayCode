/*
 * @Date: 2021-12-14 13:41:33
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 13:47:53
 * @FilePath: /DayCode/src/string.js
 */

module.exports = {
  reverseString, //字符串反转
  palindrome, //是否为回文字符串
  truncate, //字符串截取
}

/**
 * 字符串反转
 * @param {strong} str 
 * @returns 
 */
function reverseString(str){
  let arr = [...str];
  console.log("arr",arr)
  return arr.reverse().join('')
}

/**
 * 是否为回文字符串
 * @param {string} str 
 * @returns 
 */
function palindrome(str){
  return reverseString(str) == str;
}

/**
 * 字符串截取
 * @param {string} str 
 * @param {number} size 
 * @returns 
 */
function truncate(str, size){
  return str.slice(0,size)+'...'
}