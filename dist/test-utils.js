/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utils"] = factory();
	else
		root["utils"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/array.js":
/*!**********************!*\
  !*** ./src/array.js ***!
  \**********************/
/***/ ((module) => {

eval("/*\n * @Date: 2021-12-13 11:31:30\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:06:57\n * @FilePath: /DayCode/src/array.js\n */\n\n/* \n  map\n  reduce\n */\n\nmodule.exports = {\n  map,\n  reduce,\n  filter,\n  find,\n  findIndex,\n  every,\n  some,\n  uniq,//数组去重 *****\n  chunk,//数组分块 *****\n  concat,//数组合并\n  slice,//数组拆分\n  flatten,//数组扁平化 *****\n  difference,//数组差集 *****\n  pull,//数组删除指定元素\n  pullAll,//数组删除指定数组中的元素\n  drop,//数组删除指定长度元素\n  dropRight,//数组从右开始删除指定长度元素\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n */\nfunction map(arr, callback){\n  let result = [];\n  for(let i=0;i<arr.length;i++){\n    result.push(callback((arr[i], i)));\n  }\n  return result;\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n * @param {*} initial \n * @returns \n */\nfunction reduce(arr, callback, initial){\n  let result = initial;\n  for(let i=0;i<arr.length;i++){\n    result = callback(result, arr[i],i);\n  }\n  return result;\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n * @returns \n */\nfunction filter(arr, callback){\n  let result = [];\n  for(let i=0;i<arr.length;i++){\n    if(callback(arr[i],i)){\n      result.push(arr[i])\n    }\n  }\n  return result;\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n * @returns \n */\nfunction find(arr, callback){\n  for(let i=0;i<arr.length;i++){\n    if(callback(arr[i])){\n      return  arr[i]\n    }\n  }\n  return undefined\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n * @returns \n */\nfunction findIndex(arr, callback){\n  for(let i=0;i<arr.length;i++){\n    if(callback(arr[i], i)){\n      return i;\n    }\n  }\n  return -1;\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n * @returns \n */\nfunction every(arr, callback){\n  for(let i=0;i<arr.length;i++){\n    if(!callback(arr[i], i)){\n      return false;\n    }\n  }\n  return true\n}\n\n/**\n * \n * @param {array} arr \n * @param {function} callback \n * @returns \n */\nfunction some(arr, callback){\n  for(let i=0;i<arr.length;i++){\n    if(callback(arr[i],i)){\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * \n * @param {array} arr \n * @returns \n */\nfunction uniq(arr){\n  return [...new Set(arr)];\n}\nfunction uniq1(arr){\n  return Array.from(new Set(arr))\n}\nfunction uniq2(arr){\n  let result = [];\n  arr.forEach(function(v){\n    if(result.indexOf(v) == -1){\n      result.push(v)\n    }\n  })\n  return result;\n}\nfunction uniq3(arr){\n  let obj = {};\n  let result = [];\n  arr.forEach(function(v){\n    if(!obj[v]){\n      obj[v] = true;\n      result.push(v);\n    }\n  });\n  return result;\n}\n\n/**\n * \n * @param {array} arr \n * @param {num} size \n * @returns \n */\nfunction chunk(arr, size=1){\n  let result = [];\n  let tmp = [];\n  for(let i=0;i<arr.length; i++){\n    if(tmp.length == 0){\n      result.push(tmp);\n    }\n    tmp.push(arr[i]);\n    if(tmp.length == size){\n      tmp = [];\n    }\n  }\n  return result;\n}\n\n/**\n * \n * @param {array} arr \n * @param  {...any} args \n * @returns \n */\nfunction concat(arr, ...args){\n  let result = [];\n  for(let i=0;i<arr.length;i++){\n    if(Array.isArray(arr[i])){\n      result.push(...arr[i])\n      // concat(arr[i])\n    } else {\n      result.push(arr[i]);\n    }\n  }\n  return result\n}\n\n/**\n * \n * @param {array} arr \n * @param {number} begin \n * @param {number} end \n * @returns \n */\nfunction slice(arr, begin=0, end=arr.length){\n  // arr\n  if(arr.length == 0){\n    arr = [];\n  }\n  // begin\n  if(begin>arr.length){\n    return [];\n  }\n  //end\n  if(end<begin){\n    end = arr.length;\n  }\n  let result = [];\n  for(let i=0;i<arr.length;i++){\n    if(i>=begin && i<end){\n      result.push(arr[i])\n    }\n  }\n  return result;\n}\n\n/**\n * \n * @param {array} arr \n * @returns \n */\nfunction flatten(arr){\n  let result = [];\n  for(let i=0;i<arr.length;i++){\n    if(Array.isArray(arr[i])){\n      result = result.concat(flatten(arr[i]));\n    } else {\n      result = result.concat(arr[i]);\n    }\n  }\n  return result;\n}\nfunction flatten1(arr){\n  let result = [...arr];\n  while(result.some(v=>Array.isArray(v))){\n    result = [].concat(...result);\n  }\n  return result;\n}\n\n/**\n * \n * @param {array} arr1 \n * @param {array} arr2 \n * @returns \n */\nfunction difference(arr1=[],arr2=[]){\n  if(arr1.length == 0){\n    return [];\n  }\n  if(arr2.length == 0){\n    return arr1.slice();\n  }\n  return arr1.filter(v=>!arr2.includes(v));\n}\n\n/**\n * \n * @param {array} arr \n * @param  {...any} args \n * @returns \n */\nfunction pull(arr, ...args){\n  let result = [];\n  for(let i=0;i<arr.length;i++){\n    if(args.includes(arr[i])){\n      result.push(arr[i]);\n      arr.splice(i,1);\n      i--;\n    }\n  }\n  return result;\n}\nfunction pullAll(arr, args){\n  return pull(arr, ...args);\n}\n\n/**\n * \n * @param {array} arr \n * @param {number} size \n * @returns \n */\nfunction drop(arr,size){\n  return arr.filter((v,i)=>i>=size)\n}\n/**\n * \n * @param {array} arr \n * @param {number} size \n * @returns \n */\nfunction dropRight(arr, size){\n  return arr.filter((v,i)=>i<arr.length-size)\n}\n\n//# sourceURL=webpack://utils/./src/array.js?");

/***/ }),

/***/ "./src/axios.js":
/*!**********************!*\
  !*** ./src/axios.js ***!
  \**********************/
/***/ ((module) => {

eval("/*\n * @Date: 2021-12-14 12:29:50\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:10:21\n * @FilePath: /DayCode/src/axios.js\n */\n\nmodule.exports = {\n  axios,\n}\n\nfunction axios({ url, method, params, data}){\n  method = method.toUpperCase();\n  // console.log(\"method\", method);\n  // console.log(\"params\", params);\n  return new Promise((resolve, reject)=>{\n    const xhr = new XMLHttpRequest();\n    // 处理params\n    let string = '';\n    for(let p in params){\n      string += p+'='+params[p];\n    }\n    // console.log(string);\n    xhr.open(method, url+'?'+string);\n    if(['POST', 'PUT', 'DELETE'].includes(method)){\n      xhr.setRequestHeader('Content-type', 'application/json')\n      xhr.send(JSON.stringify(data))\n    } else {\n      xhr.send();\n    }\n\n    xhr.responseType = 'json';\n    xhr.onreadystatechange = function(){\n      if(xhr.readyState == 4) {\n        if(xhr.status >= 200 && xhr.status < 300){\n          resolve({\n            status: xhr.status,\n            message: xhr.statusText,\n            body: xhr.response\n          })\n        } else {\n          reject(new Error(\"请求失败，状态码：\"+xhr.status))\n        }\n      }\n    }\n\n    \n\n    resolve();\n  })\n}\n\naxios.get = function (url, options){\n  let config = Object.assign(options, {method:'GET',url: url})\n  return axios(config);\n}\naxios.post = function(url, options){\n  let config = Object.assign(options, {method:'POST',url: url})\n  return axios(config);\n}\naxios.put = function(url, options){\n  let config = Object.assign(options, {method:'PUT',url: url})\n  return axios(config);\n}\naxios.delete = function(url, options){\n  let config = Object.assign(options, {method:'DELETE',url: url})\n  return axios(config);\n}\n\n//# sourceURL=webpack://utils/./src/axios.js?");

/***/ }),

/***/ "./src/eventbind.js":
/*!**************************!*\
  !*** ./src/eventbind.js ***!
  \**************************/
/***/ ((module) => {

eval("/*\n * @Date: 2021-12-14 12:57:43\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:11:57\n * @FilePath: /DayCode/src/eventbind.js\n */\nmodule.exports = {\n  addEventListener,\n}\nfunction addEventListener(el, type, callback, tag){\n  if(typeof el == 'string'){\n    el = document.querySelector(el);\n  }\n  if(!tag){\n    el.addEventListener(type, callback);\n  } else {\n    el.addEventListener(type, function(e){\n      const target = e.target;\n      if(target.matches(tag)){\n        callback.call(target, e);\n      }\n    })\n  }\n}\n\n//# sourceURL=webpack://utils/./src/eventbind.js?");

/***/ }),

/***/ "./src/eventbus.js":
/*!*************************!*\
  !*** ./src/eventbus.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eventBus\": () => (/* binding */ eventBus)\n/* harmony export */ });\n/*\n * @Date: 2021-12-14 13:06:16\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:12:05\n * @FilePath: /DayCode/src/eventbus.js\n */\n\nconst eventBus = {\n  callbacks: {}\n}\n\n// 绑定事件\neventBus.on = function(type, callback){\n  if(this.callbacks[type]){\n    this.callbacks[type].push(callback)\n  } else {\n    this.callbacks[type] = [callback];\n  }\n}\n// 触发事件\neventBus.emit = function(type, data){\n  let callbacks = this.callbacks[type];\n  if(callbacks && callbacks.length){\n    callbacks.forEach(callback=>{\n      callback(data);\n    })\n  }\n}\n// 解绑事件\neventBus.off = function(eventName){\n  if(eventName){\n    delete this.callbacks[eventName];\n  } else {\n    this.callbacks = {};\n  }\n}\n\n//# sourceURL=webpack://utils/./src/eventbus.js?");

