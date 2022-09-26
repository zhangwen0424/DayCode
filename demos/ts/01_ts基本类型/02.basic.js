(function () {
    // 声明一个变量a，同时指定它的类型为number
    var a;
    // a 的类型设置为了number，在以后的使用过程中a的值只能是数字
    // a = 'hello'; // 此行代码会报错，因为变量a的类型是number，不能赋值字符串
    a = 1;
    // 声明完变量直接进行赋值
    var b = true;
    // 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
    var c = true;
    // c = "hello"; // 此行代码会报错，因为变量a的类型是Boolean，不能赋值字符串
    // JS中的函数是不考虑参数的类型和个数的
    function sum(a, b) {
        return a + b;
    }
    console.log(sum(123, 456)); // 579
    console.log(sum(123, "456")); // "123456"
    // ts中限制传入的类型，类型不匹配会报错
    /*
     *   设置函数结构的类型声明：
     *       语法：(形参:类型, 形参:类型 ...) => 返回值
     * */
    function sum_ts(a, b) {
        return a + b;
    }
    var result = sum_ts(10, "20");
    console.log("result", typeof result, result); //"1020"
    // 也可以直接使用字面量进行类型声明
    var d;
    // d = 20;//报错，只能复值为 10
    // 可以使用 | 来连接多个类型（联合类型），类似于枚举类型
    var gender;
    gender = "male";
    var age;
    age = 10;
    age = "20";
    // any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
    // 使用TS时，不建议使用any类型
    var field;
    // any类型可以赋值给任意变量
    age = field;
    // 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
    var type;
    type = 1;
    type = "hello";
    // unknown 表示未知类型的值
    var f;
    // unknown 实际上就是一个类型安全的any
    // unknown类型的变量，不能直接赋值给其他变量
    // age = f;//报错
    f = "hello";
    if (typeof f == "string") {
        age = f;
    }
    // 类型断言，可以用来告诉解析器变量的实际类型
    /*
     * 语法：
     *   变量 as 类型
     *   <类型>变量
     *
     * */
    var g = f;
    g = f;
    var n;
    var gg = n;
    // void 用来表示空，以函数为例，就表示没有返回值的函数
    function fn() { }
    // never 表示永远不会返回结果
    function fn1() {
        throw "报错了";
    }
})();
