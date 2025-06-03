# TypeScript
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
  - 3.大多数 any,有些普通类型可以掌握
  - ==4.大多数类型不是 any,可以把握很多类型(**到这里就挺好,高级前端工程师**)==
  - 5.可以使用 ts 封装一些工具,写一些框架,学会使用 ts 内置工具(==vue/react 开发人员水平==)
  - 6.会看 ts 源码(==TS 开发者水平==)
- ==5.认识TS的本质==
  - ts本身是类型检测的工具,是对js的补全,最大的作用就是在编译开发阶段,编译器给程序员提供类型检测,但是最终都要转为js才能运行,也就是说打包后的所有的ts都会变为js,所以你的ts只在开发阶段存在,在生产阶段就没有了,而且ts只是js的类型检测工具,没必要花很多时间去深入学习,基本的会了,最大到能看懂源码中的类型注解就够了,知道这个函数方法要输入什么输出什么,有几个参数等
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
    friend?: { // 可选属性
      name: string;
    };
  }

  const info: IPerson = {
    name: "kiki",
    age: 20,
  };

  // ?可选链,如果前面为undefined,后面不执行 
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

## TS 函数类型

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

    // 那么ts为什么这么设计?
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
  // 1.函数类型表达式,不能定义属性
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

- ==Vue3 Componsition API 和 react 的 Hooks 写法中,this 越来越少==,所以还是简单学习下 ts 中的 `this` 问题,可能用不到.
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

- 支持3种修饰符,==修饰类中的**属性和方法**(等于 java==)

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
- ==**私有属性private如果没有set和get,就只能在类内部修改和获取,由于在js中没有类成员修饰符,所以可以随意获取与修改,不过这是不安全的**==
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

## TS 泛型编程
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
// 传参number,不使用默认类型string
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
## TS 知识扩展
### TS模块化
- ==1.js的模块化==:
  - ==CommonJs== -> node环境/webpack/vite -> `module.exports`
  - ==EsModule== -> `import/export`
  > 随着es模块化被加入js规范中,es模块化越来越通用,包括node/webpack/vite都可以支持es模块化
- ==2.js/ts中什么是一个模块?==
  - JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块。
  - 在一个脚本文件中，变量和类型会被声明在共享的全局作用域(==会极大概率导致重名==)，将多个输入文件合并成一个输出文件，或者在HTML使用多个`<script>`标签加载这些文件。
  ◼ 如果你有一个文件，现在没有任何import 或者export，但是你希望它被作为模块处理，添加这行代码`export {}`,==这也是为什么我们每个ts练习代码都要加这行代码的原因,不添加后导致所有ts文件无法模块化,相互影响==
  ◼ `export {}`这段代码会把文件改成一个没有导出任何内容的模块，这个语法可以生效，无论你的模块目标是什么
- ==3.内置类型导入==
- ts支持类型的导入,如下
  ```ts
    // utils/type.ts
    export type IDType = number | string
  ```
  ```ts
    import { type IDType } from "./utils/type";

    let id1: IDType = '001'
    let id2: IDType = 1
    console.log(id1,id2)
  ```
  > ==在这里我们推荐加入type前缀,这样可以减少不必要的代码解析==
  > ==原因==: ts代码最终会经过编译器babel或esbuild(vite)等,转化为js代码,而这个类型ts只会在开发环境中使用类型检测提醒程序员有没有写错类型,但是在转为js代码后,ts的所有类型检测都是没有用的,额外的解析这些引入是无意义的,所以添加type前缀后,编译器在解析ts代码时,会把这些无意义的类型引入直接删除,减少编译时间;
  > ==额外的==: 如果类型引入过多,可以统一在`{}`前加一个type即可,不必每个类型前面一个个添加type

### 命名空间(了解)
- 在esmodule之前,前端关于模块化百花齐放,这个命名空间就是ts推出的模块化方法,==但是随着es模块化推出,ts官方已不推荐使用命名空间了==
- 命名空间中的语法在esmodule中都涵盖了,有些旧文档项目可能会有命名空间的使用,了解一下即可
  ```ts
    // utils/format.ts
    // 如果外界要使用,要export导出
    // 命名空间的内部之间不互相干扰
    export namespace price{
      export function format (price: number) {
        return price + '元'
      }
    }

    export namespace date{
      export function format (date: number) {
        return date + '天'
      }
    }
  ```
  ```ts
    import {price,date} from './utils/format'

    // 使用命名空间
    price.format(10)
    date.format(15)
  ```