/***/ }),

/***/ "./src/function.js":
/*!*************************!*\
  !*** ./src/function.js ***!
  \*************************/
/***/ ((module) => {

eval("/*\n * @Date: 2021-12-13 13:42:38\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:13:23\n * @FilePath: /DayCode/src/function.js\n */\n\nmodule.exports = {\n  call,\n  bind,\n  apply,\n  debounce,\n  throttle,\n}\n\n/**\n * \n * @param {function} fn \n * @param {object} obj \n * @param  {...any} args \n * @returns \n */\nfunction call(fn, obj, ...args){\n  if(obj === undefined || obj === null){\n    obj = globalThis;\n  }\n  obj.tmp = fn;\n  let result = obj.tmp(...args);\n  delete obj.tmp;\n  return result;\n}\n\n/**\n * \n * @param {function} fn \n * @param {object} obj \n * @param {*} args \n * @returns \n */\nfunction apply(fn, obj, args){\n  if(obj === undefined || obj === null){\n    obj = globalThis;\n  }\n  obj.tmp = fn;\n  let result = obj.tmp(...args);\n  delete obj.tmp;\n  return result;\n}\n\n/**\n * \n * @param {function} fn \n * @param {object} obj \n * @param  {...any} args \n * @returns \n */\nfunction bind(fn, obj, ...args){\n  return function(...arg2){\n    return call(fn, obj, ...args, ...arg2);\n  }\n}\n\n/**\n * \n * @param {function} fn \n * @param {number} time \n * @returns \n */\nfunction debounce(fn, time=1000) {\n  let timer;\n  return function(e){\n    timer && clearTimeout(timer);\n    timer = setTimeout(function(){\n      fn.call(this, e);\n      timer = null;\n    }, time);\n  }\n}\n\nfunction throttle(fn, time=1000){\n  let start = 0;\n  return function(e){\n    let now = new Date();\n    if(now-start>=time){\n      fn.call(this, e);\n      start =  now;\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack://utils/./src/function.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n * @Date: 2021-12-13 11:35:00\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:13:59\n * @FilePath: /DayCode/src/index.js\n */\n  // ...require('./array')\n\n// export function test() {\n//   console.log(\"test\");\n// }\n// export function test() {\n//     document.write('测试自定义包');\n//     console.log('test()')\n// }\nmodule.exports = {\n  ...__webpack_require__(/*! ./array.js */ \"./src/array.js\"),\n  ...__webpack_require__(/*! ./axios.js */ \"./src/axios.js\"),\n  ...__webpack_require__(/*! ./eventbind.js */ \"./src/eventbind.js\"),\n  ...__webpack_require__(/*! ./eventbus.js */ \"./src/eventbus.js\"),\n  ...__webpack_require__(/*! ./function.js */ \"./src/function.js\"),\n  ...__webpack_require__(/*! ./pub-sub.js */ \"./src/pub-sub.js\"),\n  ...__webpack_require__(/*! ./string.js */ \"./src/string.js\"),\n}\n\n//# sourceURL=webpack://utils/./src/index.js?");

/***/ }),

