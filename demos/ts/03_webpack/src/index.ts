/*
 * @Date: 2022-03-08 11:24:05
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-03-08 11:37:33
 * @FilePath: /ts_project/03_webpack/src/index.ts
 */
console.log("hello webpack");
function test(x: number, y: number): number {
  return x + y;
}
console.log(test(1, 2));

enum types {
  male = "男",
  famale = "女",
}
console.log(types["male"]);
