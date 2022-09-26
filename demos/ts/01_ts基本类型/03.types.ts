(() => {
  // object表示一个js对象
  let a: object;
  a = {};
  a = function () {};
  a = [];

  // {} 用来指定对象中可以包含哪些属性
  // 语法：{属性名:属性值,属性名:属性值}
  // 在属性名后边加上?，表示属性是可选的
  let b: { name: string; age?: number };
  // b = { name: "1", gender: "male" };//报错，未指定属性不可以出现，使用[propName: string]: any解决报错
  b = { name: "1" };

  // [propName: string]: any 表示任意类型的属性
  let c: { name: string; [propName: string]: any };
  c = { name: "mornki", gender: "male" };

  /*
   *   数组的类型声明：
   *       类型[]
   *       Array<类型>
   * */
  // string[] 表示字符串数组
  // number[] 表示数值数值
  let s: string[];
  s = ["1", "2"];
  let f: number[];
  let g: Array<number>;
  g = [1, 2, 3];

  /*
   *   元组，元组就是固定长度的数组
   *       语法：[类型, 类型, 类型]
   * */
  let d: [string, number];
  d = ["12", 2];

  // enum 枚举
  enum Gender {
    Male = "male",
    Female = "female",
  }
  let i: { name: string; gender: Gender };
  i = { name: "mornki", gender: Gender.Male };
  console.log("i", i, i.gender == Gender.Male);

  // &表示同时
  let j: { name: string } & { age: number };
  // j = { name: "hha", age: 10 };

  // 类型的别名，复用枚举项
  let n: 1 | 2 | 3 | 4 | 5;
  type myType = 1 | 2 | 3 | 4 | 5;
  let k: myType;
  let l: myType;
})();
