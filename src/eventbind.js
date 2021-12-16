/*
 * @Date: 2021-12-14 12:57:43
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 14:11:57
 * @FilePath: /DayCode/src/eventbind.js
 */
module.exports = {
  addEventListener,
}
function addEventListener(el, type, callback, tag){
  if(typeof el == 'string'){
    el = document.querySelector(el);
  }
  if(!tag){
    el.addEventListener(type, callback);
  } else {
    el.addEventListener(type, function(e){
      const target = e.target;
      if(target.matches(tag)){
        callback.call(target, e);
      }
    })
  }
}