/*
 * @Date: 2021-12-14 13:06:16
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 14:12:05
 * @FilePath: /DayCode/src/eventbus.js
 */

export const eventBus = {
  callbacks: {}
}

// 绑定事件
eventBus.on = function(type, callback){
  if(this.callbacks[type]){
    this.callbacks[type].push(callback)
  } else {
    this.callbacks[type] = [callback];
  }
}
// 触发事件
eventBus.emit = function(type, data){
  let callbacks = this.callbacks[type];
  if(callbacks && callbacks.length){
    callbacks.forEach(callback=>{
      callback(data);
    })
  }
}
// 解绑事件
eventBus.off = function(eventName){
  if(eventName){
    delete this.callbacks[eventName];
  } else {
    this.callbacks = {};
  }
}