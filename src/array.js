/*
 * @Date: 2021-12-13 11:31:30
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 14:06:57
 * @FilePath: /DayCode/src/array.js
 */

/* 
  map
  reduce
 */

module.exports = {
  map,
  reduce,
  filter,
  find,
  findIndex,
  every,
  some,
  uniq,//数组去重 *****
  chunk,//数组分块 *****
  concat,//数组合并
  slice,//数组拆分
  flatten,//数组扁平化 *****
  difference,//数组差集 *****
  pull,//数组删除指定元素
  pullAll,//数组删除指定数组中的元素
  drop,//数组删除指定长度元素
  dropRight,//数组从右开始删除指定长度元素
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 */
function map(arr, callback){
  let result = [];
  for(let i=0;i<arr.length;i++){
    result.push(callback((arr[i], i)));
  }
  return result;
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 * @param {*} initial 
 * @returns 
 */
function reduce(arr, callback, initial){
  let result = initial;
  for(let i=0;i<arr.length;i++){
    result = callback(result, arr[i],i);
  }
  return result;
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 * @returns 
 */
function filter(arr, callback){
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(callback(arr[i],i)){
      result.push(arr[i])
    }
  }
  return result;
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 * @returns 
 */
function find(arr, callback){
  for(let i=0;i<arr.length;i++){
    if(callback(arr[i])){
      return  arr[i]
    }
  }
  return undefined
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 * @returns 
 */
function findIndex(arr, callback){
  for(let i=0;i<arr.length;i++){
    if(callback(arr[i], i)){
      return i;
    }
  }
  return -1;
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 * @returns 
 */
function every(arr, callback){
  for(let i=0;i<arr.length;i++){
    if(!callback(arr[i], i)){
      return false;
    }
  }
  return true
}

/**
 * 
 * @param {array} arr 
 * @param {function} callback 
 * @returns 
 */
function some(arr, callback){
  for(let i=0;i<arr.length;i++){
    if(callback(arr[i],i)){
      return true;
    }
  }
  return false;
}

/**
 * 
 * @param {array} arr 
 * @returns 
 */
function uniq(arr){
  return [...new Set(arr)];
}
function uniq1(arr){
  return Array.from(new Set(arr))
}
function uniq2(arr){
  let result = [];
  arr.forEach(function(v){
    if(result.indexOf(v) == -1){
      result.push(v)
    }
  })
  return result;
}
function uniq3(arr){
  let obj = {};
  let result = [];
  arr.forEach(function(v){
    if(!obj[v]){
      obj[v] = true;
      result.push(v);
    }
  });
  return result;
}

/**
 * 
 * @param {array} arr 
 * @param {num} size 
 * @returns 
 */
function chunk(arr, size=1){
  let result = [];
  let tmp = [];
  for(let i=0;i<arr.length; i++){
    if(tmp.length == 0){
      result.push(tmp);
    }
    tmp.push(arr[i]);
    if(tmp.length == size){
      tmp = [];
    }
  }
  return result;
}

/**
 * 
 * @param {array} arr 
 * @param  {...any} args 
 * @returns 
 */
function concat(arr, ...args){
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      result.push(...arr[i])
      // concat(arr[i])
    } else {
      result.push(arr[i]);
    }
  }
  return result
}

/**
 * 
 * @param {array} arr 
 * @param {number} begin 
 * @param {number} end 
 * @returns 
 */
function slice(arr, begin=0, end=arr.length){
  // arr
  if(arr.length == 0){
    arr = [];
  }
  // begin
  if(begin>arr.length){
    return [];
  }
  //end
  if(end<begin){
    end = arr.length;
  }
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(i>=begin && i<end){
      result.push(arr[i])
    }
  }
  return result;
}

/**
 * 
 * @param {array} arr 
 * @returns 
 */
function flatten(arr){
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      result = result.concat(flatten(arr[i]));
    } else {
      result = result.concat(arr[i]);
    }
  }
  return result;
}
function flatten1(arr){
  let result = [...arr];
  while(result.some(v=>Array.isArray(v))){
    result = [].concat(...result);
  }
  return result;
}

/**
 * 
 * @param {array} arr1 
 * @param {array} arr2 
 * @returns 
 */
function difference(arr1=[],arr2=[]){
  if(arr1.length == 0){
    return [];
  }
  if(arr2.length == 0){
    return arr1.slice();
  }
  return arr1.filter(v=>!arr2.includes(v));
}

/**
 * 
 * @param {array} arr 
 * @param  {...any} args 
 * @returns 
 */
function pull(arr, ...args){
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(args.includes(arr[i])){
      result.push(arr[i]);
      arr.splice(i,1);
      i--;
    }
  }
  return result;
}
function pullAll(arr, args){
  return pull(arr, ...args);
}

/**
 * 
 * @param {array} arr 
 * @param {number} size 
 * @returns 
 */
function drop(arr,size){
  return arr.filter((v,i)=>i>=size)
}
/**
 * 
 * @param {array} arr 
 * @param {number} size 
 * @returns 
 */
function dropRight(arr, size){
  return arr.filter((v,i)=>i<arr.length-size)
}