/***/ "./src/pub-sub.js":
/*!************************!*\
  !*** ./src/pub-sub.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pubsub\": () => (/* binding */ Pubsub)\n/* harmony export */ });\n/*\n * @Date: 2021-12-14 13:15:35\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 14:14:20\n * @FilePath: /DayCode/src/pub-sub.js\n */\n\n\nconst Pubsub = {\n  id:1,\n  callbacks: {\n    // pay: {\n    //   token_1: fn,\n    //   token_2: fn\n    // }\n  }\n}\n\n// 订阅频道\nPubsub.subscribe = function(channel, callback){\n  let token = \"token_\"+this.id++;\n  if(this.callbacks[channel]){\n    this.callbacks[channel][token] = callback;\n  } else {\n    this.callbacks[channel] = {\n      [token]: callback\n    }\n  }\n  return token;\n}\n// 发布消息\nPubsub.publish = function(channel, data){\n  let callbacks = this.callbacks[channel];\n  if(callbacks){\n    Object.keys(callbacks).forEach((token)=>{\n      callbacks[token](data);\n    })\n  }\n}\n// 取消订阅\nPubsub.unsubscribe = function(flag){\n  if(flag == undefined){\n    this.callbacks = {};\n  } else if(typeof flag === 'string'){\n    let callbackObj = Object.values(this.callbacks).find((k)=>k.hasOwnProperty(flag));\n    if(callbackObj) {\n      delete callbackObj[flag];\n    }\n  } else {\n    delete this.callbacks[flag];\n  }\n}\n\n//# sourceURL=webpack://utils/./src/pub-sub.js?");

/***/ }),

/***/ "./src/string.js":
/*!***********************!*\
  !*** ./src/string.js ***!
  \***********************/
/***/ ((module) => {

eval("/*\n * @Date: 2021-12-14 13:41:33\n * @LastEditors: zhangwen\n * @LastEditTime: 2021-12-14 13:47:53\n * @FilePath: /DayCode/src/string.js\n */\n\nmodule.exports = {\n  reverseString, //字符串反转\n  palindrome, //是否为回文字符串\n  truncate, //字符串截取\n}\n\n/**\n * 字符串反转\n * @param {strong} str \n * @returns \n */\nfunction reverseString(str){\n  let arr = [...str];\n  console.log(\"arr\",arr)\n  return arr.reverse().join('')\n}\n\n/**\n * 是否为回文字符串\n * @param {string} str \n * @returns \n */\nfunction palindrome(str){\n  return reverseString(str) == str;\n}\n\n/**\n * 字符串截取\n * @param {string} str \n * @param {number} size \n * @returns \n */\nfunction truncate(str, size){\n  return str.slice(0,size)+'...'\n}\n\n//# sourceURL=webpack://utils/./src/string.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});