/*
 * @Date: 2021-12-14 12:29:50
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-14 14:10:21
 * @FilePath: /DayCode/src/axios.js
 */

module.exports = {
  axios,
}

function axios({ url, method, params, data}){
  method = method.toUpperCase();
  // console.log("method", method);
  // console.log("params", params);
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    // 处理params
    let string = '';
    for(let p in params){
      string += p+'='+params[p];
    }
    // console.log(string);
    xhr.open(method, url+'?'+string);
    if(['POST', 'PUT', 'DELETE'].includes(method)){
      xhr.setRequestHeader('Content-type', 'application/json')
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send();
    }

    xhr.responseType = 'json';
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4) {
        if(xhr.status >= 200 && xhr.status < 300){
          resolve({
            status: xhr.status,
            message: xhr.statusText,
            body: xhr.response
          })
        } else {
          reject(new Error("请求失败，状态码："+xhr.status))
        }
      }
    }

    

    resolve();
  })
}

axios.get = function (url, options){
  let config = Object.assign(options, {method:'GET',url: url})
  return axios(config);
}
axios.post = function(url, options){
  let config = Object.assign(options, {method:'POST',url: url})
  return axios(config);
}
axios.put = function(url, options){
  let config = Object.assign(options, {method:'PUT',url: url})
  return axios(config);
}
axios.delete = function(url, options){
  let config = Object.assign(options, {method:'DELETE',url: url})
  return axios(config);
}