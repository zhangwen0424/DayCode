(function () {
    // object表示一个js对象
    var a;
    a = {};
    a = function () { };
    a = [];
    // {} 用来指定对象中可以包含哪些属性
    // 语法：{属性名:属性值,属性名:属性值}
    // 在属性名后边加上?，表示属性是可选的
    var b;
    // b = { name: "1", gender: "male" };//报错，未指定属性不可以出现，使用[propName: string]: any解决报错
    b = { name: "1" };
    // [propName: string]: any 表示任意类型的属性
    var c;
    c = { name: "mornki", gender: "male" };
    /*
     *   数组的类型声明：
     *       类型[]
     *       Array<类型>
     * */
    // string[] 表示字符串数组
    // number[] 表示数值数值
    var s;
    s = ["1", "2"];
    var f;
    var g;
    g = [1, 2, 3];
    /*
     *   元组，元组就是固定长度的数组
     *       语法：[类型, 类型, 类型]
     * */
    var d;
    d = ["12", 2];
    // enum 枚举
    var Gender;
    (function (Gender) {
        Gender["Male"] = "male";
        Gender["Female"] = "female";
    })(Gender || (Gender = {}));
    var i;
    i = { name: "mornki", gender: Gender.Male };
    console.log("i", i, i.gender == Gender.Male);
    // &表示同时
    var j;
    // j = { name: "hha", age: 10 };
    // 类型的别名，复用枚举项
    var n;
    var k;
    var l;
})();