### webpack中运行ts
- 运行ts的方法,比如单个简单的文件,运行方式`ts-node 文件名`; 还有一个方式,在运行项目时,有太多的ts文件,而且有时需要浏览器显示,所以可以在webpack环境中运行ts代码
- ==在webpack中自动运行ts的步骤==: 
  - 初始化项目: `npm init` 
  - webpack的核心: `npm i webpack webpack-cli -D` 
  - 配置 webpack.config.js, 具体代码略(忘记了复习一下)
  - 解析loader: `npm i ts-loader -D`, 必须有tsconfig.js文件(命令: `ts --init`)
  - html文件提供页面: `npm i html-webpack-plugin -D`, 记得创建html文件
  - 把程序跑起来: `npm i webpack-dev-server`, 配置package.json中的script`{ serve: webpack serve }` 
  - 启动程序: `npm run serve`
  > ==接下来许多测试均在webpack环境中进行测试==
### 类型声明
- 1.之前我们所有的typescript中的类型，几乎都是我们自己编写的，但是我们也有用到一些其他的类型：
  - 大家是否会奇怪，我们的`HTMLImageElement`类型来自哪里呢？甚至是`document`为什么可以有`getElementById`的方法呢？==即在vscode中写代码时,会自动提示下一步可能要调用什么方法==
- 2.其实这里就涉及到typescript对类型的管理和查找规则了。
  - ==我们这里先给大家介绍另外的一种typescript文件：.d.ts文件==,我们之前编写的typescript文件都是.ts 文件，这些文件最终会输出.js 文件，也是我们通常编写代码的地方；
  - ==还有另外一种文件.d.ts文件，它是用来做类型的声明(declare)，称之为类型声明（Type Declaration）或者类型定义（Type Definition）文件。内部只有声明的代码,没有任何常规的逻辑代码==
  - 它仅仅用来做类型检测，告知typescript我们有哪些类型；而这些类型声明在我们写代码时可以给我们提示
