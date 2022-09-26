# TypeScript

## 0、TypeScript 简介

1. TypeScript 是 JavaScript 的超集。
2. 它对 JS 进行了扩展，向 JS 中引入了类型的概念，并添加了许多新的特性。
3. TS 代码需要通过编译器编译为 JS，然后再交由 JS 解析器执行。
4. TS 完全兼容 JS，换言之，任何的 JS 代码都可以直接当成 TS 使用。
5. 相较于 JS 而言，TS 拥有了静态类型，更加严格的语法，更强大的功能；TS 可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS 代码可以编译为任意版本的 JS 代码，可有效解决不同 JS 运行环境的兼容问题；同样的功能，TS 的代码量要大于 JS，但由于 TS 的代码结构更加清晰，变量类型更加明确，在后期代码的维护中 TS 却远远胜于 JS。

## 1、TypeScript 开发环境搭建

1. 下载 Node.js
   - 64 位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   - 32 位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi
2. 安装 Node.js

3. 使用 npm 全局安装 typescript
   - 进入命令行
   - 输入：npm i -g typescript
4. 创建一个 ts 文件

5. 使用 tsc 对 ts 文件进行编译

   - 进入命令行

   - 进入 ts 文件所在目录

   - 执行命令：tsc xxx.ts

## 2、基本类型

- 类型案例 1

```ts
(() => {
  // 声明一个变量a，同时指定它的类型为number
  let a: number;
  // a 的类型设置为了number，在以后的使用过程中a的值只能是数字
  // a = 'hello'; // 此行代码会报错，因为变量a的类型是number，不能赋值字符串
  a = 1;

  // 声明完变量直接进行赋值
  let b: Boolean = true;
  // 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
  let c = true;
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
  function sum_ts(a: number, b: string): string {
    return a + b;
  }
  let result = sum_ts(10, "20");
  console.log("result", typeof result, result); //"1020"

  // 也可以直接使用字面量进行类型声明
  let d: 10;
  // d = 20;//报错，只能复值为 10

  // 可以使用 | 来连接多个类型（联合类型），类似于枚举类型
  let gender: "male" | "female";
  gender = "male";

  let age: string | number;
  age = 10;
  age = "20";

  // any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
  // 使用TS时，不建议使用any类型
  let field: any;

  // any类型可以赋值给任意变量
  age = field;

  // 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
  let type;
  type = 1;
  type = "hello";

  // unknown 表示未知类型的值
  let f: unknown;

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
  let g = f as string;
  g = <string>f;

  let n: unknown;
  let gg = n as string;

  // void 用来表示空，以函数为例，就表示没有返回值的函数
  function fn(): void {}

  // never 表示永远不会返回结果
  function fn1(): never {
    throw "报错了";
  }
})();
```

- 类型案例 2

```ts
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
```

### 类型声明

- 类型声明是 TS 非常重要的一个特点

- 通过类型声明可以指定 TS 中变量（参数、形参）的类型

- 指定类型后，当为变量赋值时，TS 编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- 语法：

  - ```typescript
    let 变量: 类型;

    let 变量: 类型 = 值;

    function fn(参数: 类型, 参数: 类型): 类型{
        ...
    }
    ```

### 自动类型判断

- TS 拥有自动的类型判断机制
- 当对变量的声明和赋值是同时进行的，TS 编译器会自动判断变量的类型
- 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

### 类型

|  类型   |       例子        |              描述               |
| :-----: | :---------------: | :-----------------------------: |
| number  |    1, -33, 2.5    |            任意数字             |
| string  | 'hi', "hi", `hi`  |           任意字符串            |
| boolean |    true、false    |      布尔值 true 或 false       |
| 字面量  |      其本身       |  限制变量的值就是该字面量的值   |
|   any   |        \*         |            任意类型             |
| unknown |        \*         |         类型安全的 any          |
|  void   | 空值（undefined） |     没有值（或 undefined）      |
|  never  |      没有值       |          不能是任何值           |
| object  |  {name:'孙悟空'}  |         任意的 JS 对象          |
|  array  |      [1,2,3]      |          任意 JS 数组           |
|  tuple  |       [4,5]       | 元素，TS 新增类型，固定长度数组 |
|  enum   |    enum{A, B}     |       枚举，TS 中新增类型       |

