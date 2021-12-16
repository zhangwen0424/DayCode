/*
 * @Date: 2021-12-14 13:15:35
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 14:14:20
 * @FilePath: /DayCode/src/pub-sub.js
 */


export const Pubsub = {
  id:1,
  callbacks: {
    // pay: {
    //   token_1: fn,
    //   token_2: fn
    // }
  }
}

// 订阅频道
Pubsub.subscribe = function(channel, callback){
  let token = "token_"+this.id++;
  if(this.callbacks[channel]){
    this.callbacks[channel][token] = callback;
  } else {
    this.callbacks[channel] = {
      [token]: callback
    }
  }
  return token;
}
// 发布消息
Pubsub.publish = function(channel, data){
  let callbacks = this.callbacks[channel];
  if(callbacks){
    Object.keys(callbacks).forEach((token)=>{
      callbacks[token](data);
    })
  }
}
// 取消订阅
Pubsub.unsubscribe = function(flag){
  if(flag == undefined){
    this.callbacks = {};
  } else if(typeof flag === 'string'){
    let callbackObj = Object.values(this.callbacks).find((k)=>k.hasOwnProperty(flag));
    if(callbackObj) {
      delete callbackObj[flag];
    }
  } else {
    delete this.callbacks[flag];
  }
}