- 3.通过点击document进入源码,如下
  [![pV93RBR.png](https://s21.ax1x.com/2025/05/31/pV93RBR.png)](https://imgse.com/i/pV93RBR)
- ==**4.那么typescript会在哪里查找我们的类型声明呢？**==
- ==4.1内置类型声明==: typescript自带的
  - typescript仓库中的lib中存放着所有的声明文件: https://github.com/microsoft/TypeScript/tree/main/src/lib
  - 创建过tsconfig.json文件(命令: `ts --init`): 内部的配置过target和lib来决定哪些内置类型声明是可以使用的 (了解), 有些框架比如vite会自动帮你配置
- ==4.2外部定义类型声明==: 第三方库,例如 react/axios等
  - 比如axios,本身自带类型声明文件,直接可以在ts中使用
    [![pV98bGT.png](https://s21.ax1x.com/2025/05/31/pV98bGT.png)](https://imgse.com/i/pV98bGT)
  - ==有的库没有类型声明文件,比如react,则无法直接在react中使用==
   [![pV98HiV.png](https://s21.ax1x.com/2025/05/31/pV98HiV.png)](https://imgse.com/i/pV98HiV)
  - ==社区的一个公有库DefinitelyTyped存放类型声明文件==,该库的GitHub地址: https://github.com/DefinitelyTyped/DefinitelyTyped/
  - ==npm官网搜索 `@types/库名`==,一般可以搜到ts类型声明的第三方包,几乎都是这么命名的,react的命令为`npm i @types/react --save-dev`,在下面的文件中找下载的声明文件
  [![pV98qRU.png](https://s21.ax1x.com/2025/05/31/pV98qRU.png)](https://imgse.com/i/pV98qRU)
- ==4.3自己定义类型声明==
  - 假如有的第三方库搜不到官方的类型声明文件时,就需要自己写一个声明文件,假如lodash没有(实际上有),仅下载lodash文件
  - 自己定义类型声明文件如下,后面学习declare
    ```ts
      // types/why.d.ts
      // 声明模块
      declare module "lodash" {
        // 声明模块下的一个函数
        export function join(...args: any): any
      }
    ```
    ```ts
      // index.ts
      import _ from 'lodash'
      _.join()
    ```
  - ==还可以给自己编写的代码编写类型声明==,不过平时定义使用声明,或许只会用一次,没有必要随便一个类型声明就写在`.d.ts`文件中,如下
    ```ts
      // why.d.ts
      // 类型
      type IdTypes = string | number 
      interface IKun{
        name: string
        age: number
        slogan: string
      }
    ```
    > 上面这种直接写普通ts文件即可,下面紧接着使用这个类型,大概率这个声明类型只会用一到两次
  - ==但是有的场景需要类型声明,比如声明全局的变量,函数,类等==
  - 比如在index.html文件下,定义了这些,==看注释==
    ```html
      <body>
        <script>
          const whyName = 'codewhy'

          function foo(bar) {
            return 'hello world' + bar
          }

          class Person {
            constructor(name, age) {
              this.name = name
              this.age = age
            }
          }
        </script>
    ->  <!-- webpack打包后,会把bundle.js文件放在这里引入index.html文件,所以上面的定义正常js文件可以获取,但是ts需要额外定义,它找不到模块 -->
      </body>
    ```
  - 在`why.d.ts`中定义类型
    ```ts
      // 全局变量
      declare const whyName: string
      // 函数
      declare function foo(bar: string):string
      // 类
      declare class Person {
        // 定义类的属性
        name: string
        age: number 
        // 可传入的属性和类型
        constructor(name: string , age: number)
      }
      // 语法糖
      declare class Person {
        constructor( public name: string , public age: number)
      }
    ``` 
  - index.ts中有了类型声明后,就可以直接使用了
    ```ts
      console.log(whyName)
      console.log(foo('小明'))
      const p1 = new Person('kiki', 20)
      console.log(p1.name, p1.age)
    ```
### declare声明模块
- 前面学习了`declare`的使用,可以单独的小部分声明,如上一节,而对于内部可能有多个声明的,比如举例的lodash,可以声明模块的语法: `declare module '模块名' {}`,在声明模块的内部，我们可以通过`export`导出对应库的类、函数等
- ==另外的,ts要对一些文件进行声明,比如不认识图片==
  ```ts
    // 声明(图片)文件
    declare module "*.png"
    declare module "*.jpg"
    declare module "*.jpeg"
    declare module "*.svg"
    declare module "*.gif"
  ```
  > 记得webpack对图片进行loader配置
  > 其实ts对`.vue`都是不识别的,不过vite脚手架已经配置好了,所以可以用,而且vue文件不是作为模块引入的,是作为组件引入的,它有自己的类型,这个不用管,vite已经弄好了
- ==CDN引入文件时,如何进行声明==
  - 比如直接CDN引入jquery,CDN地址：https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js
  - 此时使用`declare`声明为一个模块,但是模块是需要引入的,我们用的CDN,所以在`node_mudules`中根本没有jquery模块,无法引入
    ```ts
      declare module "$" {
        // .......
      }
    ```
  - ==此时使用declare命名空间==
    ```ts
      declare namespace "$" {
        export function ajax(settings: any): any
      }
    ```
### 认识tsconfig.json
- ==1.什么是tsconfig.json文件呢？（官方的解释）==
  - 当目录中出现了tsconfig.json 文件，则说明该目录是 TypeScript 项目的根目录；
  - tsconfig.json 文件指定了编译项目所需的根目录下的文件以及编译选项。
- ==2.对官方解释总结一下==
  - ==作用一（主要的作用）==：让TypeScript Compiler在编译的时候，知道如何去编译TypeScript代码和进行类型检测；
    - 比如是否允许不明确的this选项，是否允许隐式的any类型；
    - 将TypeScript代码编译成什么版本的JavaScript代码；
  - 作用二：让==编辑器（比如VSCode）==可以按照正确的方式识别TypeScript代码,== 对于哪些语法进行提示、类型错误检测等等==；
- ==3.jsconfig.json==
  - JavaScript 项目可以使用 jsconfig.json 文件，它的作用与 tsconfig.json 基本相同，只是默认启用了一些 JavaScript 相关的编译选项,在之前的Vue项目、React项目中我们也有使用过,jsconfig可以让编译器提供更好的提示,也配置过别名`@`等
- ==4.tsconfig.json的配置==
  - tsconfig.json在编译时如何被使用呢?
    - 在调用tsc命令并且没有其它输入文件参数时，编译器将由当前目录开始向父级目录寻找包含tsconfig 文件的目录。
    - 调用tsc命令并且没有其他输入文件参数，可以使用--project （或者只是-p）的命令行选项来指定包含了tsconfig.json 的
  目录；
    - ==当命令行中指定了输入文件参数，tsconfig.json 文件会被忽略, 例如`tsc index.ts`==
  - ==webpack中使用ts-loader进行打包时，也会自动读取tsconfig文件，根据配置编译TypeScript代码。==
  - tsconfig.json文件包括哪些选项呢？
     - tsconfig.json本身包括的选项非常非常多，我们不需要每一个都记住；
     - ==可以查看文档对于每个选项的解释==: https://www.typescriptlang.org/tsconfig
     - 当我们开发项目的时候，选择TypeScript模板时，tsconfig文件默认都会帮助我们配置好的, ==比如vite,几乎不需要你做任何事情==
- ==5.常见的编译选项==
- 默认的tsconfig.json结构如下
  [![pV92MtK.png](https://s21.ax1x.com/2025/06/01/pV92MtK.png)](https://imgse.com/i/pV92MtK)
- 对于compilerOptions编辑如下 (详情见文档: https://www.typescriptlang.org/tsconfig)
  [![pV92QfO.png](https://s21.ax1x.com/2025/06/01/pV92QfO.png)](https://imgse.com/i/pV92QfO)
  [![pV92Kk6.png](https://s21.ax1x.com/2025/06/01/pV92Kk6.png)](https://imgse.com/i/pV92Kk6)
## TS Axios封装
- 二次封装的好处:
  [![pV9h1UI.png](https://s21.ax1x.com/2025/06/01/pV9h1UI.png)](https://imgse.com/i/pV9h1UI)
### 初始封装
- 初步创建网络请求的文件夹目录
  - service
    - request: axios二次封装的地方
    - modules: 单独的网络请求
    - config:固定的配置
- ==1.初始的axios封装==
  ```ts
    // request/index.ts
    import axios from 'axios'
    import type {AxiosInstance,AxiosRequestConfig} from 'axios' // babel转化ts->js代码时,会自动删除类型的引入

    class HYRequest {
      instance: AxiosInstance // 必写的,ts需要确定instance的类型

      // 每次使用都会创建一个新的axios实例,实例对象之间配置互不干扰
      // 这里的congif类型在源码中为CreateAxiosDefaults,它继承自AxiosRequestConfig,coderwhy老师选择AxiosRequestConfig,区别不大
      constructor(config: AxiosRequestConfig){ // 更好的提示,更加的灵活
        this.instance = axios.create(config)
      }

      // 封装网络请求的方法
      request(config: AxiosRequestConfig){
        return this.instance.request(config)
      }
    }

    export default HYRequest
  ```
- ==注意的点==
  - 1.instance和config的类型都是根据axios.create()提示的ts源码(axios.d.ts)获取到的
  - 2.使用config作为参数时为了更加灵活的传参,别人使用这个库时可以不严格按照某些特定的顺序,并且借用axios的ts类型,所以会有等同于axios的友好提示
  - 3.每次使用这个类都会创建一个新的axios实例对象,实例对象之间配置互不干扰,如下
    ```ts
      // service/index.ts
      import { BASE_URL, TIME_OUT } from "./config";
      import HYRequest from "./request";

      // 我可以写多个实例对象,每个实例对象都有自己的配置
      const hyRequest1 = new HYRequest({
        baseURL: BASE_URL,
        timeout: TIME_OUT
      })

      // const hyRequest2 = new HYRequest({ 独有的配置... }) 
      // const hyRequest3 = new HYRequest({ 独有的配置... }) 

      export {
        hyRequest1
      }
    ```
    > 常量的config的书写就省略了
- ==2.请求的测试== 
    ```ts
      // modules/home/index.ts
      import { hyRequest1 } from "..";
      
      // 发送网络请求 ....
      hyRequest1.request({
        url: '/home/multidata'
      }).then(res => console.log(res))
    ```
- ==3.引入webpack的依赖图==
- 因为是webpack环境,所以打包时,需要将home引入webpack的依赖图
  ```ts
    // src/index.ts
    import './service/modules/home' // 引入webpack的依赖图
  ```
### 添加拦截器
- ==拦截器: 应用比如有: 蒙版isLoading,请求携带token,修改配置(返回自带.data)==
  >
- ==1.添加基础的公有拦截器==
  ```ts
    class HYRequest {
      instance: AxiosInstance

      constructor(config: AxiosRequestConfig){ 
        this.instance = axios.create(config)

        // 给每一个实例添加拦截器
        this.instance.interceptors.request.use((config)=>{
          console.log('全局请求成功拦截')
          return config
        }, err => {
          console.log('全局请求失败拦截')
          return err
        })

        this.instance.interceptors.response.use((res)=> {
          console.log('全局响应成功拦截')
          return res
        },err => {
          console.log('全局响应失败拦截')
          return err
        })
      }

      // 封装网络请求的方法
      request(config: AxiosRequestConfig){
        return this.instance.request(config)
      }
    }
  ```
  > ==这样添加拦截器有个缺点,就是所有的拦截器都是写死在全局的,接下来我们要给config封装一个可以自定义传递的拦截器==
- ==2.自定义拦截器==
- 2.1 config的类型问题,如上我们的config直接使用axios内部config类型AxiosRequestConfig,而这个类型内部是没有关于拦截器参数的定义声明的,所以我们要自己写一个,如下
  ```ts
    interface HYInterceptors {
      // 源码中,config的类型现在已经改为InternalAxiosRequestConfig,它继承自AxiosRequestConfig
      // 老师当时还是AxiosRequestConfig版本,这里略微更新一下,其实区别也不大
      requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
      requestFailureFn?: (err: any)=> any
      responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
      responseFailureFn?: (err: any)=> any
    }

    // 针对AxiosRequestConfig进行扩展
    interface HYRequestConfig extends AxiosRequestConfig{
      interceptors ?: HYInterceptors
    }
  ```
  > ==1.首先对原有的AxiosRequestConfig进行扩展,那么定义新的类型HYRequestConfig继承自它,然后添加拦截器类型声明(自定义的,可选的)==
  > ==2.拦截器属性获取是对象类型,用interface定义,然后内部四个属性自定义名字(都是可选的),然后关于它们的类型都是去axios源码中复制对应类型找到的,寻找过程大致如下,学会基础TS,能看懂源码的类型声明来自哪里就足够了==
  [![pV9h35t.png](https://s21.ax1x.com/2025/06/01/pV9h35t.png)](https://imgse.com/i/pV9h35t)
- 2.2 添加特殊的拦截器声明,拦截器可以有多个
  ```ts
    class HYRequest {
      instance: AxiosInstance

      constructor(config: HYRequestConfig){ 
        this.instance = axios.create(config)

        // 给每一个实例添加拦截器
        this.instance.interceptors.request.use((config)=>{
          // ....
        })

        this.instance.interceptors.response.use((res)=> {
          // ....
        })

        // 针对特定的拦截器,如果有就在原有的基础上添加新的拦截器,拦截器可以有多个
        if(config.interceptors) { // 只要传入的config参数中有interceptors属性,就添加它的专属拦截器
          this.instance.interceptors.request.use(
            config.interceptors.requestSuccessFn,
            config.interceptors.requestFailureFn
          )
          this.instance.interceptors.response.use(
            config.interceptors.responseSuccessFn,
            config.interceptors.responseFailureFn
          )
        }
      }

      // 封装网络请求的方法
      request(config: AxiosRequestConfig){
        return this.instance.request(config)
      }
    }
  ```
- 2.3 测试拦截器的效果
  ```ts
    // service/index.ts
    const hyRequest1 = new HYRequest({
      baseURL: BASE_URL,
      timeout: TIME_OUT
    })

    // 爱彼迎的数据有自己独有的拦截函数处理,既有全局的拦截器,也有自己的
    const hyRequest2 = new HYRequest({
      baseURL: "http://codercba.com:1888/airbnb/api",
      timeout: 8000,
      interceptors: {
        requestSuccessFn(config) {
          console.log('爱彼迎请求成功的拦截')
          return config
        },
        requestFailureFn(err) {
          console.log('爱彼迎请求失败的拦截')
          return err
        },
        responseSuccessFn(res) {
          console.log('爱彼迎响应成功的拦截')
          return res
        },
        responseFailureFn(err) {
          console.log('爱彼迎响应失败的拦截')
          return err
        },
      }
    })
  ```
  ```ts
    // modules/index.ts

    hyRequest1.request({
      url: '/home/multidata'
    }).then(res => console.log(res))


    hyRequest2.request({
      url: '/home/discount'
    }).then(res => console.log(res))
  ```
### 单次请求拦截(理解)
- 这个功能用的少,即使没有封装也可以,而且由于axios的声明更新了,所以更改后的封装可能有疏漏
- ==前面已经写了全局拦截和实例个性化拦截两种拦截机制,现在写单次网络请求的拦截,即只针对某一次网络请求的拦截,不会把拦截加到实例上,如果注释掉此次网络请求,对应的拦截操作也会消失==
- ==稍微比较复杂,不过这个方法用的比较少==
  ```ts
    // 封装网络请求的方法
    // 添加单次网络请求的拦截器,不可以添加到实例对象上
    // 拦截器的本质就是钩子函数,在对应的时机回调拦截器的函数
    request(config: HYRequestConfig){
      if(config.interceptors?.requestSuccessFn){
        config.headers = config.headers || new AxiosHeaders() // 防止安全漏洞,成功的回调参数类型InternalAxiosRequestConfig需要headers
        // 1.单次请求成功的请求拦截
        config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig) // 类型断言as帮助跳过ts检测
      }

      // 拆分网络请求,从内部拿响应数据res,在返回res之前调用响应拦截的回调函数,传入初始数据res,获取可能改变的res返回出去 -> resolve(res)
      return new Promise((resolve,reject) => {
        this.instance.request(config).then(res => { // .then成功请求到数据
          // 2.单次请求成功的响应拦截
          if(config.interceptors?.responseSuccessFn){
            // res被拦截后,在回调函数内部可能被改变
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res) // 返回新的res
        }).catch(err => {
          reject(err)
        })
      })
    }
  ```
- ==注意的点==
  - 1.coderwhy老师那时候代码还没有改变,现在的拦截器成功回调函数的参数config的类型已经为InternalAxiosRequestConfig
      ```ts
        interface HYInterceptors {
          // 源码中,config的类型现在已经改为InternalAxiosRequestConfig,它继承自AxiosRequestConfig
          // 老师当时还是AxiosRequestConfig版本
          requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
          // ...
        }
      ```
  - 所以在ts类型检测上强行先断言config类型为InternalAxiosRequestConfig,毕竟config的类型HYRequestConfig是我们自己扩展的,这个类型继承自AxiosRequestConfig,正是InternalAxiosRequestConfig继承的它,但是新增一个属性headers,这个属性添加了许多方法(set get ...)供我们使用,所以如果直接使用HYRequestConfig,ts会检测我们缺少headers属性,所以需要断言为InternalAxiosRequestConfig,然后再填补上headers的空缺,弥补漏洞,目前的知识水平只能做到这里
  - 2.內部做了参数请求的拦截,获取新的config; 响应数据的拦截,获取的新的res,如下图
    [![pVCkok9.png](https://s21.ax1x.com/2025/06/02/pVCkok9.png)](https://imgse.com/i/pVCkok9)
- ==2.测试拦截效果==
  ```ts
    // 在单次请求上添加拦截,注释掉后就不会有里面的拦截了
    hyRequest2.request({
      url: '/home/plus',  
      interceptors: {
        requestSuccessFn(config){
          console.log('单次请求拦截成功',config)
          // 对请求参数config做处理 + authToken ...
          return config
        },
        responseSuccessFn(res) {
          console.log('单次响应拦截成功',res)
          // 对响应数据res做处理, 数据格式整理....
          return res
        }
      }
    }).then(res => console.log('最终数据',res))
  ```
### 返回数据的规范(巨难)
- ==1.处理返回数据的类型==
- 首先promise返回的数据如果没有写类型,那么会默认为unknown,ts的这个类型数据有一个特点,就是无法做任何操作,比如`res.XXX`
- 所以根据上面我们可以给promise定义一个返回的类型,如下
  ```ts
    return new Promise<AxiosResponse>((resolve,reject) => {})
  ```
  > 这是一个标准的Promise返回数据res类型(AxiosResponse)
- 但是我们只需要res.data的数据,这是响应数据,所以我们在全局拦截器中修改返回的数据为res.data(==别忘记这一步,代码略==),这样的话返回的promise的数据res就不再是AxiosResponse类型,而是其内部的res.data,而这个是响应数据,响应数据千变万化的,它的类型不能写死,所以我们使用泛型,在调用request的时候把对应的数据类型传入,默认为any,这样即使不传类型,promise返回也是个any类型,总比unknown类型要好
  ```ts
    // 传入request函数的泛型T会被传入promise中
     return new Promise<T>((resolve,reject) => {
      this.instance.request(config).then(res => {
        if(config.interceptors?.responseSuccessFn){
          // ....
        }
        resolve(res) // res的类型为T
      }).catch(err => {
        reject(err)
      })
    })
  ```
- ==2.解决内部request的类型问题==
- 从上面的代码中,Promise的响应数据res类型被解决了,但是这个res是网络请求方法request的then回调参数res,这个res类型和T不一样(实际上它也是AxiosResponse),所以依据通过泛型去解决,结合request方法的源码,把T泛型传入正确的位置,从而覆盖request原本的类型
  ```ts
    return new Promise<T>((resolve,reject) => {
      // 泛型T传入它的第二个参数,第一个填充为any
      this.instance.request<any,T>(config).then(res => {})
    })
  ```
  [![pVCk4w4.png](https://s21.ax1x.com/2025/06/02/pVCk4w4.png)](https://imgse.com/i/pVCk4w4)
- 这样就可以自己规定返回值的类型T,不写默认为any,都不影响,而且可以直接获取到res.data内部的数据,因为有T的类型提示,所以写代码提示也更好
  ```ts
    interface IHomeData{
      data: any,
      returnCode: string,
      success: boolean
    }

    // 有了类型定义,作为泛型T传入,res可以获取更好的类型提示
    hyRequest1.request<IHomeData>({
      url: '/home/multidata'
    }).then(res => console.log(res.data,res.returnCode,res.success))


    interface IHomeDiscount{
      dest_address: any[],
      dest_list: any,
      subtitle: string,
      title: string,
      type: string,
      _id: string
    }

    hyRequest2.request<IHomeDiscount>({
      url: '/home/discount'
    }).then(res => console.log(res))
  ```
  [![pVCk5TJ.png](https://s21.ax1x.com/2025/06/02/pVCk5TJ.png)](https://imgse.com/i/pVCk5TJ)
- 3.处理单次请求拦截回调中的res类型,初始定义如下
  ```ts
    // 初始定义的类型
    responseSuccessFn?: (res: AxiosResponse) => AxiosResponse

    this.instance.request<any,T>(config).then(res => {  // res被修改为T
      if(config.interceptors?.responseSuccessFn){
        res = config.interceptors.responseSuccessFn(res) // 这里的类型要求还是AxiosResponse
      }
      resolve(res) 
    })
  ```
- 在修改request的res返回数据后,res的类型已经为T,但是这里面responseSuccessFn中的res类型还是为AxiosResponse,简便方式当然是把AxiosResponse全修改为any类型,但是有更加精细的方式,如下,把T的类型通过泛型一点点传到原先定义responseSuccessFn的地方去
  ```ts
    interface HYInterceptors<T = AxiosResponse> {
      requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
      requestFailureFn?: (err: any)=> any
      responseSuccessFn?: (res: T) => T
      responseFailureFn?: (err: any)=> any
    }

    // 针对AxiosRequestConfig进行扩展
    interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig{
      interceptors ?: HYInterceptors<T>
      // ...
    }

    // 同步T
    request<T = any>(config: HYRequestConfig<T>){}
  ```
  [![pVCkTYR.png](https://s21.ax1x.com/2025/06/02/pVCkTYR.png)](https://imgse.com/i/pVCkTYR)
### 总结
- 总结如下
  ```ts
    /**
    * 难点
    * 1. 拦截器精细化控制
    *  全局拦截器*
    *  实例拦截器**
    *  单次请求拦截器****
    * 
    * 2.响应结果数据类型处理(泛型)*****
    * 
    * 未来,文件上传等功能都可以在这里基础上继续封装(Node高级)
    */
  ```


## 内置工具和类型体操(X)
- 类型体操的仓库: `https://github.com/type-challenges/type-challenges`,另外类型体操的题解网站已经收藏(加载可能需要额外等待一会,刷新一下)
- ==**这个阶段(5,6)的TS对普通开发业务没有必要,平常用处不大,选择性了解即可**==
### 映射类型
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
### 条件类型
- 日常开发中我们需要基于输入的值来决定输出的值，同样我们也需要基于==输入的值的类型来决定输出的值的类型==
- ==条件类型==（Conditional types）就是用来帮助我们描述输入类型和输出类型之间的关系: ==SomeType extends OtherType ? TrueType : FalseType==
- ==**条件类型中的 extends	T extends U	验证类型兼容性，判断 T 能否赋值给 U**==
  ```ts
    type IDType = number | string

    // 判断number是否继承(extends)自IDtype
    // 条件类型类似于js的三元运算符
    type ResType = number extends IDType? true : false // true, number可以赋值给IDType,它是联合类型,可以表示number类型
    type ResType2 = boolean extends IDType? true : false // false, 同理
  ```
- ==举例: 应用==
  ```ts
    // 应用: 函数的重载
    function sum(num1: number, num2: number):number
    function sum(num1: string, num2: string):string
    function sum(num1,num2){
      return num1 + num2
    }

    // 改进,用条件类型确定返回值的类型
    function sum2<T extends number | string>(num1:T,num2:T):T extends number ? number:string
    function sum2(num1,num2){
      return num1 + num2
    }
    // 可以确定返回值的类型
    const res = sum2(10,20)
    const res2 = sum2('hello',' world')
  ```
### ReturnType(*)
- ==在项目中会用到,理解一下, 内置工具 ReturnType: 根据函数类型自动获取函数的返回值类型 ==
  ```ts
    // 内置工具 ReturnType: 根据函数类型自动获取函数的返回值类型 
    type CalcFn = (num1: number,num2:number) => number

    function foo (){
      return '你好世界'
    }

    type CalcFnReturnType = ReturnType<CalcFn> // number
    // foo是实例,先转为类型再放入ReturnType
    type FooFnReturnType = ReturnType<typeof foo> // string
  ```
### 条件类型中的类型推断
- 类型体操的题目,业务中基本不用
- ==条件类型提供了infer 关键词，可以从正在比较的类型中推断类型，然后在true 分支里引用该推断结果==
```ts
  // 类型体操: 自己封装一个ReturnType方法 MyReturnType
  // 条件类型提供了infer 关键词，可以从正在比较的类型中推断类型，然后在true 分支里引用该推断结果

  // T限制传入的类型为函数
  // 推断函数返回值类型: 条件类型+infer(关键字)推断,infer可以推断出返回值类型,命名为R
  type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
  type CalcFnReturnType2 = MyReturnType<CalcFn> // number
  // 同理可以推断参数的类型(也有内置工具),命名为A
  type MyParameterType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never
  type CalcFnReturnType3 = MyParameterType<CalcFn> // [num1: number, num2: number]
```
### 分发条件类型
- 类型体操题目: ==当在泛型中使用条件类型的时候，如果传入一个联合类型，就会变成分发的（distributive）==
  ```ts
    type toArray<T> = T extends any ? T[] : never

    // 要string[] | number[] 而不是 (string | number)[] 
    // number[] | string[]	只能是 number 或者 string 单一类型
    // (number | string)[]	每个元素可以是 number 或者 string
    type newType = toArray<string | number> // string[] | number[]
  ```
- 如果我们在ToArray传入一个联合类型，这个条件类型会被应用到联合类型的每个成员：
  - 当传入string | number时，会遍历联合类型中的每一个成员；
  - 相当于ToArray<string> | ToArray<number>；
  - 所以最后的结果是：string[] | number[]
### Partial<Type>
- ==用于构造一个Type下面的所有属性都设置为可选的类型==
  ```ts
    interface IKun{
      name:string
      age: number
      slogan?:string
    }

    // 把IKun的所有类型都变为可选
    type IKunOptional = Partial<IKun>

    // 类型体操: 如何实现的 MyPartial
    type MyPartial<T> = {
      // 映射类型
      [P in keyof T] ?: T[P] 
    }
  ```
### Required<Type>
- ==用于构造一个Type下面的所有属性全都设置为必填的类型，这个工具类型跟Partial相反==
  ```ts
    interface IKun{
      name:string
      age: number
      slogan?:string
    }

    // 把IKun的所有类型都变为必选
    type IKunRequired = Required<IKun>

    // 类型体操: 如何实现的 MyRequired
    type MyRequired<T> = {
      // 映射类型 + 修饰符
      [P in keyof T] -?: T[P] 
    }
  ```
### Readonly<Type>
- ==用于构造一个Type下面的所有属性全都设置为只读的类型，意味着这个类型的所有的属性全都不可以重新赋值==
  ```ts
    interface IKun{
      name:string
      age: number
      slogan?:string
    }

    // 把IKun的所有类型都变为必选
    type IKunReadonly = Readonly<IKun>

    // 类型体操: 如何实现的 MyRequired
    type MyReadonly<T> = {
      // 映射类型 + 修饰符
      readonly [P in keyof T] : T[P] 
    }
  ```
### Record
- ==用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型==
  ```ts
    interface IKun{
      name:string
      age: number
      slogan?:string
    }

    type t1 = '上海' | '北京' | '洛杉矶'
    type IKuns = Record<t1,IKun>
    // IKuns的类型如下,给t1的每个值赋值Ikun类型
    // type IKuns = {
    //     上海: IKun;
    //     北京: IKun;
    //     洛杉矶: IKun;
    // }

    const ikuns: IKuns = {
      '上海':{
        name: 'xxx',
        age: 12
      },
      '北京':{
        name: 'yyy',
        age: 22
      },
      '洛杉矶':{
        name:'zzz',
        age:15
      }
    }

    // 类型体操: MyRecord
    // 确保Keys是一个联合类型
    type MyRecord<Keys extends keyof any,T> = {
      [P in Keys]: T
    }
  ```
### Pick
- ==用于构造一个类型，它是从Type类型里面挑了一些属性Keys==
  ```ts
    interface IKun{
      name:string
      age: number
      slogan?:string
    }

    type IKunPick = Pick<IKun,'slogan'|'name'>
    // 选中了一部分属性
    // type IKunPick = {
    //     slogan?: string | undefined;
    //     name: string;
    // }

    // 类型体操
    // K类型必须是T里面有的类型
    type MyPick<T,K extends keyof T> = {
      [P in K]: T[P]
    }
  ```
### Omit
- ==用于构造一个类型，它是从Type类型里面过滤了一些属性Keys==
  ```ts
    interface IKun{
      name:string
      age: number
      slogan?:string
    }

    type IKunOmit = Omit<IKun,'slogan'|'name'>
    // 过滤了一部分属性
    // type IKunOmit = {
    //     age: number;
    // }

    // 类型体操
    // K类型必须是T里面有的类型
    type MyOmit<T,K extends keyof T> = {
      // T断言类型后面的意思是P只有不在K里面的值才会返回,在K里面的值直接返回never,相当于过滤
      [P in keyof T as P extends K ? never: P]: T[P]
    }
  ```
### Exclude
- ==用于构造一个类型，它是从UnionType联合类型里面排除了所有可以赋给ExcludedMembers的类型==
  ```ts
    type IKun = "dance" | "sing" | "rap"

    // 把联合类型中的一些属性排除出去
    type IKuns = Exclude<IKun,"sing">  // type IKuns = "dance" | "rap"

    // 类型体操
    type MyExclude<T,E> = T extends E ? never : T
    type IKuns2 = MyExclude<IKun,"sing">
  ```
### Extract
- ==用于构造一个类型，它是从Type类型里面提取了所有可以赋给Union的类型==
  ```ts
    type IKun = "dance" | "sing" | "rap"

    // 把联合类型中的一些属性选择出来
    type IKuns = Extract<IKun,"sing">  // type IKuns = "sing"

    // 类型体操
    type MyExtract<T,E> = T extends E ? T : never
    type IKuns2 = MyExtract<IKun,"sing">
  ```
### NonNullable<Type>
- ==用于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型==
  ```ts
    type IKun = "sing" | "dance" | undefined | null;

    type Ikuns = NonNullable<IKun>
    // 当T是null或undefined时候,返回never
    type MyNonNullable<T> = T extends null|undefined ? never : T
  ```
### InstanceType
- ==用于构造一个由所有Type的构造函数的实例类型组成的类型==
  ```ts
    class Person{}
    const p1:Person = new Person()

    // typeof Person: 构造函数的类型
    // InstanceType: 构造函数构造出的实例对象的类型
    type HYPerson = InstanceType<typeof Person>
    const p2:HYPerson = new Person()
  ```
