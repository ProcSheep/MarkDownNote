# TypeScript

## 初始 Ts

- ==1.什么是 TypeScript?==
  - 加强版 js,全部支持 js,可转化为 js,支持 js 的 ES6789....,进行了语法扩充,比如可以==类型约束,枚举类型(Enum),元组类型(Tuple)==
  - ==**全局安装 ts**== `npm install typescript -g`
  - ==查看 ts 版本== `tsc --version`
    [![pE0jZnS.jpg](https://s21.ax1x.com/2025/03/23/pE0jZnS.jpg)](https://imgse.com/i/pE0jZnS)
- ==2.ts 的优势==
  - vue3,vscode,react 的 ant-design 也是 Ts 开发,流行 vue3/react + Ts 开发,小程序开发也支持 Ts 开发
  - ==极大的提高了 js 项目的程序健壮性!!!!!! --- 类型检测填补了 js 没有类型检测的缺陷==
- ==3.ts 转 js==
  - `tsc + 文件名` ts 文件转化为 js (==太繁琐了==)
  - ==ts-node 库 `npm install ts-node -g`**(全局安装)**==, 为 ts 提供运行环境 `ts-node XXX.ts`;
  - ts-node 的额外依赖: `npm i tslib @types/node -g` (tslib 和 types/node 两个包)
  - ==接下来运行`ts-node XXX.ts`==
- ==4.学习 Ts 的等级==
  - 1.知道 ts 但没有用过
  - 2.万物皆可 any
  - 3.大多数 any,有些普通类型可以把我
  - ==4.大多数类型不是 any,可以把握很多类型(**到这里就挺好,高级前端工程师**)==
  - 5.可以使用 ts 封装一些工具,写一些框架,学会使用 ts 内置工具(==vue/react 开发人员水平==)
  - 6.会看 ts 源码(==TS 开发者水平==)

## TS 基础语法

### 标识符类型注解

- 变量声明了类型后,ts 会进行==类型检测==,声明的类型称之为==类型注解(Type Annotation)==
  ==var(不推荐)/let/const 标识符: 数据类型 = 赋值;==

  ```ts
  // 定义标识符---类型注解
  let name: string = "why"; // 注意string: 小写才是字符串类型,大写是String类
  const age: number = 18;
  const height: number = 1.88; // ts数字类型不区分整形和浮点型数据

  export {};
  ```

### 变量的类型推导

- ==在开发中,我们并不总是给变量声明对应的类型,而是通过 ts 的类型推导自动判断变量的类型==
- ==let 和 const 的类型推导有所不同==

  - let 进行类型推导,推导的类型是通用类型 string number 等
  - const 进行推导,推导的类型是字面量类型

  ```ts
  let name = "123"; // 省略掉类型注解string,通过赋值的类型推导name是string类型
  const age = 13; // 字面量类型,类型为13
  const message: "hello" = "hello"; // 字面量类型,hello

  export {};
  ```

### js/ts 的数据类型

- ==下面是 js 和 ts 共有的类型,表示方法上 ts 可能会与 js 有所不同,简单介绍==

  - number: 都相同,不区分整形和浮点型,ES6 后都支持二进制,八进制,十六进制
  - boolean: 都相同,true 和 false
  - string: 都相同,单引号或双引号,推荐双引号,切换 java 等语言时思维更改成本小; 支持模板字符串和拼接字符串
  - ==Array==:

    ```ts
    // 数组的类型注解: 同样支持类型推导,推导依据为数组中的数据
    // 注意: 开发中,数组中一般存放相同的类型,不要存放不同的类型

    // 写法1: 类型注解[] (用的多)
    // 写法2: Array<类型注解> 泛型写法

    // 1. string[] 数组类型,只存放字符串
    let names: string[] = ["abc", "cba", "nba"];
    let names2: Array<string> = ["aaa", "bbb", "ccc"];

    // 2. number[] 数组类型,只存放数字
    let ages: number[] = [1, 2, 3, 4];
    let ages2: Array<number> = [1, 2, 3, 4];
    // 3. any[] 任意类型
    let any: any[] = [1, "codewhy", {}, []];
    let any2: Array<any> = [1, "codewhy", {}, []];

    console.log(names, names2, ages, ages2, any, any2);
    export {};
    ```

  - ==Object==:

    ```ts
    // 对象的类型注解: 支持类型推导
    // 书写麻烦,如果有的类型注解没有声明也会报错
    let info: {
      name: string;
      age: number;
      // height: number // 下面不写height会报错
    } = {
      // 无height属性
      name: "why",
      age: 12,
    };

    console.log(info);
    console.log(info.name);
    console.log(info.age);

    export {};
    ```

  - Symbol: 用的少,了解

    ```js
    const s1: symbol = Symbol("title");
    const s2: symbol = Symbol("title");

    const person = {
      [s1]: "程序员",
      [s2]: "老师",
    };
    ```

  - null&undefiend:
    ```js
    const n: null = null;
    const u: undefined = undefined;
    ```

### 函数参数和返回值

- ==参数==: 如果函数的参数不写类型,默认为 any 类型,不安全,因为函数的参数不可以类型推导,==所以定义函数的参数都要明确的指定参数的数据类型==
- ==返回值:== 返回值会类型推导,==写不写都行==

  ```ts
  // 参数的类型直接写在参数后面
  // 返回值的类型的定义写在最后面
  function sum(num1: number, num2: number): number {
    return num1 + num2;
  }

  const res = sum(123, 321);
  console.log(res);

  export {};
  ```

### 匿名函数参数类型

- 匿名函数: 极大部分的匿名函数不需要指定参数类型,ts 会根据代码上下文自动推导

  ```ts
  const names = ["aaa", "bbb", "ccc"];

  // ts会根据forEach函数类型以及names数组的类型推断匿名函数参数的类型,这个过程称为上下文类型
  names.forEach(function (item, index, arr) {
    console.log(item, index, arr);
  });

  export {};
  ```

### 函数的参数是对象类型

- ==对象类型和函数类型结合使用的小案例==
- 使用新知识(type 后面学): ==type 别名命名和?的可选属性(简单易懂)==

  ```ts
  // 对象类型和函数类型的结合使用
  // type别名: 规定PointType为对象类型,有x和y两个数字类型的属性
  type PointType = {
    x: number; // 定义参数类型之间可以用,或;来分割,如果有换行,都可以省略
    y: number;
    z?: number; // ? 可选属性,可有可无
  };

  // 打印坐标的函数,函数接受的参数是一个对象
  function printCoordinate(point: PointType) {
    console.log("x坐标:", point.x);
    console.log("y坐标:", point.y);
    console.log("z坐标:", point.z);
  }

  printCoordinate({ x: 20, y: 30 });

  export {};
  ```

### ts 类型-any 与 unknown

- ==**这两个类型的区别是一个常问的 ts 面试题**==
- 当一个变量无法确定其类型或者其类型可能会发生不可预测的转变时,一般定义为 any 类型

  - ==any 不限制数据类型,可以在 any 类型的标识符上进行任何操作,比较危险,**和 js 一样了**==
  - ==不推荐到处使用 any 属性==,使用 any 类型的情况,比如后端返回的数据类型太多,嵌套太多,一般用 any

  ```ts
  let id: any;

  id = "123121232";

  id = 1233212313;

  id = { name: "codewhy", level: 16 };

  console.log(id.length); // any不限制操作: 对象.length明显是错误的,但是ts不会报错

  export {};
  ```

- ==unknown 类型用于描述不确定的类型==

  - 和 any 类型相似,==但是 unknown 类型上进行任何操作是不合法的,仅可赋值,而 any 可以做任何操作,均合法(但不安全)==
  - ==只有进行类型校验(类型缩小操作)后,才能进行对应方法操作(更安全)==

  ```ts
  let num: unknown = "aaa";

  num = 123;
  num = { num: 123 };
  // console.log(num.length) // 报错

  num = "111111";
  // 如果校验后,可以使用方法
  if (typeof num === "string") {
    // 类型缩小
    console.log(num.length);
  }

  export {};
  ```

### ts 类型-void 类型

- ==**void 通常指定一个函数没有返回值**==

  ```ts
  // 1.不写void也行,没有返回值ts也会检测到并自动加上void
  // 2.如果返回值是void,允许返回undefined(了解,没用)
  function foo(): void {
    console.log("hello");
    return undefined;
  }
  foo();

  export {};
  ```

- ==应用场景: 给**函数定义类型**常用,后续讲解==
- 函数也属于标识符,也有自己的类型,先行了解
  ```ts
  // 代表函数没有参数,没有返回值
  type fooType = () => void;
  // 函数的类型fooType
  const foo: fooType = () => {};
  ```
  > 额外的,当基于上下文推导出的类型返回值为 void 时,写返回值不报错,比如 forEach 的函数参数,==了解即可==

### ts 类型-never 类型(了解)

- ==开发中很少用 never 类型==,有时候自动类型推导或者开发框架时会用到 never 类型,封装一些工具时,也会使用 never 类型
- ==never 表示永远不会发生的值==

  ```ts
  // 代表永远没有返回值
  function foo(): never {
    throw new Error("123");
  }

  foo();
  ```

  > 后面学习 ts 封装工具时,会用到 never

### ts 类型-tuple 元组类型

- python 里面有元组类型
- 数组中,不建议同一个数组存入多个数据类型,==但是元组数据结构中可以存放不同类型的数据,取出来的 item 也有明确的类型==
- ==元组类型,把数据类型放入`[]`内部,一一对应数据类型==
  ```ts
  // 保存个人信息 why 18 1.88
  const info3: [string, number, number] = ["why", 18, 1.88];
  const value2 = info3[2]; // 自动推导出value2为number类型
  ```
- ==应用: tuple 常用来定义函数的返回值,十分方便==

  ```ts
  // 函数中使用元组是最多的,特别是返回值
  // 元组规定返回值类型为数字类型和函数类型,函数类型传参为number,没有返回值(void)
  function useState(initState: number): [number, (newValue: number) => void] {
    let stateValue = initState;
    function setValue(newValue: number) {
      stateValue = newValue;
    }
    return [stateValue, setValue];
  }

  const [count, setCount] = useState(10);
  console.log(count);
  ```

## TS 语法细节

### 联合类型

- ==联合类型==: 规定一个数据可以是多种类型中的任意一种类型
- ==联合类型一般和缩小(narrow)操作联合,减少错误操作==

  ```ts
  function printId(id: number | string) {
    // 缩小(narrow)操作
    if (typeof id === "string") {
      console.log(id.length);
    } else {
      console.log(id);
    }
  }

  printId("111");
  printId(123);

  export {};
  ```

### 类型别名 type

- ==type: 类型定义时,可以使用别名,提高代码可读性==

  ```ts
  // 给id取别名
  type IdType = number | string;
  // id使用类型别名IdType,效果相同
  function printId(id: IdType) {
    if (typeof id === "string") {
      console.log(id.length);
    } else {
      console.log(id);
    }
  }

  printId("111");
  printId(123);

  export {};
  ```

### 接口 interface

- 接口语法如下:

  ```ts
  // 接口: 以声明的方式定义
  interface Point {
    x: number;
    y: number;
    z?: number;
  }

  function PointCoordinate(point: Point) {}

  export {};
  ```

- ==interface 和 type 两者区别: **大多数时候,两者没有任何区别**==

  - 1.type 使用范围更广,==接口只能声明对象类型==
    ```ts
    type IdType = number | string;
    // type范围广:
    // type: 联合类型,number类型,string类型,函数类型()=>void,对象类型等
    // 接口: 对象类型
    ```
  - 2.type 不能重复声明相同的名字,接口可以重复声明,接口会合并多个定义的要求

    ```ts
    type Point2 = {};
    type Point2 = {}; // X

    // 接口: 以声明的方式定义
    interface Point {
      x: number;
      y: number;
    }
    interface Point {
      z: number;
    }

    // 必须满足Point接口的所有要求
    const point: Point = {
      x: 100,
      y: 200,
      z: 300,
    };
    ```

  - 3.==接口支持继承==

    ```ts
    interface Person {
      name: string;
      age: number;
    }

    // 继承接口Person的属性
    interface Student extends Person {
      sno: number;
      classes: string;
      grade: number;
    }

    const why: Student = {
      name: "codewhy",
      age: 35,
      sno: 1,
      classes: "1-1",
      grade: 100,
    };
    ```

  - 4.接口可以被类实现(==TS 的面向对象知识==)
    `ts
      class Person implements Person{}
    `
    > 总结: ==**声明别的类型时,用 type; 声明对象类型,用接口 interface**==,接口对于对象类型的声明比 type 更加灵活,即使暂时用不到,也推荐用接口声明

### 交叉类型

- 交叉类型: 两种(多种)类型都要满足,==交叉类型基本用在对象类型的交叉上,如下==

  ```ts
  // 不存在既是数字类型又是字符类型的新类型数据
  type NewType = number & string; // never类型: 无意义

  // 对象类型的交叉
  interface IKun {
    name: string;
    age: number;
  }

  interface ICoder {
    name: string;
    coding: () => void;
  }

  // 交叉对象类型
  const info: IKun & ICoder = {
    name: "codewhy",
    age: 30,
    coding: function () {
      console.log("我会打代码");
    },
  };
  ```

### 类型断言 as

- ==as 类型断言==

  ```ts
  // 类型断言的规则: 只能断言成更加"具体或不太具体(any/unknown)"的类型
  // 本来ts默认.pic这个dom对象为Element类型,你确切知道它是image标签,所以"更加具体"规定了类型
  const imgEl = document.querySelector(".pic") as HTMLImageElement;
  // 规定HTMLImageElement后,进行dom操作时,可以减少"范围缩小"操作的代码
  imgEl.src = "XXX"; // 放心地使用image的dom操作即可
  imgEl.alt = "YYY";

  const age: number = 18;
  // const age2 = age as string // 错误地使用as

  export {};
  ```

### 非空类型断言!

- 非空类型断言: ==表示某个标识符一定是有值的,跳过 ts 对它的检测,不安全,慎重使用==

  ```ts
  interface IPerson {
    name: string;
    age: number;
    friend?: {
      name: string;
    };
  }

  const info: IPerson = {
    name: "kiki",
    age: 20,
  };

  // 访问属性: 可选链?
  // ?前面如果为undefined,?后面不再执行
  console.log(info.friend?.name);

  // 赋值: 可选链?不可以放在赋值语句左边,违反语法规则
  // info.friend?.name = "aaa" // X

  // 方法1: 类型缩小
  if (info.friend) {
    info.friend.name = "aaa";
  }

  // 方法2: 非空类型断言! (不安全,一定确保friend一定有值)
  info.friend!.name = "james"; // !告诉ts,这个!前面的变量一定是有值的,不用检测了

  export {};
  ```

### 字面量类型的使用

- 复习: let/const 定义的变量类型
  ```ts
  // const定义的标识符的类型就是字面量类型
  const name = "why"; // 类型为 "why"
  // let使用字面量类型
  let age: 18 = 18;
  ```
  > ==注意: 字面量类型和值必须一样==
  ```ts
  // 字面量类型和值必须一样
  let num: 18 = 180; // 不能将类型“180”分配给类型“18”
  ```
- ==字面量的应用==
  ```ts
  // 将多个字面量类型联合起来 |
  type Direction = "left" | "right" | "up" | "bottom";
  const d1: Direction = "left";
  ```
- ==应用 2:==

  ```ts
  // 应用: method传入请求类型数据,如果设置为string还是不安全,使用字面量类型限制
  function request(url: string, method: "get" | "post") {}

  request("http://123.com/api/aaa", "post");
  ```

- ==额外讲解==

  ```ts
  const info = {
    url: "xxx",
    method: "post",
  };

  // 经过自动推导,info.method的类型为string,不能将string类型赋值给字面量类型
  request(info.url, info.method); // 错误的做法

  // 解决方法1: as
  request(info.url, info.method as "post");

  // 解决方法2: as const
  const info = {
    url: "xxx",
    method: "post",
  } as const;

  // 此操作把info内url和method都变为字面量类型,而且是仅可读(readonly)
  // 另外info.url虽然是xxx字面量类型,但是仍属于string类型,所以不报错
  // 反过来则不行,string类型不一定是这个字面量类型
  request(info.url, info.method);
  ```

### 类型缩小

- 类型缩小(Type Narrowing): **通过类似`typeof padding ==="number"`的判断语句**,==来改变 ts 执行路径==,在给定的执行路径中,==我们可以缩小声明的类型范围==,进行更精细的操作,这个过程称之为==缩小(Narrowing)==
- ==类型缩小的方法(4 种)==
  - typeof
  - 平等缩小 `=== or !==`
  - instanceof 是不是某个东西的实例
  - in 某个 key 是不是在某个对象内部
- ==1.typeof==
  ```ts
  // 1.typeof (使用最多)
  function printID(id: number | string) {
    if (typeof id === "string") {
      // ts认定此区域内,id一定为string类型
      console.log(id.length);
    } else {
      console.log(id);
    }
  }
  ```
- ==2.平等缩小==
  ```js
  // 2.平等缩小
  // 一般用于判断字面量类型
  type Direction = "left" | "right" | "up" | "bottom";
  function switchDirection(direction: Direction) {
    if (direction === "left") {
      console.log("左");
    } else if (direction === "right") {
      console.log("右");
    } else if (direction === "up") {
      console.log("上");
    } else if (direction === "bottom") {
      console.log("下");
    }
  }
  ```
- ==3.instanceof==
  ```js
  // 3.instanceof
  // 传入一个日期,打印日期
  function printDate(date: string | Date) {
    if (date instanceof Date) {
      console.log(date.getTime());
    } else {
      console.log(date);
    }
  }
  ```
- ==4.in==

  ```js
  // 4.in
  interface ISwim {
    swim: () => void;
  }

  interface IRun {
    run: () => void;
  }

  const fish: ISwim = {
    swim: function () {
      console.log("swim");
    },
  };
  const dog: IRun = {
    run: function () {
      console.log("run");
    },
  };

  function move(animal: ISwim | IRun) {
    // 判断animal中有没有"swim"这个key,记得加双引号,否则会被认定为变量
    if ("swim" in animal) {
      animal.swim();
    } else {
      animal.run();
    }
  }

  move(fish);
  move(dog);
  ```

## TS 类型-函数类型(难点)

### 函数的类型

- 函数有自己的类型,可以自行推导,也可以定义,前面学过了,==用 type 定义函数类型是最常见的方法==

  ```ts
  // 函数有自己类型,一般是自动推导的,也可以自己定义
  const bar = () => {
    // 自动推导-> :()=>void
    console.log("bar");
  };

  // 函数类型表达式 格式: (参数列表)=>返回值
  // 参数列表中的形参名字不可以省略,形参名字自定义
  type fooType = (num1: number) => number;

  const foo: fooType = function (arg: number) {
    return 123;
  };

  console.log(foo(100));
  ```

### 函数类型练习

- 定义一个函数,对 10 和 20 这两个数字进行运算,运算具体规则==依靠传入的函数决定,这个函数的参数是函数==

  ```ts
  // 函数类型表达式练习

  // 函数calcFn要求: 2个number类型的形参,返回值为number类型数据
  type calcFnType = (num1: number, num2: number) => number;
  function calc(calcFn: calcFnType) {
    const num1 = 10;
    const num2 = 20;
    const res = calcFn(num1, num2);
    console.log(res);
  }

  function sum(num1: number, num2: number) {
    return num1 + num2;
  }

  function foo(num1: string) {
    // 错误的参数类型
    return num1;
  }

  calc(sum); // 30
  // calc(foo) // 对传入的函数参数和返回值进行严格限制

  // 匿名函数也行,匿名函数参数不用写类型注解,会通过上下文解析出来的
  calc(function (num1, num2) {
    return num1 - num2;
  }); // -10
  ```

  > ==calc 函数以函数作为参数,所以对函数参数 calcFn 的类型进行限制,限制操作 type + calcFnType 协同定义==

### 函数类型参数的个数

- ==**拓展: 函数类型参数的个数问题(即形参是函数 callback,这个函数的参数个数)**==

  - ==ts 对于传入**函数类型形参的参数个数**不进行检测==

    ```ts
    type calcFnType = (num1: number, num2: number) => number;
    function calc(calcFn: calcFnType) {
      const num1 = 10;
      const num2 = 20;
      const res = calcFn(num1, num2);
      console.log(res);
    }

    calc(function () {
      // 一个参数都不传,也不校验,不报错,形参num1(10),num2(20)会被简单地忽略
      return 100;
    });

    // 典型的例子
    const names = ["aaa", "bbb", "ccc"];
    // forEach有3个参数item index arr, 一般我们用forEach只用里面的item属性,所以不写全参数也可以,否则所有的参数都要写全会很不方便
    names.forEach(function (item) {
      console.log(item);
    });

    // 函数定义形参时,个数可以不校验,但是调用的时候不可以省略参数,这些参数传进去做运算的,不能少
    function sum(num1: number, num2: number) {
      return num1 + num2;
    }
    sum(10, 20); // V
    sum(10); // X
    ```

### 调用签名

- 调用签名(Call Signaltures): 把函数当作对象使用时,给函数提供调用函数的功能,==函数作为对象可以有自己的属性,函数类型表达式有局限性,只能体现函数的方面,不能体现函数作为对象的方面==

  ```ts
  // 1.函数类型表达式,使用它的函数不能定义属性
  type BarType = (num1: number) => number;
  // 2.函数的调用签名(从对象角度看函数)
  interface IBar {
    age: number;
    str: string;
    // 函数可以调用: 函数的调用签名
    // 语法为 (参数列表):返回值
    // 区分函数类型的语法 (参数列表)=>返回值
    (num1: number): number;
  }

  const bar: IBar = (num1: number): number => {
    return 100;
  };

  // 此时的函数即可以定义属性,又可以当作函数被调用
  bar.str = "123";
  bar.age = 18;
  console.log(bar(10));
  ```

  > 开发中,如果只想要描述函数本身,只作为函数去使用,就用函数类型表达式; 如果想要函数作为一个对象去使用,既有属性也要被调用,那就用函数的调用签名

### 构造签名(了解)

```ts
class Person {} // 既是类又是构造函数

interface IPerson {
  // 构造签名: 代表可以通过new返回Person构造函数
  new (): Person;
}

function factory(fn: IPerson) {
  const f = new fn(); // 构造签名,调用fn获取返回值Person
  return f;
}

factory(Person);
```

### 可选参数和默认参数

- 可选参数: 可传参可不传参,可选参数放末尾
- 默认参数: 不传参就是默认值,传参就是参数值

  ```ts
    // 可选参数y的类型为: number | undefined
    function foo(x:number , y?:number){
      if(y !== undefined){
        console.log( x + y );
      }else{
        console.log(x)
      }
    }

    foo(10)
    foo(10,20)
    ========================================================
    // 函数的参数可以有默认值
    // 1.有默认值,参数的类型注解可以省略
    // 2.默认参数可以接受undefined值,比较奇怪,不要理会
    function foo(x:number , y = 100){
      return x + y
    }

    foo(10) // 110
    foo(10,20) // 30
    foo(10,undefined)
  ```

### 剩余参数

- 剩余参数: ==会把形参都放入数组中==,额外地对数组定义下类型即可

  ```ts
  function sum(...arg: number[]) {
    let total = 0;
    for (const item of arg) {
      total += item;
    }
    return total;
  }

  console.log(sum(10, 20, 30, 40, 50));

  export {};
  ```

### 函数重载(了解)

- 需求: 只能 2 个数字相加或 2 个字符串相加的函数,==一般只有在工具库中编写这种代码==

  ```ts
  // 1.重载写法
  // 1.1 先编写重载签名(2个及以上)
  function add(arg1: number, arg2: number): number;
  function add(arg1: string, arg2: string): string;

  // 1.2 再编写通用函数实现
  function add(arg1: any, arg2: any): any {
    return arg1 + arg2;
  }

  // 调用通用函数必须匹配重载签名,否则无效
  add(10, 20);
  add("aaa", "bbb");
  // add({name: 'why'},20) // X

  export {};
  ```

### 重载与联合类型(了解)

- **原则**: ==可以使用联合类型实现的情况尽量使用联合类型,而不是函数重载==

  ```ts
  // 重载
  function getLength(arg: string): number;
  function getLength(arg: any[]): number;

  function getLength(arg: any) {
    console.log(arg.length);
    return arg.length;
  }

  // 联合类型
  function getLength2(arg: string | any[]) {
    console.log(arg.length);
    return arg.length;
  }

  getLength("aaaa");
  getLength([1, 2, 3]);
  getLength2("aaaa");
  getLength2([1, 2, 3]);
  ```

### 确定 this 的类型(了解)

- ==Vue3 Componsition API 和 react 的 Hooks 写法中,this 越来越少==,所以还是简单学习下 ts 中的 ts 问题,可能用不到.
- ==配置 ts: `tsc init --> tsconfig.json`==
- ==noImplicitThis: true , 不允许有模糊的 this 打开>>==

  ```ts
  // 1.对象中函数的this
  const obj = {
    name: "kiki",
    studying: function () {
      // this: 可以上下文推导,结果this->obj
      console.log(this.name, "studying");
    },
  };

  // 2.普通函数中的this,无法上下文推导,需要指定this的类型
  // 指定this类型,需要把this作为函数的第一个参数,其余形参后稍
  function foo(this: any, num1: number) {
    console.log(this);
  }
  foo(100);

  function foo2(this: { name: string }, num1: number) {
    console.log(this);
  }
  foo2.call({ name: "why" }, 100);
  ```

### ts 内置 this 工具(了解)

- ==学习一些 ts 内置的工具==

  ```ts
  function foo2(this: { name: string }, num1: number) {
    console.log(this);
  }

  // 快速提取foo2函数的类型
  type foo2Type = typeof foo2;
  // 快速提取foo2Type中的this类型
  type foo2ThisType = ThisParameterType<foo2Type>;
  // 移除一个type中的this类型,返回剩余的类型
  type foo2NoThisType = OmitThisParameter<foo2Type>;

  export {};
  ```

## TS 面向对象

### 类和继承

- ts 的类支持 class,并且可以对类的属性和方法进行静态类型检测
- ==**在 vue 和 react 中,更加习惯于函数式编程,面向对象的使用比较少**==
- ==ts 中类和 js 的类基本一样,不过 ts 中的属性需要提前定义==

  ```ts
  class Person {
    // ts中类的属性需要声明,有初始化可以不写类型
    name: string;
    age = 0;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    eating() {
      console.log(this.name, "is eating");
    }
  }
  // 实例对象(instance) p1
  const p1 = new Person("kiki", 20);
  p1.eating();
  console.log(p1.name, p1.age);

  export {};
  ```

  >

- ==**ts 中类的继承和 js 一摸一样,不讲了**==

### 类成员修饰符

- 支持 3 中修饰符,==修饰类中的**属性和方法**(等于 java==)

  - pubild: 表示成员在任何地方可见,是共有的属性;默认就是 pubilc 属性
  - private: 仅在同一个类中可见,是私有属性
  - protected: 仅在同一个类或自身的子类中可见

    ```ts
    class Person {
      // 公有的,所有人都可用
      public name: string = "";
      // 仅自身可用
      private age: number;

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }

      // 仅自身和子类可用
      protected eating() {
        console.log(this.name, "is eating");
      }
    }
    ```

### 只读

- readonly(只读属性): ==只能读,不能写==

  ```ts
  class Person {
    // 只读
    readonly name: string = "";
    age = 0;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    eating() {
      console.log(this.name, "is eating");
    }
  }

  const p1 = new Person("kiki", 25);

  // 只读不写 name
  console.log(p1.name);
  // p1.name = 'haha'

  export {};
  ```

### getters/setters

- 对类内部的==私有属性进行**访问或改写**==
- ==应用: 可以拦截 set 和 get 操作,然后做些逻辑判断,比如\_age==

  ```ts
  class Person {
    // 私有属性: 属性前面会加_(潜规则)
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
      this._name = name;
      this._age = age;
    }

    // 设置或获取私有属性
    set name(newValue: string) {
      this._name = newValue;
    }
    set age(newAge: number) {
      if (newAge >= 0 && newAge <= 150) {
        this._age = newAge;
      }
    }

    get name(): string {
      return this._name;
    }
    get age() {
      return this._age;
    }
  }

  const p = new Person("kiki", 10);
  console.log(p.name, p.age);
  // 使用get和set访问私有属性
  p.name = "haha";
  console.log(p.name);
  p.age = 1000;
  console.log(p.age);

  export {};
  ```

### 参数属性(语法糖)

- 语法糖: ==给属性添加成员标识符 pubilc private protected readonly ...(等同前面)==

  ```ts
  class Person {
    // 语法糖: 添加类成员标识符
    constructor(public name: string, private _age: number) {}

    eating() {
      console.log(this.name, "is eating");
    }
  }
  // 实例对象(instance) p1
  const p1 = new Person("kiki", 20);
  p1.eating();
  console.log(p1.name);

  export {};
  ```

### 抽象类 abstract(了解)

- 抽象方法: 只有声明没有实现体,方法具体让子类帮自己实现; ==抽象方法必须出现在抽象类中,继承这个抽象类的子类,必须实现其抽象方法,抽象类也不能实例化==
- ==**前端用的少,一般只在封装工具中使用,后端比如 java 用的多**==

  ```ts
  // 抽象类
  abstract class Shape {
    // 抽象方法: 只定义没实体,方法的实现依靠子类
    abstract getArea(): number;
  }

  // 子类继承抽象父类则必须实现父类的抽象方法
  class Circle extends Shape {
    constructor(public radius: number) {
      super();
    }

    getArea() {
      return this.radius ** 2 * Math.PI;
    }
  }
  // 子类2: 矩形
  class Rectangle extends Shape {
    constructor(public width: number, public height: number) {
      super();
    }

    getArea() {
      return this.width * this.height;
    }
  }

  // 获取不同图形的面积
  function calcArea(shape: Shape) {
    return shape.getArea();
  }

  calcArea(new Rectangle(10, 20));
  calcArea(new Circle(10));
  // 父类是抽象类,不能实例化 new Shape() X
  // 父类引用指向子类对象 --- 多态: 不同的数据类型进行同一操作表现不同的行为
  const shape1: Shape = new Rectangle(1, 2);
  ```

### TS 类型检测--鸭子类型(了解)

- ts 的类型检测对比 java 宽松很多,==鸭子类型即不严格看类型,而只关心类内部的属性和方法是否符合一致==

  ```ts
  class Person {
    // 属性
    constructor(public name: string, public age: number) {}
    // 行为
    eating() {}
  }

  class Dog {
    // 属性
    constructor(public name: string, public age: number) {}
    // 行为
    eating() {}
  }

  // 在java中明显是错误的,但是在ts(js)中,由于Dog拥有和Person一样的属性和行为,所以认定Dog就是Person类
  const p: Person = new Dog("旺财", 1);
  ```

### 属性修饰符

- **属性修饰符**: ==?可选属性 readonly 只读属性==
  ```ts
  interface person {
    name?: string;
    readonly age: number;
  }
  ```

### 索引签名(了解)

- 索引签名: ==定义索引类型和返回值的类型==
- ==1.初级应用和语法结构==

  ```ts
  // 在不知道返回值具体内容时,可以提前知道返回值的'形状',即key-value格式
  interface fooType {
    // 索引签名: 通过字符串索引,可以获取字符串值
    // 语法: [索引名字: 索引的类型]: 返回值的类型; 其中索引名字自定义,随便起
    [key: string]: string;
  }

  function foo(): fooType {
    const a: any = "aaa";
    return a;
  }

  const info = foo();
  console.log(info["a"]);
  ```

- ==2.索引签名使用场景: 封装工具函数时,知道传入的参数可以通过数字索引获取字符串数据,就可以进一步做些操作==

  ```ts
  interface ICollection {
    // 规定索引key为number,返回值为number(index自定义名字,随意起)
    // 一个索引签名的类型必须为number或string类型
    [index: number]: string;
    length: number;
  }

  function printCollection(collection: ICollection) {
    // 知道传入的参数可以通过数字索引获取字符串数据,就可以进一步做些操作
    for (let i = 0; i < collection.length; i++) {
      const item = collection[i];
      console.log(item.length);
    }
  }

  // arr和tuple都可以通过数字索引获取字符串值
  // arr和tuple都是对象,都有length属性,属性值都为number类型
  let arr = ["aaa", "bbb", "ccc"];
  let tuple: [string, string] = ["why", "haha"];

  printCollection(arr);
  printCollection(tuple);
  ```

- ==3.**一个索引签名的类型必须为 number 或 string 类型(number | string)**==
- ==特殊地,js 在通过数组索引值去取值时,如果索引是数字类型,也会转化为字符类型取操作,即有`names[0]等同于names["0"]`.==
- ==辨析下面 2 中情况==

  ```ts
  interface IIndexType {
    [index: string]: any;
  }
  const names: IIndexType = ["aa", "bb", "cc"];
  ```

  ```ts
  interface IIndexType {
    [index: string]: string;
  }

  // 报错原因为,创建字面量数组,也是数组类型,内部有许多属性,比如forEach,map,filter等
  // 这些属性值可以通过 names["forEach"] 获取,但是获取的值是函数,所以返回值有的不满足是string,出现报错
  const names: IIndexType = ["aa", "bb", "cc"];
  ```

- ==**4. 2 个索引签名的情况**==

  ```ts
  interface IIndexType {
    // 写多个
    [index: number]: string;
    [index: string]: any;
  }

  const names: IIndexType = ["aaa", "bbb"];
  const item1 = names[0]; // 拿的字符串
  const forEachFn = names["forEach"]; // 拿的模糊any类型
  ```

- ==注意: 数字类型索引的类型必须是字符串类型索引的类型的子类==
  ```ts
  interface IIndexType {
    // 原因: 数字类型索引都会转为字符串类型去取值,所以数字类型索引范围不能大于字符串类型索引范围
    [index: number]: number | string;
    [index: string]: string;
  }
  ```
  > 举例: names[0]可以取到 number 或 string 类型的值,但是 js 做处理时,统一把 names[0]->names["0"],可是索引签名规定了,字符串索引获取的值只能为 string,所以会出现矛盾,不安全
- ==5.如果索引签名中有其他属性,那么其他属性的返回类型必须满足 string 类型返回的类型==
  ```ts
  interface IIndexType {
    [index: string]: number | string;
    length: Boolean; // X
    info: string; // V
  }
  ```
  > ==其他属性比如 length 和 info==,names["length"]返回值是布尔类型,但是上面规定了 string 类型获取的返回值只能为 number 和 string 类型,出现矛盾

### 类实现接口(了解)

- interface 定义的对象类型是可以有继承特性的,前面学习 type 和 interface 区别时学习过
- ==接口继承应用==
  - 1.接口继承可以减少代码量
  - 2.我们自定义接口可以继承一些第三方库的接口,然后再添加一些自定义的方法,完善为自己的接口
  - 3.==接口被类实现,让某一个类实现一个接口==
- 接口被类实现(==简化对象的创建==)

  ```ts
  interface IKun {
    name: string;
    age: number;
    playBall: () => void;
  }

  interface IRun {
    running: () => void;
  }

  // 类实现接口(可以多个),类要实现接口的所有要求
  class Person implements IKun, IRun {
    name!: string;
    age!: number;
    playBall!: () => void;
    running!: () => void;
  }

  // 1.通过new构造函数直接创建对应的接口对象
  const p1 = new Person();
  // p1对象继承2个接口所有要求
  p1.name = "ikun";
  console.log(p1.name);

  // 2.常规定义---单个
  const p2: IKun = {
    name: "kkk",
    age: 10,
    playBall: function () {},
  };
  console.log(p2.name);

  export {};
  ```

### 严格字面量赋值检测

- ==一个奇怪的小细节,属于 ts 的特性==

  ```ts
  interface IPerson {
    name: string;
    age: number;
  }

  // 奇怪的现象: 将不符合规则的对象'非直接'赋值给IPerson类型数据
  let obj = {
    name: "kobe",
    age: 30,
    height: 1.99,
  };

  const info: IPerson = obj;

  // 同理,函数的参数也是如此
  function printInfo(person: IPerson) {}

  const kobe = { name: "kobe", age: 30, height: 1.92 };
  printInfo(kobe);
  ```

- 现象解释: ts 的官方 issue
  ```ts
  // 特殊规则:
  // 第一次创建的字面量,称之为fresh(新鲜的)
  // 对于新鲜的字面量,会进行严格的类型检测,必须满足类型需求
  const info2: IPerson = {
    name: "kkkk",
    age: 20,
    height: 1.88, // 此时新创建的字面量对象是新鲜的,检测出多余参数height
  };

  // 什么时候新鲜值消失? 类型断言或字面量类型扩散时,新鲜度会消失
  // 之前的操作属于字面量类型扩散,把创建的字面量赋值给别的变量,扩散了,新鲜度消失,所以不再严格类型检测
  ```

### 抽象类和接口的区别(了解)

- ==java 后端中十分常见的面试题==
- 3 的下午开头,不听了

### TS 的枚举类型(了解)

- 枚举类型: ts 独有的新类型,js 没有

  ```ts
  // 定义枚举类型数据一般大写
  enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
  }

  const d1: Direction = Direction.UP;
  console.log(d1); // 打印此数据在枚举中的索引,从0开始,0

  function game(direction: Direction) {
    switch (direction) {
      case Direction.UP:
        console.log("小人跳跃");
        break;
    }
  }

  game(d1);
  ```

- 枚举类型的值,默认有值,从 0 开始,可以自定义数字类型,后面会递增,也可以自定义字符串类型,不过后面要跟着全部定义字符串
  ```ts
    enum Direction{
      UP = 100,
      DOWN, // 101
      LEFT, // 102
      RIGHT // 103
    }
    ===============
    enum Direction{
      UP = "UP",
      DOWN = "DOWN",
      LEFT = "LEFT",
      RIGHT = "RIGHT"
    }
  ```

## TS 泛型编程(最难)

### 前情提要(必读)

==**从映射类型(\*)开始,难度相当大,并且在业务中几乎用不到,属于 TS 级别中 5 和 6 的级别(框架作者,TS 作者)**==

### 类型参数化

- ==类型参数化: 防止类型丢失,每个 res 都有自己的类型;同时更加灵活地确定参数类型==

  ```ts
  // Type命名自定义
  function bar<Type>(args: Type) {
    return args;
  }

  // 把类型作为参数传进函数,由Type接受
  const res1 = bar<number>(123);
  const res2 = bar<string>("aaa");
  const res3 = bar<{ name: string }>({ name: "codewhy" });

  // 自动类型推导,简写
  // 根据参数"cf"推导出Type类型为"cf"或string
  const res4 = bar("cf"); // const推导更加具体,为字面量类型
  let res5 = bar("cf"); // let推导就是string类型
  // 对于没法正确推导的情况,还是自己写一下的
  // 因为数组中没有值,自动推导会认定这是个never类型数组
  const res6 = bar<any[]>([]);
  ```

- ==案例练习==

  ```ts
  function useState<Type>(initState: Type): [Type, (newState: Type) => void] {
    let state = initState;
    function setState(newState: Type) {
      state = newState;
    }
    return [state, setState];
  }

  const [count, setCount] = useState(100);
  const [message, setMessage] = useState("message");
  const [array, setArray] = useState<any[]>([]);
  ```

- ==多个参数==

  ```ts
  function foo<Type, Element>(arg1: Type, arg2: Element) {}

  foo(100, 200);
  foo(100, "hell0");
  foo([1, 2, 3], { name: "kiki" });
  ```

  > 一般命名的缩写
  > T---Type
  > E---Element
  > K,V---Key,Value
  > O---Object

### 泛型接口参数化

```ts
// 接口的泛型可以自定义参数类型
interface IKun<Type = string> {
  name: Type;
  age: number;
  singal: Type;
}
// 默认string
const kun1: IKun = {
  name: "kun1",
  age: 12,
  singal: "hahaha",
};
// 传递
const kun2: IKun<number> = {
  name: 123,
  age: 12,
  singal: 100,
};

export {};
```

### 泛型类参数化

```ts
class Point<Type = number> {
  x: Type;
  y: Type;
  constructor(x: Type, y: Type) {
    this.x = x;
    this.y = y;
  }
}

const p1 = new Point(10, 20);
const p2 = new Point("111", "222");

export {};
```

### 泛型约束

- 简单了解,==通过 extends 约束了 Type 的检测,传入的参数必须满足 ILength==
- ==常规情况==

  ```ts
  interface ILength {
    length: number;
  }

  function getInfo(args: Ilength) {
    return args;
  }

  // 此条件下,info1,2,3丢失自己的类型,全是Ilength类型
  const info1 = getInfo("123");
  const info2 = getInfo([]);
  const info3 = getInfo({});
  ```

- ==不丢失自己类型 + ILength 检测==

  ```ts
  interface ILength {
    length: number;
  }

  // Type相当于一个变量,记录本次参数的类型
  // 并且继承ILength后,还可以对传入的参数进行ILength方面的类型检测
  function getInfo<Type extends ILength>(args: Type): Type {
    return args;
  }

  const info1 = getInfo("aaa");
  const info2 = getInfo([1, 2, 3]);
  const info3 = getInfo({ length: 1 });
  // const info4 = getInfo({name:"1"}) // X
  ```

### 泛型参数的约束

- ==新知识 keyof==

  ```ts
  // 约束泛型的参数
  interface Ikun {
    name: string;
    age: number;
  }

  type IKunKeys = keyof Ikun; // 等于key值的联合类型 "name" | "age"
  ```

- ==需求:根据输入 obj 和 key,获取对应的 value,同时要求 key 必须是 obj 属性之一==

  ```ts
  // 参数obj的类型为O,参数key的类型为K
  // O: 就是传入的参数info对象
  // K: keyof O ,返回info对象的所有key值的联合类型("name"|"age"|"height")
  function getObjectProperty<O, K extends keyof O>(obj: O, key: K) {
    return obj[key];
  }

  const info = {
    name: "codewhy",
    age: 20,
    height: 1.9,
  };

  const name1 = getObjectProperty(info, "age");
  // const name2 = getObjectProperty(info,"address") // X
  ```

### 映射类型(\*)

- 映射类型: 一个类型需要基于另一个类型,不想要拷贝,就是用映射类型,定义映射工具,只能用 type 不能用 interface

  ```ts
  // 用type定义映射工具,映射工具类似函数
  type MapPerson<Type> = {
    // 索引签名的格式:
    // 获取Type所有的key("name"|"age")
    [property in keyof Type]: Type[property];
  };
  // 要拷贝的类型
  interface IPerson {
    name: string;
    age: number;
  }

  type NewPerson = MapPerson<IPerson>;

  export {};
  ```

### 映射-修饰符使用

- ==选择性拷贝,可选类型?==
  ```ts
  // 选择性拷贝,可选类型?
  type MapOptionalIperson<Type> = {
    [property in keyof Type]?: Type[property];
  };
  ```
- ==只读属性 readonly==
  ```ts
  type MapReadonlyIperson<Type> = {
    readonly [property in keyof Type]: Type[property];
  };
  ```

### 映射-修饰符符号

- 修饰符前面有符号`+`和`-`,默认`+`,代表需要,`-`代表不需要,`-`主要应用于把带有修饰符的类型全部删除

  ```ts
  type MapRequiredIperson<Type> = {
    -readonly [property in keyof Type]-?: Type[property];
  };

  // 要拷贝的类型
  interface IPerson {
    readonly name: string;
    age?: number;
  }

  // 新的属性中readonly和?都没了
  type RequiredIperson = MapRequiredIperson<IPerson>;
  ```

### 内置工具和类型体操 X

- 2:57:00