#### number

- ```typescript
  let decimal: number = 6;
  let hex: number = 0xf00d;
  let binary: number = 0b1010;
  let octal: number = 0o744;
  let big: bigint = 100n;
  ```

#### boolean

- ```typescript
  let isDone: boolean = false;
  ```

#### string

- ```typescript
  let color: string = "blue";
  color = "red";

  let fullName: string = `Bob Bobbington`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${fullName}.
  
  I'll be ${age + 1} years old next month.`;
  ```

#### 字面量

- 也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

- ```typescript
  let color: "red" | "blue" | "black";
  let num: 1 | 2 | 3 | 4 | 5;
  ```

#### any

- ```typescript
  let d: any = 4;
  d = "hello";
  d = true;
  ```

#### unknown

- ```typescript
  let notSure: unknown = 4;
  notSure = "hello";
  ```

#### void

- ```typescript
  let unusable: void = undefined;
  ```

#### never

- ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

#### object（没啥用）

- ```typescript
  let obj: object = {};
  ```

#### array

- ```typescript
  let list: number[] = [1, 2, 3];
  let list: Array<number> = [1, 2, 3];
  ```

#### tuple

- ```typescript
  let x: [string, number];
  x = ["hello", 10];
  ```

#### enum

- ```typescript
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;

  enum Color {
    Red = 1,
    Green,
    Blue,
  }
  let c: Color = Color.Green;

  enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
  }
  let c: Color = Color.Green;
  ```

#### 类型断言

- 有些情况下，变量的类型对于我们来说是很明确，但是 TS 编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

      - 第一种

        - ```typescript
          let someValue: unknown = "this is a string";
          let strLength: number = (someValue as string).length;
          ```

      - 第二种

        - ```typescript
          let someValue: unknown = "this is a string";
          let strLength: number = (<string>someValue).length;
          ```

## 3、编译选项

### 自动编译文件

- 编译文件时，使用 -w 指令后，TS 编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

- 示例：

  - ```powershell
    tsc xxx.ts -w
    ```

### 自动编译整个项目

- 如果直接使用 tsc 指令，则可以自动将当前项目下的所有 ts 文件编译为 js 文件。

- 但是能直接使用 tsc 命令的前提时，要先在项目根目录下创建一个 ts 的配置文件 tsconfig.json

- tsconfig.json 是一个 JSON 文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

tsconfig.json

```json
{
  /*
  tsconfig.json是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
    "include" 用来指定哪些ts文件需要被编译
      路径：** 表示任意目录
            * 表示任意文件
    "exclude" 不需要被编译的文件目录
        默认值：["node_modules", "bower_components", "jspm_packages"]

*/
  "include": ["./src/**/*"],
  //  "exclude": [
  //    "./src/hello/**/*"
  //  ]

  /*
    compilerOptions 编译器的选项
  */
  "compilerOptions": {
    // target 用来指定ts被编译为的ES的版本
    // 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'esnext'
    "target": "es2015",
    // module 指定要使用的模块化的规范
    // 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'
    "module": "es2015",
    // lib用来指定项目中要使用的库
    //'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es
    //2018', 'es2019', 'es2020', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scri
    //pthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.r
    //eflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.st
    //ring', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', '
    //es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.promise', 'es2020.s
    //haredmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable
    //', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'
    //    "lib": ["es6", "dom"]

    // outDir 用来指定编译后文件所在的目录
    "outDir": "./dist",

    // 将代码合并为一个文件
    // 设置outFile后，所有的全局作用域中的代码会合并到同一个文件中
    //"outFile": "./dist/app.js"

    // 是否对js文件进行编译，默认是false
    //    "allowJs": true,
    // 是否检查js代码是否符合语法规范，默认是false
    //    "checkJs": true,
    // 是否移除注释
    "removeComments": true,
    // 不生成编译后的文件
    "noEmit": false,

    // 当有错误时不生成编译后的文件
    "noEmitOnError": true,

    // 所有严格检查的总开关
    "strict": true,

    // 用来设置编译后的文件是否使用严格模式，默认false
    "alwaysStrict": true,

    // 不允许隐式的any类型
    "noImplicitAny": true,

    // 不允许不明确类型的this
    "noImplicitThis": true,

    // 严格的检查空值
    "strictNullChecks": true
  }
}
```

- 配置选项：

  - include

    - 定义希望被编译文件所在的目录

    - 默认值：["\*\*/\*"]

    - 示例：

      - ```json
        "include":["src/**/*", "tests/**/*"]
        ```

      - 上述示例中，所有 src 目录和 tests 目录下的文件都会被编译

  - exclude

    - 定义需要排除在外的目录

    - 默认值：["node_modules", "bower_components", "jspm_packages"]

    - 示例：

      - ```json
        "exclude": ["./src/hello/**/*"]
        ```

      - 上述示例中，src 下 hello 目录下的文件都不会被编译

  - extends

    - 定义被继承的配置文件

    - 示例：

      - ```json
        "extends": "./configs/base"
        ```

      - 上述示例中，当前配置文件中会自动包含 config 目录下 base.json 中的所有配置信息

  - files

    - 指定被编译文件的列表，只有需要编译的文件少时才会用到

    - 示例：

      - ```json
        "files": [
            "core.ts",
            "sys.ts",
            "types.ts",
            "scanner.ts",
            "parser.ts",
            "utilities.ts",
            "binder.ts",
            "checker.ts",
            "tsc.ts"
          ]
        ```

      - 列表中的文件都会被 TS 编译器所编译

    - compilerOptions

      - 编译选项是配置文件中非常重要也比较复杂的配置选项

      - 在 compilerOptions 中包含多个子选项，用来完成对编译的配置

        - 项目选项

          - target

            - 设置 ts 代码编译的目标版本

            - 可选值：

              - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

            - 示例：

              - ```json
                "compilerOptions": {
                    "target": "ES6"
                }
                ```

              - 如上设置，我们所编写的 ts 代码将会被编译为 ES6 版本的 js 代码

          - lib

            - 指定代码运行时所包含的库（宿主环境）

            - 可选值：

              - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

            - 示例：

              - ```json
                "compilerOptions": {
                    "target": "ES6",
                    "lib": ["ES6", "DOM"],
                    "outDir": "dist",
                    "outFile": "dist/aa.js"
                }
                ```

          - module

            - 设置编译后代码使用的模块化系统

            - 可选值：

              - CommonJS、UMD、AMD、System、ES2020、ESNext、None

            - 示例：

              - ```typescript
                "compilerOptions": {
                    "module": "CommonJS"
                }
                ```

          - outDir

            - 编译后文件的所在目录

            - 默认情况下，编译后的 js 文件会和 ts 文件位于相同的目录，设置 outDir 后可以改变编译后文件的位置

            - 示例：

              - ```json
                "compilerOptions": {
                    "outDir": "dist"
                }
                ```

              - 设置后编译后的 js 文件将会生成到 dist 目录

          - outFile

            - 将所有的文件编译为一个 js 文件

            - 默认会将所有的编写在全局作用域中的代码合并为一个 js 文件，如果 module 制定了 None、System 或 AMD 则会将模块一起合并到文件之中

            - 示例：

              - ```json
                "compilerOptions": {
                    "outFile": "dist/app.js"
                }
                ```

          - rootDir

            - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过 rootDir 可以手动指定根目录

            - 示例：

              - ```json
                "compilerOptions": {
                    "rootDir": "./src"
                }
                ```

          - allowJs

            - 是否对 js 文件编译

          - checkJs

            - 是否对 js 文件进行检查

            - 示例：

              - ```json
                "compilerOptions": {
                    "allowJs": true,
                    "checkJs": true
                }
                ```

          - removeComments

            - 是否删除注释
            - 默认值：false

          - noEmit

            - 不对代码进行编译
            - 默认值：false

          - sourceMap

            - 是否生成 sourceMap
            - 默认值：false

        - 严格检查

          - strict
            - 启用所有的严格检查，默认值为 true，设置后相当于开启了所有的严格检查
          - alwaysStrict
            - 总是以严格模式对代码进行编译
          - noImplicitAny
            - 禁止隐式的 any 类型
          - noImplicitThis
            - 禁止类型不明确的 this
          - strictBindCallApply
            - 严格检查 bind、call 和 apply 的参数列表
          - strictFunctionTypes
            - 严格检查函数的类型
          - strictNullChecks
            - 严格的空值检查
          - strictPropertyInitialization
            - 严格检查属性是否初始化

        - 额外检查

          - noFallthroughCasesInSwitch
            - 检查 switch 语句包含正确的 break
          - noImplicitReturns
            - 检查函数没有隐式的返回值
          - noUnusedLocals
            - 检查未使用的局部变量
          - noUnusedParameters
            - 检查未使用的参数

        - 高级

          - allowUnreachableCode
            - 检查不可达代码
            - 可选值：
              - true，忽略不可达代码
              - false，不可达代码将引起错误
          - noEmitOnError
            - 有错误的情况下不进行编译
            - 默认值：false

## webpack 中配置

- 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS 同样也可以结合构建工具一起使用，下边以 webpack 为例介绍一下如何结合构建工具使用 TS。

- 步骤：

  1. 初始化项目

     - 进入项目根目录，执行命令 ` npm init -y`
       - 主要作用：创建 package.json 文件

  2. 下载构建工具

     - `npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin`
       - 共安装了 7 个包
         - webpack 构建工具
         - webpack-cli webpack 的命令行工具
         - webpack-dev-server webpack 的开发服务器
         - typescript ts 编译器
         - ts-loader ts 加载器，用于在 webpack 中编译 ts 文件
         - html-webpack-plugin webpack 中 html 插件，用来自动创建 html 文件
         - clean-webpack-plugin webpack 中的清除插件，每次构建都会先清除目录

  3. 根目录下创建 webpack 的配置文件 webpack.config.js

     - ```javascript
       const path = require("path");
       const HtmlWebpackPlugin = require("html-webpack-plugin");
       const { CleanWebpackPlugin } = require("clean-webpack-plugin");

       module.exports = {
         optimization: {
           minimize: false, // 关闭代码压缩，可选
         },

         entry: "./src/index.ts",

         devtool: "inline-source-map",

         devServer: {
           contentBase: "./dist",
         },

         output: {
           path: path.resolve(__dirname, "dist"),
           filename: "bundle.js",
           environment: {
             arrowFunction: false, // 关闭webpack的箭头函数，可选
           },
         },

         resolve: {
           extensions: [".ts", ".js"],
         },

         module: {
           rules: [
             {
               test: /\.ts$/,
               use: {
                 loader: "ts-loader",
               },
               exclude: /node_modules/,
             },
           ],
         },

         plugins: [
           new CleanWebpackPlugin(),
           new HtmlWebpackPlugin({
             title: "TS测试",
           }),
         ],
       };
       ```

  4. 根目录下创建 tsconfig.json，配置可以根据自己需要

     - ```json
       {
         "compilerOptions": {
           "target": "ES2015",
           "module": "ES2015",
           "strict": true
         }
       }
       ```

  5. 修改 package.json 添加如下配置

     - ```json
       {
         ...略...
         "scripts": {
           "test": "echo \"Error: no test specified\" && exit 1",
           "build": "webpack",
           "start": "webpack serve --open chrome.exe"
         },
         ...略...
       }
       ```

  6. 在 src 下创建 ts 文件，并在并命令行执行`npm run build`对代码进行编译，或者执行`npm start`来启动开发服务器
