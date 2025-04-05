# css笔记
## css基础部分
### 样式

1. **css的外部样式**

    - 代码：`<link rel="stylesheet" href="添CSS地址">`
    - 作用，引入外部的CSS文件，防止HTML文件过于臃肿 
2. **css内部样式**

    - 写在head内的style内，其余不变

3. **css的行内样式**

    - 直接写在具体的html代码的某个标签内
    - 例如： `<h1 style="color:rgb(0, 255, 179) ;">123</h1>` 
4. **css样式的权重**
    > 行内>内部>外部
    > 面对相同的标签，在这三种地方写的CSS的权重是不同的

### 选择器
#### 选择器与类选择器
    
 - 选择器的作用是在CSS中选定特定的html标签进行CSS属性的添加
 - 直接写标签的，是开地图炮，针对所有此类标签的html
   > 例如：`div{....} p{.....}` 
 - 类选择器：是先在html里给标签class命名（不能只有数字）
   然后在CSS中使用<span class="bolder"> .+名字{} </span>的方式进行css属性添加。
   > 例如：`.box1{....} .func{.....}`
#### id选择器与通配符选择器
    
  - id选择器：在html里使用id来对标签进行命名，然后在CSS中用#进行CSS的属性添加。
  - 通配符选择器：针对的是所有标签，但是一般用于清除一些标签的默认内外边距，例如div，一般写法如下，在CSS首部先写上:
    ```
    * {
        /* 清理边框的 */
        margin: 0; /* 外边距 */
        padding: 0; /* 内边距 */
        }
    ```
#### 群组选择器\后代选择器\子代选择器

  - 群组选择器：多个标签有同一种属性时，我们可以把它们写到一块，用逗号隔开，然后一起定义CSS属性。
    ```
    div,p,.box1,h2,#box2
        {
            color: rgb(255, 0, 174);
        }
    ```
    > 同样逆向思维：我们可以先定义好一些CSS样式，然后随用随取，只需要给特定的html标签进行class或id的定义即可，又因为一个标签的class或id是可以多个的，所以我们可以搭配更多的预制CSS来进行修饰，但是要注意，使用多个class或id时，注意不要让CSS之间因为对相同的属性定义不同属性值而发生冲突。

  - 后代选择选择器：也叫包含选择器，寻找符合包含条件的标签。具体是父+空格+子（+空格+孙+。。。）
    ```
        CSS:
       
        /* 计算机寻找符合条件的标签是从右往左找的，比骄傲怪，即先找到所有p，看看这些p有没有div包着。 */
        /* 只有div内部的p标签生效 */
        div p{
            background-color: yellow;
        }
         /* 同理，只有p内部的b标签生效 */
        p b{
            color: red;
        }

        HTML:

        <!-- 1 -->
        <div>
            <p>1111111</p> // 符合包含条件
        </div>
        <p>22222222</p> //没有div包裹，不符合条件

        <!-- 2 -->
        <p>
            <b>bbbbbbbbb</b>
        </p>
        <b>cccccccc</b>

    ```
    > 1.后代选择器可以写多个，例如 div p h1{...}，类似这种，针对的更加具体，以防有这种情况,html有div h1{}和div p h1{}两种嵌套，而css中直接设置div h1{}会把两者都设置上，如果单独设置后者的css样式，那么必须写全了div p h1{...}，从而规避对div h1{}的css设置。
    > ==2.后代选择器无视嵌套多少层（后代，儿子孙子重孙子等全都算），例如 div p{...} ， 就是对div标签内部的所有p标签都进行设置。==
  - **子代选择器(109层级选择器)**：用大于号表示> ，代表当前标签后面的亲儿子们（不一定只有一个）的css生效，而孙子及重孙子等不生效，==后代选择器是后面全部的，不管你嵌套多少层。而子代选择器是往里面一层。==
    > 设置过，除了color属性设置不符合，例如border等样式它都遵循子代选择器的规则，==就找亲儿子(们)==
#### 伪类选择器
  - 主要是对html的超链接进行修饰
  - 有四个，link，visited，hover，active，分别代表了链接未打开，打开后，鼠标放置在链接上以及点击时瞬间，主要常用的是前三个 link，visited，hover ， 最常用的是hover，这个最直观，一般是对颜色进行更改。
  - 对于link与visited，只要是点击过这个网址了，就永远显示visited的内容了
  - 代码格式为： `a:hover{.......}`
  - ==这里的标签可以是多种多样的，不只是a标签（链接标签），可以是class或者id定义的标签。==
    > 格式： 类名:hover (作用对象){...} ，注意有时候作用对象是类的孩子.
    > 例如 .box1:hover .box2{....} 代表鼠标放在box1盒子上时，其后代.box2发生变化。
  - 对于已经定义了class或id的超链接标签，格式为
    > ./#名字:hover{.....}

#### 选择器的权重
    
  - 纯标签 < class < id < 行内 < !import
  !important在CSS中 `background-color: aqua!important;`
  - 嵌套下，嵌套的越多权值越大
  CSS记得加空格，标表示子代
  - 当遇到相同权值时，就近原则
  - 对同一标签的同一属性，注意，如果低权值对其定义，而高权值没有定义，那么标签的此属性给随低权值。
  - 附加 ： [![pkpXC0f.jpg](https://s21.ax1x.com/2024/04/22/pkpXC0f.jpg)](https://imgse.com/i/pkpXC0f)
#### 层级选择器
    
  
  - 代码：
   
    ```
    <ul class="box">
        <li>111
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </li>
        <li class="child">222</li>
        <li>333</li>
        <li>444</li>
        <li>555
            <ul>
                <li>i</li>
                <li>ii</li>
                <li>iii</li>
            </ul>
        </li>
    </ul>
    ``` 
  - ==子代选择器 **>**==
  - 这个前面讲过了，这里详细一点。
    > css: .box>li则是亲儿子，也就是111，后面的222，333，444不是
  - ==往后查找一个兄弟节点 **+**==
    > css: .child+li就是333，child后一个兄弟 
  - ==往后所有的亲兄弟 **~**== 
    > css: .child~li就是后面所有的兄弟，333，444，555 , 不过i ii iii并不是，虽然它们在child后，但不是兄弟关系，比其兄弟小一级。

#### 属性选择器

 - ==依据属性选择标签，属性是任意学过的css或html标签的属性==，常见的比如id，class，input的type，name等，各种各样，只要有意义width、height、font-size甚至border都行，**另外光属性不一定够，只有属性代表只要有这个属性的都选，但是给属性附上具体值，就按照有此属性且与属性值相统一的才可以被选中。**
 - 格式: ==(标签)[属性=(属性值)] 属性值不加双引号== 
 - 一些代码：(css)
    ```
        [class]{  // 1.对有class属性的元素进行设置 
            background:yellow;
        }

        [id]{  // 2.对有id属性的元素进行设置 
            background-color: blueviolet;
        }

        div[class]{  //3.对所有带有class属性的div标签设置
            color: red;
        }

        div[class=box]{  //4.对所有class="box"的div标签设置（带属性值）
            color: red;
        }  

        input[name=password]{ //4.2 对所有name="password"的input标签设置
            background: yellow;
        }

        input[type=email]{ //4.3 对所有type="email"的input标签设置
            background: green;
        }

        p[class],span[class]{ //5.换了个标签,属性选择器也适合群组选择器，多个写一块。
            color: blue;
        } 
    ``` 
    > ==/* 1.包含匹配 ~= */==
    >    // html 标签中class有时不只有一个(多个不同名字用空格隔开)，这个包含匹配代表只要class含有box1就可以被选择。
    >   div[class~=box1]{
    >      border: 5px solid green;
    > }

    > ==/* 2.完全匹配 = */==
    > // 显而易见，这代表class属性只有box这一个才可以被选中。
    >div[class=box]{  // 4.对所有class="box"的div标签设置
    >    color: red;
    > } 

    > 模糊匹配，不常用,以class为例
    > class^=b 开头为b
    > class$=b 结尾为b
    > class*=b 包含b

#### 结构伪类选择器
- **目的是快速选择一大组标签中的某些特定的项，例如第一个，最后一个，偶数奇数个等**，之前做过的案例有这个场景，在大盒子box宽940px里有3个小盒子300px并排，然后给小盒子加右外边距20px，此时第三个小盒子会溢出，因为三个盒子宽960px，所以最后一个盒子没有右边距，需要单独设置class清除CSS样式，这很麻烦。
- 代码：
    ```
    CSS:
    /* 1.直接选择.box内最后一个div */
    .box div:last-child{
        margin-right: 0px;
    }

    /* 2.第一个 */
    li:first-child{
        background: red;
    }
    /* 3.第几个 */
    li:nth-child(2),li:nth-child(5){
        background: blue;
    }
    /* 4.第偶数个(even) */
    li:nth-child(2n){
        color: green;
    }
    /* 5.奇数个 2n+1或者2n-1 (odd) */
    li:nth-child(odd){
        color: pink;
    }

    /* 6.div孩子里，有且只有一个p标签，给这个p标签赋值，即html里的p-333 */
    div p:only-child{
        background-color: yellow;
    }
    
    /* 7.没有任何内容，空格换行都不行 */
    div:empty{
        background-color: yellow;
    }

    HTML:
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
    </div>

    <ul>
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>
        <li>666</li>
    </ul>

    <div>
        <p>111</p> // 2个p标签
        <p>222</p>
    </div>
    <div>
        <p>333</p> // 1个p标签 only-child
    </div>

    <!-- 7.空的，换行与空格也不行 -->
    <div></div>
    ```
#### 目标伪类选择器

- 代码： XXX:target{CSS}
- 结合锚点使用，点击锚点后，跳转到对应标签，如果此标签上有target，则执行里面的CSS代码。（一种不用js的方法,被点击就会执行target）
- 代码：
    ```
    css：
        div{
            height: 600px;
            border: 1px solid black;
        }
        /* 当点到div上，就会执行 */
        div:target{
            background: yellow;
        }

    html；

        <!-- 锚点 -->
        <ul>
            <li><a href="#a">1</a></li>
            <li><a href="#b">2</a></li>
            <li><a href="#c">3</a></li>
            <li><a href="#d">4</a></li>
        </ul>

        <!-- 跳转地 -->
        <div id="a">1</div>
        <div id="b">2</div>
        <div id="c">3</div>
        <div id="d">4</div>

    ``` 
- 把锚点换成a-href链接也可以触发，点击链接，跳转到对应标签，然后执行target,下面的效果是点击链接才会显示文字。
- 代码：
    ```
    css:
        .content{
            display: none; //先隐藏文字
        }
        div.content:target{
            display: block; //点击链接后，显示（块元素）
        }

    html:

        <div>
            <a href="#aaa">aaa</a>
            <div id="aaa" class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum nulla neque cum omnis! Fugit, molestias earum dolorem explicabo odio fugiat velit, labore ipsum soluta, cumque possimus voluptas. Nobis, nemo?</div>
        </div>

        <div>
            <a href="#bbb">bbb</a>
            <div id="bbb"class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum nulla neque cum omnis! Fugit, molestias earum dolorem explicabo odio fugiat velit, labore ipsum soluta, cumque possimus voluptas. Nobis, nemo?</div>
        </div>
    ```
    
#### UI元素状态伪类选择器

- 对form表单和文字进行选择并加上CSS样式
- 代码：
    ```
    css:
     /* 1.enabled 应用状态下,只要input没有disabled属性，都执行此CSS代码 */
    input:enabled{
        background: red;
    } 
    /* 2.对非可用状态下的input添加CSS样式（不用class） */
    input:disabled{
        background: rgb(118, 214, 220);
    }
    /* 3.鼠标点击即为焦点，，执行CSS */
    input:focus{
        background: green;
    }
    // 4. 复选框样式更改
    input[type=checkbox]{ // 复习一下属性选择器
        /* 首先删除默认样式，每个浏览器都有默认样式，很特殊的属性，不删除默认样式，你自己设置的CSS无效 */
        appearance: none;
        /* 自己设置新的复选框样式 ，包括宽高与边框*/
        width: 20px;
        height: 20px;
        border: 3px solid black ;
    }
    /* 4.2 更加丰富复选框的样式，效果为点到复选框就变红 */
    input:checked{
        background: red;
    }

    // 5.对文字的选择，选择一段文字就会执行。
    /* 代码是双冒号::  选中时运行CSS */
    div::selection{
        background: yellow;
        color:red;
    }


    html:
    <form action="">
        user: <input type="text"> <br>
        password: <input type="password"> <br>

        remember me: <input type="checkbox"> <br>

        <input type="submit" disabled>
    </form>

    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae possimus excepturi molestias praesentium exercitationem incidunt libero deleniti magnam veritatis voluptatibus dolorum a, ex, facere, maxime eum eos eligendi facilis.
    </div>
    ```

#### 否定和动态伪类选择器

- 否定伪类选择器：就是not+伪类选择器，意为除了这个伪类选择器，剩下的都。
    > 格式 :not(伪类选择器标签)，看看前面的伪类选择器。
- 代码：
    ```
    li:first-child{ //给第一个孩子加
        background: yellow;
    }

    li:not(:first-child){ //除了第一个孩子加
        background: yellow;
    }

    ``` 
   
    > ==动态伪类选择器就是链接的那些个选择器==，学过了，a:link(初始状态未打开) a:visited(访问后) a:active(点击时) a:hover(鼠标放上后).

## CSS的属性及其属性值
### 文本属性
#### 基础文本属性
   - 文本属性1 : [![pkpX9nP.jpg](https://s21.ax1x.com/2024/04/22/pkpX9nP.jpg)](https://imgse.com/i/pkpX9nP)

   - 文本属性2 ： [![pkpXSXt.jpg](https://s21.ax1x.com/2024/04/22/pkpXSXt.jpg)](https://imgse.com/i/pkpXSXt)
    
> 补充说明 ： 1.首行缩进2em正好是2个中文宽度或2个英文字母
> 2.字间距： letter-spacing  + 词间距 : word-spacing
> 3.行高等于height数据，垂直居中是只有一行字，两行字行高就要除2
> 要理解行高line-height与height
> ==4.text-align 对img有效==
   - font-family的汉英互译，写汉语也行 : [![pkpOx1A.jpg](https://s21.ax1x.com/2024/04/22/pkpOx1A.jpg)](https://imgse.com/i/pkpOx1A)
    
   - 额外的文本属性text-transform : 
   ```
    所以单词首字母大写
    text-transform: capitalize; 
    每个字母都小写
    text-transform: lowercase;
    每个字母都大写
    text-transform: uppercase;
   ``` 
#### 文本阴影
- 效果图：
  [![pkEvt10.png](https://s21.ax1x.com/2024/05/07/pkEvt10.png)](https://imgse.com/i/pkEvt10)
- 代码： text-shadow: 10px 10px 1px solid red
> 水平位移，垂直位移，模糊程度，颜色（可以写多个，用逗号隔开）

#### 字体引入
- 在默认字体体系外的字体，字体文件在网站上找，后缀为.ttf
- 代码： 
  ```
  @font-face{
        font-family: kerwin;  /* 字体名字 随便取 */
        src: url(120字体.ttf);   /* 字体位置 */
    }

    div{
        font-family: kerwin; /* 使用的字体的名字，对应自己起的名字 */
        font-size: 50px;
        text-shadow: 5px 0px 5px green; /* 字体阴影向右5px 向下0px 模糊程度5px */ 
    }
    ```

### 列表属性

   - 列表属性：[![pk9h6MD.jpg](https://s21.ax1x.com/2024/04/23/pk9h6MD.jpg)](https://imgse.com/i/pk9h6MD)
   > 要使用list-style-image属性,需要先把list-style-type设置为none，去除系统默认格式，在添加自定义的图片
   - 有简写
   顺序无所谓，有的属性也可以不写，记得加空格，就是把上面的三个属性写一个style里。

### 背景属性

  - 背景属性: [![pk9hcse.jpg](https://s21.ax1x.com/2024/04/23/pk9hcse.jpg)](https://imgse.com/i/pk9hcse)
  > 1.repeat : 平铺，如果照片填不满，就在铺一张，但是超出部分会直接切掉，有单独x轴y轴方向平铺，默认全铺
  > 2.position : px % 英文 (可以是负数，反向移动，以盒子左上角为参照) 用英文,顺序无所谓,只写center就是在中心,属性值有center/left/right/top/bottom
  >  3.attechment 默认时滚动sccroll，一旦给背景图片设置了fixed固定的属性,那么图片只会相对于==可视窗口==而进行位置变化，并且，一旦背景图片脱离了他的父标签（承载体）就不显示了，可以利用这个特性来轮播图效果，51-52案例。 
  > ==4.补充的background-size==:图的大小，可以 px / %, 先X轴后Y轴，还有两个属性，区别于平铺，cover和contain，前者强行把背景填满，可能图片比例会变形，然后不美观，后者是尽可能不改变比例去填满背景，但是可能会有空隙，是比较好的。
  > 5.可以简写成集合属性 : background :除了size属性，其余的大杂烩放里面，顺序无所谓。

### 浮动属性


   - 浮动的属性:[![pkCHkVS.jpg](https://s21.ax1x.com/2024/04/25/pkCHkVS.jpg)](https://imgse.com/i/pkCHkVS)


   - 浮动的特性
    1. 浮动的元素会挡住不浮动的元素
    2. 全浮动后，排满一行就另起一行继续
    3. 见缝插针属性，对空间很节约，能塞进本行绝不换行(下图6)
    4. 文字不会被浮动元素所掩盖
    5. 浮动可以让排版更好看，可以让霸道的div不在一人一行
   - 图片演示： [![pkCHPDf.jpg](https://s21.ax1x.com/2024/04/25/pkCHPDf.jpg)](https://imgse.com/i/pkCHPDf)

   - ==清浮动（很重要）==
   - 我们要实现下列效果图:[![pkCHpvt.png](https://s21.ax1x.com/2024/04/25/pkCHpvt.png)](https://imgse.com/i/pkCHpvt) 
   - 再把上面2个div进行浮动后会这样，上方出现高度塌陷，具体就是，上方2个div父盒子container的高度为0：[![pkCHCKP.png](https://s21.ax1x.com/2024/04/25/pkCHCKP.png)](https://imgse.com/i/pkCHCKP)
   ```
    <div class="container">
        <div class="box1"></div> 黄
        <div class="box2"></div> 蓝
        <!-- <div class="box"></div> -->
    </div>
    <div class="box3"></div> 红
   ``` 
   > 这时我们就要清除浮动，来实现下面的红div不会被上面挡住
   > 我们有4个方法解决高度塌陷问题
   > 1.直接给父盒子container设置一个高度
   > 2.清浮动，clear + left/right/both，加在box3（红）上，清除其左浮动，清除box1和2的浮动造成的高度塌陷
   >3.加一个div，专门用来清浮动，没别的属性，就是box，加一个clear + left即可，不在对box3进行操作了
   >4.给父盒子container加上一个属性 overflow:hidden;（后期会讲，bfc，让浮动盒子自己计算元素）
   
   - 清除浮动的知识点图：[![pkCHib8.jpg](https://s21.ax1x.com/2024/04/25/pkCHib8.jpg)](https://imgse.com/i/pkCHib8)
    
### 盒子模型

  -  盒子模型分为内容、内边距、边框、外边距
  -  我们给div设置的长宽高都是给内容的，内外边距和边框会额外扩大盒子大小
  -  背景色除了外边距无法染指，其余的都会被蔓延
  -  盒子在检查中如下 ：[![pkPAzTg.png](https://s21.ax1x.com/2024/04/25/pkPAzTg.png)](https://imgse.com/i/pkPAzTg)

#### 内边距

- padding 输入值的个数有不同的表达方式
- 一个值 ： 四个方向
- 两个值 ： 上下 左右
- 三个值 ： 上 左右 下
- 四个值 ： 上 右 下 左 （顺时针）
- 另外还可以单独设置 ： padding-top/right/bottom/left
- 不支持负数！！！！
- 手绘图：[![pkPE2NQ.jpg](https://s21.ax1x.com/2024/04/25/pkPE2NQ.jpg)](https://imgse.com/i/pkPE2NQ)
 

#### 边框
- border : 粗细 样式 颜色 （复合属性）
- 其中样式有 ： solid实线 double双实线 dashed虚线 dotted点状线
- 颜色有个特殊的 ： transparent 透明
- border支持四个方向 ：border-top/right/bottom/left
- border的属性分开为 ：border-width/style/color || 并且支持四个方向的不同设置
  > 对于有些有默认边框的，可以先删除再设置边框，border:none; 比如表单元素input 和 button 就有自己的默认边框。

#### 外边距
- margin : 可以给页面更好的布局，无论是内容还是背景色都无法染指外边距，进而外边距如同空气墙一样，可以于其他盒子有所间距。
- 支持内边距的一切设定，包括1~4个值的设置、单个方向的设置
- ==不同的是，支持负值，反向移动==
- ==额外==： margin : 0（上下） auto（左右） = 水平方向居中，且跟随网页动态变化，但是不支持竖直方向的居中!

#### 外边距的特性

- 兄弟关系(同级关系) ： 上下两个盒子是兄弟关系，在设置外边距时，给上面的盒子设置margin-bottom : 100px; 给下面的盒子设置margin-top : 50px; 那么两个盒子在垂直方向上间距为**100px**,==特性为在垂直方向上，兄弟关系的盒子外边距服从最大值原则，而非叠加原则，然而在水平方向上服从的是叠加原则。不懂就去061看代码==
- 父子关系(嵌套关系) ： 我们如果给子加 margin-top：10px; ，我们希望的是子相对于父有一个向上的外边距，如下 ： [![pkPVNrV.png](https://s21.ax1x.com/2024/04/25/pkPVNrV.png)](https://imgse.com/i/pkPVNrV)
- 实际上如下(不是相对于父，而是父子绑一起了)：[![pkPVtK0.png](https://s21.ax1x.com/2024/04/25/pkPVtK0.png)](https://imgse.com/i/pkPVtK0)
- 解决方法有4个
  >1.曲线解决，给父设置padding-top 10px 
  >2.给父设置个边框，子再设置上边距 10px
  >3.让父或子的一个浮动，使其不在一个平面，然后子设置边距
  >4.给父设置overflow: hidden （后期讲）
  >**注意1和2需要把高度调整一下，因为内边距和边框都会加大盒子大小**

#### 盒子阴影
- 知识点：
  [![pkEv074.md.jpg](https://s21.ax1x.com/2024/05/07/pkEv074.md.jpg)](https://imgse.com/i/pkEv074)
- 效果图：
  [![pkEvc1x.png](https://s21.ax1x.com/2024/05/07/pkEvc1x.png)](https://imgse.com/i/pkEvc1x)
- 代码：box-shadow: 10px 10px 10px 10px blue inset;
  > 解释：==向右 ，向下==(可为负值) ， ==模糊距离==（就是阴影里有多少是模糊的，这里模糊距离10px与阴影长宽一致，全模糊），==阴影大小，颜色==， ==inset==是阴影在盒子内，不写就在盒子外 。 ==可以写多个，加逗号隔开==。

#### 圆角边框
- **1.让盒子角变得圆润，属性是border-radius: px/% 代表圆润程度。**
- 效果图：
  [![pkExS4s.png](https://s21.ax1x.com/2024/05/07/pkExS4s.png)](https://imgse.com/i/pkExS4s)
- 参数和之前学的一样支持1-4个参数
    放一个值 四个角都一样
    2个 左上右下 左下右上
    3个 左上 左下右上 右下
    4个 从左上角顺时针
- 支持单边写，先写垂直后写水平，如下
  border-top-left-radius 左上    
  border-top-right-radius 右上    
  border-bottom-right-radius 右下    
  border-bottom-left-radius 左下   

- **2.圆角边框之圆**
- 效果图：
  [![pkExivV.png](https://s21.ax1x.com/2024/05/07/pkExivV.png)](https://imgse.com/i/pkExivV)
- **先看一段代码：border-radius: 30px/60px;
  它的意思是在边框角先水平走30px，再垂直60px，之后裁掉**
  如下：[![pkExuCR.jpg](https://s21.ax1x.com/2024/05/07/pkExuCR.jpg)](https://imgse.com/i/pkExuCR)

  ==只支持border-radius属性，当然可以多个参数一起，但是要一一对应，例：border-radius: 10px 20px 30px 40px / 50px 60px 70px 80px==;  
- ==如何变成圆形?== 裁切长宽的一半，对于正方形的盒子，直接用50%即可，对于矩形要算出px，裁切包括内边距和边框，裁出上面的圆环效果是把边框变粗加上颜色的效果。
#### 怪异盒
- ==怪异盒与正常和模型的区别==：正常盒模型设置宽高是给内容的，而内外边距和边框再设置是往外扩展的，但是怪异盒的内边距padding和边框border会压缩内容，只有外边距和正常盒一样往外拓展。
- ==如何使用怪异盒？== CSS属性box-sizing : content-box(正常盒)、border-box(怪异盒)
#### 弹性盒（移动端布局的基础）
- **1.弹性盒基础**
- 新的布局方式，适合移动端（手机）。
- ==弹性盒方式：display:flex==（display是元素显示类型里学的属性）  
- 弹性盒的特性：
   1.让盒子内子元素默认横向排列（==特别指div这种块级元素不再独占一行，记住它仍是块级元素，可以设置宽高等，只是排列方式变了，可以同行排列了，但块级元素的其他特性没有变==。）
   2.弹性盒子元素是行内元素可以设置宽高了（变成块级元素），不再由内容撑开。
   3.只有一个孩子的父盒子，子盒子居中直接margin: auto;
- **2.弹性盒修改主轴方向：**   
- ==属性flex-direction:== 分四种，水平(默认)row、水平反向 row-reverse、竖直column、竖直反向column-reverse
- **3.主轴侧轴对齐方向**
- 上面使用flex-direction设置了主轴（row/column），那么另一个就是侧轴。
- ==主轴属性5个 (justify-content)：== flex-start center flex-end (常规布局)
  space-between 两端对齐 space-around 均衡占满，且盒子之间的间距都相等
- ==侧轴属性3个(align-items):== flex-start center flex-end (常规布局)  
- **4.拆行与行间距**
- ==折行属性==(一行显示不开换行) flex-wrap: wrap (另外默认不换行nowrap 还有反向换行 wrap-reverse)默认折行后等间距
- ==折行后改变行间距，属性是align-content(**区分与侧轴对齐方式属性align-items**)==
- 控制折行后的行间距align-content:
    flex-start
    center
    flex-end
    space-around
    space-between 
- **在换行后，侧轴对齐方式属性align-items是以每行为一个单位对侧轴进行空间安排， 控制折行后的行间距属性align-content是以整个父盒子为单位进行间距的安排.**
- 下面是在大盒子里设置换行，align-items: flex-end与align-content: flex-end 的效果图:
[![pkV0QAI.png](https://s21.ax1x.com/2024/05/08/pkV0QAI.png)](https://imgse.com/i/pkV0QAI)
[![pkV0KHA.png](https://s21.ax1x.com/2024/05/08/pkV0KHA.png)](https://imgse.com/i/pkV0KHA)   
- **5.项目对齐方式**
- ==对单独一个元素标签进行对齐方式的更改。==
- ==属性为 align-self==: flex-start = baseline(效果相同) / flex-end  / center / **stretch** (拉伸效果，横向排列下，只要不设置高度，就占满整个高度，同理纵向排列下，不设置宽度，占满整个宽度)
- **6.项目调整顺序**
- ==属性order==：默认为0，数字大靠后，小的靠前，可以负数，row/column都能用。
- **7.剩余宽高**
- 更好的分配空间，比起自适应宽高更加灵活。
- 属性是flex，写在单个项目里（标签上），默认都是1，可以起到分配空间作用，首先大盒子box设置为弹性盒，然后在里面设置三个子盒子（默认横向排列），统一设置高度，进下来如何分配宽度空间。
    > ==一种是全部flex，给三个盒子都设置flex值，按比例分配，这个比起宽高自适应来说，非常好用==,例如三个盒子flex分别为1 2 3 ，那么他们的宽度比例分别是 1/6 2/6 3/6.
    > ==第二种是 px + flex==，例如我们要设置三栏布局，以前是让宽度自适应，并且加浮动，如今在弹性盒内，元素默认横向排列，省去了浮动，并且在把左右的盒子宽度设置好后，把中间的盒子flex值设置为1，它就会占满宽度，因为它的flex高于左右盒子（默认flex = 0）。**下面就是以body标签为父盒子设置的三栏布局。**
- 代码： 
    ```
    css:
    html,body{
            height: 100%; //css设置好高度，高度不在由内容撑起
        }
    body{
            /* 默认横轴为主轴,不用设置浮动，div自动横向排列*/
            display: flex;
    }
    .div1,.div3{
            width: 100px;
            /* 不设置高度，子盒子高度默认成父盒子的高度，高度自适应 */
            background: gray;
    }
    .div2{
            /* 占满div1 div2剩下的空间 */
            flex: 1; // 横向占满，不在是宽度自适应
            background: yellow;
    }

    html:
    <body>
        <!-- 主轴设置成竖直同理，做div三栏很方便的 -->
        <div class="div1">111</div>
        <div class="div2">222</div>
        <div class="div3">333</div>
    </body>
    ```

### 溢出属性
> overflow : visible(默认)、hidden、scroll、auto、inherit
> visible: 溢出就溢出了
> hidden：隐藏溢出的部分,即使定位脱离文档流也受其影响
> scroll：加滚动条，不过无论溢出与否，都有滚动条
> ==auto：溢出才会有滚动条，否则没有，更好==
> ==在138_2京东案例里，滚动两个作用，一个是防止在移动端布局形成盒子挤压 ，2是内容溢出的滚动，第一个尤为重要。==
> 滚动条可以单独设置X或Y轴方向
> X轴 ： overflow-x: auto;  overflow-y:hidden;
> Y轴 ： overflow-y: auto;  overflow-x:hidden;
> inherit：继承父的溢出属性
> 溢出的可以是文字或图片

- **溢出与换行**（非重点）
- white-space : nowarp/pre/pre-warp/pre-line ==唯一重要的==
- nowarp：遇到盒子边界不换行，文本直接一行，突破盒子也无所谓。
- pre：在代码区打的空格和换行会在页面中显示，不用br nbsp emsp等标签，但遇到盒子边界仍不换行。
- pre-warp：集合上面2家优点
- pre-line：只显示回车，遇到盒子边界换行
> 另外还有pre的标签，专门用于特殊文本，比如你要在页面显示一段代码，用pre标签包裹直接复制内容即可，省去了繁琐的格式问题，它会保留文本的所有空格和换行。 


- **溢出的省略号**（非重点）
- 代码如下： 

```
white-space: nowrap; //不换行
overflow: hidden; //溢出裁切隐藏
text-overflow: ellipsis; //溢出部分加三个点，意为省略号
// 另外cilp就是默认属性，无省略号
```

- ==补充：滚动条隐藏，代码：==
    
    ```
    ::-webkit-scrollbar{
        display: none;
        }
    ```

### 元素显示类型

- 元素显示类型(display)有三种：块级元素(block)、行内元素(inline)、块级行内元素(inline-block)，如下：
[![pkP2OgO.jpg](https://s21.ax1x.com/2024/04/26/pkP2OgO.jpg)](https://imgse.com/i/pkP2OgO)
> 注意：1.块级行内元素既可以设置宽高，又不独霸一行
> 2.display:list-item(li标签)同等与块级元素
> ==3.特殊的，p标签内只能放文本，不能放块级元素等。==

- **元素显示类型与盒子模型**
- 块级元素，就例如div，margin padding 样样精通
- 行内元素：只能设置左右的边距，上下的边距不支持，能设置但是没用。

- **元素显示类型之间可以互换**
- 不同元素类型之间会有3px的间距，设置成相同类型的就可以消除
- 应用点，比如在做导航栏，使用a标签做，然后把它的元素显示类型设置为line-block，这样既能同行、设置链接，又能设置宽高与边距，更美观
- **新属性none，就是隐藏你写的东西,**这个与列表和hover结合时，会有二级菜单的功效，70与71有练习。==   

### 定位
#### 定位基础知识点
  - 定位知识点[![pki6Fqs.jpg](https://s21.ax1x.com/2024/04/28/pki6Fqs.jpg)](https://imgse.com/i/pki6Fqs)
  > 写好定位类型和各个方向偏移量（可以写负数）
  > position : XXXX;
  > top/right/left/bottom: XXXpx; 

  - 默认定位，static,啥也不写
  - 相对定位：relative，相对于自己的原来位置的定位，==不脱离文档流，也就是说，偏离原来位置，但是原位置还占着==。
  - 绝对定位：当无父元素或==父元素无定位时==，则定位只参考当前==窗口的第一屏==,==**注意第一屏就是当前窗口，如果划滚动条就会移走**==，如果有父元素且父元素有定位，那么参考的就是父元素，**且会脱离文档流，原来的位置会被别的元素占领，脱离文档流的元素需要重新设置宽高**。
  > 那么一般我们处理绝对定位时，都会在其父元素上加上相对定位，但是不写偏移量，这样父元素即有定位，也不会偏移位置。
  
  - 固定定位：fixed，脱离文档流，**一直固定在当前窗口页面的那个位置，区分它与固定在第一屏的区别。**
  - 粘性定位(高版本浏览器)：sticky,设置top值（left right bottom都可以），用溢出属性设置出滚动条后，我们希望有些标签能够不受滚动条影响被划上去，那么设置给这个标签粘性定位，比如top 10px，即此标签距离滚动条标签顶部10px定位固定，==可以负值，但没意义。==
  - 层级z-index：谁index大，谁在图层的上面。
  > 拓展：在父子关系，父为相对定位，子为绝对定位情况下，想让父在子上面，只能给子赋z-index = 负数。
  > 兄弟关系且都绝对定位，index正常，谁的大谁在上面。
  > ==如何让一个行内元素变成块级元素==
  > 1.display:block;
  > 2.float:left...;
  > 3.**position: absolute;**

#### 水平垂直居中

 - 盒子在屏幕中心居中，盒子设置绝对定位，用百分比 top50% left50%先移至右下，然后再反向==负数==盒子的半宽半高，使其水平垂直居中
 - 具体代码：`position:absolute + top50% left50% + margin-left: -盒子半宽px margin-top: -盒子半高px` 
 - 父子关系盒子中心居中，==父一定要设置上相对定位，子设置绝对定位==，**只有父盒子有定位，子盒子的绝对定位偏移参考的才是父盒子，否则参考第一屏**，之后其余一样。
 - ==这是写死的方法==，也就是归位步骤的margin-left: -盒子半宽px margin-top: -盒子半高px。

#### 绝对定位与浮动的区别
> 都会脱离文档流，但是浮动不会挡住文字，绝对定位会遮挡文字。

#### 锚点

 - 使用a链接和id选择器实现一个页面内的跳转
 - 可以使用ul-li列表去设置锚点菜单栏，然后固定定位在屏幕某处
 - 伪代码：`<li><a href="#锚点名字（id）">1</a></li> + <div id="锚点名字">1</div>`

#### 精灵图
 - 精灵图如下：
  [![pkFEeAS.png](https://s21.ax1x.com/2024/04/29/pkFEeAS.png)](https://imgse.com/i/pkFEeAS) 
  
 - 好处 ： 减少了服务器存储图片的内存占用，减少了向服务器请求图片数据的次数
 - 使用div + background : url() 先把想要显示的图片大小用div框好舞台，然后把精灵图设置为此div的背景，之后再利用background-position来对背景图进行移动，先left后top，负数反向，初始显示默认为精灵图的左上角。

### 宽高的自适应

- 自适应：根据内容或窗口的变化而进行大小的变化。
- 代码：`wight:auto; height:auto;` 或者不写默认就是自适应
- ==区分自适应与百分比==: width:100%; 代表宽度当前窗口宽度，他是固定的数值，根据不同电脑的分辨率，宽度数值不同；但是width:auto，是自适应宽度，如果有别的盒子占了宽度，它就会适当缩小，而%的那个撑出滚动条。
- 经常用于导航栏和购物界面，特别是个性推荐栏目，太多太少都不好看，==例如高度自适应，你写死了高度，可能会造成内容溢出，但是自适应会相应的扩大高度使盒子能够框住内容使之不溢出。==
- max-width min-width / max-height min-height :可以限制最大最小宽高。


### 浮动元素父元素的自适应

> 高度塌陷的问题：给子浮动后，什么都不做，由于子脱离文档流，其父高度会变成0，造成高度塌陷，**在浮动属性-清浮动第一次系统记录此问题**。
> 当时解决方法有4个，各有缺点
> 1.写死父的高度，使其高度不为0。缺点：会溢出内容，不灵活
> 2.写一个空div，清浮动。缺点：代码冗余
> 3.给要顶上去的div清浮动。缺点：代码冗余，查找费劲
> 4.overflow:hidden 缺点：计算了子元素高度，但是在下拉菜单中，一旦二级菜单显示，相应的子元素高度会变化，然后会顶飞二级菜单那下面的div盒子；若用position定位后，显示溢出了div又会被隐藏，。
> 5.==使用伪元素完美解决此问题，即解决二级菜单高度塌陷问题，又可以使二级菜单能够多利文档流显示在上面==

- **==伪元素 标签 + ::after==**
- 文本第一个字母 XXX:after first-letter{CSS}
- 文本第一行 XXX:after first-line{CSS}
- 文本首添加伪元素：
```
.box::before{
content: "aaaa"; // 文本，可以不写东西，清浮动时就不写
clear: both; // 清浮动
display: block; //只有改成块级元素才能清浮动
width: 0; // 把宽高设置成0 0，content写东西照样显示
height: 0; // 宽高为0主要是防止伪元素占位置
visibility: hidden;
/* 可见元素设置成隐藏，content写东西也不显示 ,占位隐藏，位置还站着，而display:none不占位置隐藏*/
        }

.box::after{
    content: "";
    clear: both;
    display: block;
}-->        
```
- 文本尾添加伪元素： before->after ， 其余一样
- ==伪元素的文本内容自成一体，和别的文本不是一个标签的，所以无法对此文本进行选中，它是伪元素，不是一个由标签包裹的是实实在在的元素。==
 
### 窗口自适应

- 之前学过，页面的高度是由内容撑起来的，所以初始为0，但是在CSS中把html和body的高度设置成100%，==那么html、body的孩子==，可以根据%来定义宽高，且根据窗口的变化而变化,在后面移动端，会经常用这个东西。
- 多栏布局：==**calc()函数，可处理加减乘除运算，记得运算符两边加空格!!!!**== ，例如 `width: calc(100% - 100px);`

### 表单进阶 

#### 单选框和复选框
- 单选框效果图如下：
[![pkFcLiq.png](https://s21.ax1x.com/2024/04/30/pkFcLiq.png)](https://imgse.com/i/pkFcLiq)
- 代码如下：`<div><input type="radio" name="a" checked="checked">满意</div>` 
> 解释：1.首先input是行内块级元素，为了防止多个单选框在同一行，我们用个div包裹住使其独占一行。
> 2.type = radio 可以显示出单选按钮。
> 3.name命名分类，给多个单选框命名，相同名字的单选框为一类，只能选择一个选项
> 4.checked = "checked"(可简写为 checked) 是默认选项，即用户不选择或刷新后，系统默认给你选上这个选项。

- 在单选框中，我们可以实现点击选项文本选择这个选项，而不是只能点击按钮，具体实现代码如下：
```
<div>
    <input type="radio" name="b" id="man">
    <label for="man">男</label>
</div>
```
> 使用label把文本写好，然后for属性是瞄准单选框目标，写id名，input单选框里只能用id来进行命名，二者联动即可实现。
 
 - ==复选框==：同样用name进行分组分类，方便js从后台获取，然后type属性改为 checkbox.

#### 提交文件与提交按钮图片功能

- 1.提交文件：`<input type="file">` 点击上传文件。
- 2.图片按钮（更好看）：
```
<form action="">
    <input type="image" src="">
    <!-- 就是弄一个提交图片代替提交按钮 -->
</form>
``` 
#### 隐藏按钮、禁用与可读
- 3.隐藏按钮 ：是给后端看的，使用value传输一些个人信息。
- 代码：`<input type="hidden" value="带给后端的个人信息">`
- 4.禁用与可读(都可简写) disabled="disabled" || readonly="readonly"
- 可以给按钮，选择框，文本框添加。
- 没啥大区别，反正都是不能对此标签再进行修改了。
- 一些代码如下：
``` 
<button disabled>注册</button>
<input type="radio" disabled>不满意 

<input type="text" readonly value="只读">
<input type="text" disabled value="禁用">
```

#### 下拉菜单选择

例如用户选择发货地址时，下拉省份。

- 代码：
```
<select name="province" id="1" size="1" multiple>
    <option value="sd">山东</option>
    <option value="zj" selected>浙江</option>
    <option value="gd">广东</option>
    <option value="gx">广西</option>
</select>
```   
> 1.select属性 size：显示几个选项，属性2：multiple多选（自选），按住ctrl或shift选，name/id之前讲过。
> 2.option选项，属性1：value是给后端的信息，弄清用户需要选的什么。 selected默认选，单选写一个，多选multiple可写多个。 

#### 文本域

用户写评价时的文本大框。
图 ：[![pkEE8oV.jpg](https://s21.ax1x.com/2024/05/06/pkEE8oV.jpg)](https://imgse.com/i/pkEE8oV)

代码:
```
<div>多行文本输入框-文本域</div>

<div>
    <textarea placeholder="请输入您的意见" col="10" row="10"></textarea> // 提示文本
    <textarea>您的意见是：</textarea> //预制文本
</div>
```    

> 1.textarea设置宽高，有col和row属性，但是仅参考字符，汉字不行，==所以用CSS设置wid和hei就行，CSS都可以对表单标签进行常规的样式设置，例如文本域，字段集等。==
> 2.placeholder提示文本属性，但是预制文本和input = text的文本框不一样，不写在value内，直接写在标签内，==但会记录换行和空格，不要随便换行加空格。==
> 3.==新属性resize（写在CSS，对textarea标签）重新设置大小==，默认为both，即用户可以随意更改文本框大小，但是为了不影响布局，有另外3个属性，horizontal 只能水平方向拉伸文本框大小，vertical 只能竖直方向拉伸文本框大小，none 都不行。

#### 字段集 
图：[![pkEEJiT.jpg](https://s21.ax1x.com/2024/05/06/pkEEJiT.jpg)](https://imgse.com/i/pkEEJiT)

代码：
```
<fieldset>
    <legend>性别</legend>
    <input type="radio" name="a">男<br>
    <input type="radio" name="a">女
</fieldset>
```
> 1.一种特殊的表单样式，可HTML实现，省事。
> 2.legend就是标题栏目名
> 3.fieldset内部可以之前学的任意表单
> 4.同样支持CSS，fieldset和legend标签都可以设置常用的属性，例如border属性、字体属性等

#### 增强input 

属性：[![pkEE3d0.jpg](https://s21.ax1x.com/2024/05/06/pkEE3d0.jpg)](https://imgse.com/i/pkEE3d0)
效果：[![pkEETFf.png](https://s21.ax1x.com/2024/05/06/pkEETFf.png)](https://imgse.com/i/pkEETFf)
代码 ：
```
<!-- form action="交给后端地址" -->
    <form action="">

        <!-- 颜色选择，用户可以自己提取网页颜色或选择颜色，每个标签都要有name，作用传给后端 -->
            <input type="color" name="color">
        <!-- 邮箱输入 -->
        <div>
            邮箱：<input type="email" name="email">
        </div>
        <!-- 地址输入 -->
        <div>
            url地址(完整地址去网页上复制): <input type="url">
        </div>
        <!-- del只能在手机页面专用 -->
        <div>
            telephone number: <input type="tel">
        </div>
        <div>
            滑块效果1: <input type="range" name="range" min="100" max="200" value="10" step="10">
            <!-- value初始默认值 step一次移动的步长-->
            滑块效果2: <input type="range" name="range" >
        </div>
        <div>
            数字类型: <input type="number" min="0" max="100" value="20" step="5" name="old">
        </div>
        <!-- 比文本框多了个快速清除X -->
        <div>
            搜索: <input type="search">
        </div>
        <div>
            日期选择: <input type="date">
            月期选择: <input type="month">
            周期选择: <input type="week">
            <!-- 精确到分钟，可以自动获取当前时间 -->
            <input type="datetime-local">
        </div>
        <input type="submit">

    </form>
```

> 1.基础复习，首先input标签要给后端，要放在form标签内，form的action装的是后端的地址，另外每个input都要有name属性，让后端直到你传的数据是哪一部分的。
> 2.type = color/email/url/tel 注释已有，很简单
> 3.滑块效果属性range，属性介绍，min、max是最大最小值，value是默认开始值，step是每次移动的最小步。
> 4.search搜索，比文本多了个删除X，点击瞬间删除内容。
> 5.日期选择精确到日，同理月期选择精确到月，周期选择是按周选。

#### 表单增强-属性

- 为了更规范表单的输入。
   代码：
    ```
    <div>
        用户名: <input type="text" autofocus required multiple pattern="[0-9][A-Z]{3}">  
    </div> 
    ``` 
> 1.autofocus是自动聚焦，一般聚焦于开始的第一个表单，只能一个。
> 2.required是必填项。
> 3.==pattern是正则表达式的要求==，例如有些网站密码要求，包含数字、英文及大小写和特殊字符，pattern="[0-9][A-Z]{3}“在js这就是正则表达式，后面再学，这里代码表示按顺序一个数字三个大写字母格式。
> 4.multiple是可以写多个属性，用逗号隔开。

#### 初始的数据列表
- 应用：例如再京东搜索一件商品，往往打一个字，就会推荐出许多含有这个字的商品，这是后台读取关键字给你的推荐，显示出来就是数据列表，不过这里是写死的，后面学js后，可以实时从后台调数据。

代码： 
```
<input type="text" list="mylist">
    <datalist id="mylist">
        <option value="shouji"></option>
        <option value="shouji1"></option>
        <option value="shouji2"></option>
    </datalist>
```
> 1.datalist是数据列表的标签，里面的option就是推选项荐，value是显示的商品名。
> 2.文本输入框与数据列表使用id<->list链接，给数据列表起id名，给文本框list属性内填入id名进行两者关联。

### 移动端布局
#### 移动端基础
>1.在网页的手机模拟器显示的分辨率是==css像素（设备独立的像素）==
>2.**而现实中的手机和电脑在模拟器上截的图显示的是==物理分辨率==**(物理像素就是手机实打实的分辨率)，在网页手机模拟器上截图下来的图显示的分辨率是真正的物理分辨率。
>**之前学的pc端，css一像素pc端就一像素，而到移动端就不同了.**

>==设备像素比（dpr）= 物理像素 / css像素==
>**每个设备的设备像素比不同，例如以下几部手机的设备像素比**
>iphone6 1css像素 == 2物理像素  ==意思是在电脑上设置的1px转移到手机物理端变为2px。==
>s5 1 css像素 == 3物理像素

>你在设计一个移动端的网页，不像pc一样，可以实时查看网页做的咋样，edge浏览器虽然有手机模拟器可以通过edge手机模拟器来实时查看网页，但是edge浏览器的手机模拟器显示的不是物理分辨率（手机真正的分辨率），它是css像素（设备独立像素）

>==**!设计稿使用物理分辨率!这样页面更清晰**==


>手机网页设计稿是根据手机真实的物理分辨率给你的，所以要根据dpr把设计稿的物理像素转化为edge浏览器手机模拟器的css像素，最后在pc上借助edge浏览器手机模拟器设计网页，转移到真是手机上时就能占满屏幕了

>!往往一个设计稿适配多个机型！
>==**所以设计时尽量用以下方法设计**==
>1.百分比（不要用px写死写固定,要不换机型大小布局就不匹配了）
>2.弹性盒布局
>3.==**rem布局 等比例缩放**==
>4.`<meta name="viewport" content="width=device-width, initial-scale=1.0">`（这就是head里面默认的东西，移动端的基础）

>对4解释： 没加meta标签，就是布局窗口，而人看的是视觉窗口，当两者不切合是会很别扭，显示不全，只有理想窗口才能完美显示网页，width=device-width 意为理想视口等于设备宽度，initial-scale=1.0代表设备缩放，改为user-scalable = no就是禁止缩放。

#### 横向滚动

- 在很多网站中，我们在头部导航栏很多时候可以看到横向的滚动导航栏，如何实现这个效果，思路如下；
  ```
    display:flex; // 导航栏父盒子先设置成弹性盒，让子元素横向排列
    flex-shrink:0; //最重要的新属性，挤压是设置为0，子元素不在受父盒子宽度限制而挤压，而是撑开父盒子的宽度
    overflow:auto; //加滚动条
    // 剩下的使用文本属性调整美观度即可
  ```

#### 多列布局
- 知识点：[![pkZz4p9.jpg](https://s21.ax1x.com/2024/05/11/pkZz4p9.jpg)](https://imgse.com/i/pkZz4p9)
  [![pkZzffJ.jpg](https://s21.ax1x.com/2024/05/11/pkZzffJ.jpg)](https://imgse.com/i/pkZzffJ) 

 - 示例代码：
 ```
 css ：


 div{
    height: 300px;
    background-color: yellow;

    column-count: 5;  /* 1.显示的列数 */
    column-gap: 100px;    /* 2.列的间距 */
    column-rule:2px solid red; /* 3.列边框 */
    /* 4.列高度统一属性 有两个属性值 balance 平衡每个列空间  auto 尽量占满，后面甚至有空着的*/
    column-fill: balance;
    /* column-width: 300px; */  /* 5.调整列宽 ,与列数column-count冲突，你设置列数后系统会自动平分列宽，你自己设置会破坏结构*/

}
div>h1{
    /* 例如给大标题，跨列 属性 all/none */
    column-span: all; // h1大标题跨所有列
    text-align: center; // 显示在水平中心
}


html：

<div>
    <h1>1234</h1> //标题
    // 文本内容，自动生成
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque illum, magni aliquam natus voluptas nostrum numquam at repellendus delectus ex eum est, libero rerum reiciendis! Corrupti saepe sunt veritatis sequi!
    Laboriosam necessitatibus laudantium dignissimos rem pariatur odit quam ratione, rerum incidunt in ipsam excepturi inventore aliquam, neque animi voluptate qui molestiae praesentium! Eum eos earum, vel sit sunt voluptatem omnis!
    Ratione sit corporis ut dolores, sunt itaque blanditiis id consequatur mollitia commodi nobis ipsum ad illum iste iure beatae minima, impedit temporibus atque quas facilis delectus earum doloribus. Placeat, iste!
    Accusantium eius exercitationem porro obcaecati, quos nam molestiae dolore ad asperiores magnam architecto in, reiciendis corporis dignissimos enim. Nesciunt aliquam optio ex aperiam aliquid obcaecati ea officia iste, exercitationem eligendi?
    Quaerat ipsa voluptatum tenetur porro aut! Magni, non? Eius dolor, repellat reprehenderit, dicta vero, quasi consequuntur natus aliquid nisi magni quaerat ullam sit! Nostrum qui possimus id eum, repellat ducimus.
    Dolore facere veritatis at numquam corporis facilis eligendi magnam? Maiores recusandae adipisci inventore. Maiores aperiam doloribus temporibus, laboriosam possimus quae sint suscipit ducimus architecto deleniti accusantium, tempora sit expedita similique?</div>
</body>
 ```
 > ==新属性： break-inside: aovid; // 在多列折行时，防止内部盒子被拆分成两部分==
#### rem布局（等比例缩放）

  > em:相对单位，相对与父元素的字体大小,父元素字体16px,则1em=16px, div { width: 10em;} div宽度160px
  > rem：相对于根元素(html)的字体大小
  > rem比em更加的好用，因为em涉及到父元素的嵌套，要换算很麻烦，rem更简单，只有一个父元素，参考量只有一个，更方便。

- ==**下面的都很重要**==
- ==在编写布局时，虽然使用rem进行布局，但是不同的屏幕的根元素rem是不同的，我们希望在大的屏幕上，rem能等比例扩大，在小屏幕上，rem能等比例缩小，只有这样一个rem设计出的页面可以在不同大小的屏幕显示出同样的布局效果==
- ==等比例缩放页面的方法：使用了js代码，例如：此代码按照的是iphone4为模板进行设计，代码如下：`document.documentElement.style.fontSize=document.documentElement.clientWidth/750 * 16 + 'px'` ，意思是 动态显示font-size = 当前设备的css布局宽度/物理分辨率(设计稿宽度，比如iphone4的物理分辨率是640px) * 基准font-size（不用除2，计算机帮你算，基准默认1rem = 16px）==
- ==不用除2：意味着我们可以直接写物理分辨率（设计稿就是物理分辨率，直接照着设计稿做），利用插件px->rem，我们可以先按照设计稿的物理分辨率直接写px然后再用插件改成对应的rem，插件也可以支持f1在px->rem栏全局更改成rem或者alt+X（再快捷键里设置的）也可以直接px与rem互换，另外rem默认为16px，要想更改，在文件-首选项-设置-Root font size更改。==
- ==使用了那个插件，就在插件里面设置基本的font-size，转化的原则是根据插件里的设置，自己设置的html的font值不好使，只能作为一个提示作用，你要同时同步插件里的font值与html相同==最后一个问题，如果根元素html设置了font-size后，会影响布局的文字大小，那么我们再在body里设置正常的font-size值，这样覆盖掉了html的设置，html是给rem用的，body是给布局文字用的，两者各司其职。**另外引入的icon文字图标也要写成em形式，这些文字图标也要随屏幕变化而变化，但是需要另外设置，它的属性就是icon-font，令icon-font = 1em，写在body即可**
- 另外不用除2是因为已经除过了，这里的逻辑关系不好解释，不写了，不会就看课去。
  
#### vw和vh
- 1.介绍：vh  view-height
    100vh ==  可视窗口高度
    vw view-width 
    100vw == 可视窗口宽度
- 2.**不同手机屏幕有不同vw，vh** 
- 3.无滚动条时，width: 100%; == 100vw
    ==有滚动条时，100vw包含了滚动条宽度,而width=100%不包含滚动条宽度,在此时width: 100%; < 100vw。==     
- **由于不同手机屏幕有不同vw，vh，我们还可以用vw或vh来用另一种不用 js的方法来写动态变化的移动端布局。**
  ==**具体方式如下： 我们正常在html设置好font-size的初始px值，然后按照物理分辨率（不用除）直接把网页用px给写好，再用插件把除了html的font-size剩下所有的px全化成em，以iphone4为例子，我们要把font-size的值转化为相应的vw, 100vw = 320px（css分辨率）然后得 1vw = 3.2px 所以 16px = 5vw ， 但是由于之前都是按物理分辨率做的网页，而iphone4的dpr = 2（即1css等于2物理）所以我们在电脑上设计的尺寸（css）正常要先人为计算用物理除2得出css，再写的，但是我们把5vw除2变2.5vw就省事了，计算机帮我们除了，和js的那个如出一辙，俗话讲就是，我把你的font-size的vw缩小2倍后，就相当于所有你之前设计的尺寸都缩小2倍，这不就是我们人为除2的得出的css像素吗，直接用计算机算就完了。**==
### 响应式布局
#### 响应式基础
 - 根据屏幕大小的变化可以动态的变化布局结构,会有临界的断点，过了断点就会动态变化。 pc/移动端兼容
 - 媒体查询的结构：
```
@media all and (min-width:320px){
    body{
        ....
    }
}
```
> 1.对于所有的元素 @media all  2.要求时大于320px (min-width:320px)(还可以用and连接更多的条件)  3. 这个时候对页面布局进行更改 body{ .... }
> @media all 除了all还有别的许多属性，不过最常用的还是screen，针对笔记本、显示器、移动端设备。
- @media 属性如图：
  
- 响应式缺点：设备工作量大（比如淘宝京东是绝不会用的，负荷太大），代码冗余，所以不是万能的，客观看待这个布局方式。

#### 横竖屏检测

- 判断原则：横屏 宽大于高 ； 竖屏 高大于宽
- orientation: bortrait(竖屏) / landscape(横屏) 作为条件用and衔接在media后。
- 代码 ：
```
    /* 当为竖屏时，即宽比高小时 */
    @media screen and (orientation:portrait){
        div{
            width: 33.33%; // 盒子宽度占屏幕1/3
        }
    }
    /* 当为横屏时，即宽比高大时 */
    @media screen and (orientation:landscape){
        div{
            width: 25%; // 盒子宽度占屏幕1/4
        }
    }

  ``` 

### 网格布局

#### 基础知识

- **网格布局**：display:grid; 按照X Y轴划分出的单元格进行布局，对指定元素所占单元格进行设置.
- **容器和项目**： 案例最大的盒子是容器，理解为父元素（grid属性拥有者），项目就是容器里面的许多小盒子。
- 行和列：水平为行，竖直为列，定义好网格布局有几行几列。
- ==单元格和网格线如下图==（注意网格线部分,网格线作用是给元素指定起始结束的行和列来进行大小的定义）：[![pkYRIdf.jpg](https://s21.ax1x.com/2024/06/06/pkYRIdf.jpg)](https://imgse.com/i/pkYRIdf)
- 两个属性 ： ==grid 块级网格，可以把行内元素转化为块元素==
    inline-grid 行内块级网格，把行内元素转化为行内块元素（很少用）

#### 行列属性

- 基础知识（行列属性写在容器上）:
  [![pkYR7FS.jpg](https://s21.ax1x.com/2024/06/06/pkYR7FS.jpg)](https://imgse.com/i/pkYR7FS)
  [![pkYRHJg.jpg](https://s21.ax1x.com/2024/06/06/pkYRHJg.jpg)](https://imgse.com/i/pkYRHJg)
- 解释：
  ```
   /* 可以px也可以% */

    /* 1.px 
    /* 设置行数以及对应行数的大小,不一定写一样的*/
    /* grid-template-rows: 200px 200px 200px;  3行，每行为200px
    /* 同理，设置列数和大小
    /* grid-template-columns:200px 200px 200px; 3列，每列为200px

    /* 2.% */
    /* grid-template-rows: 33.3% 33.3% 33.3%; // 3行，每行占33.3%
    grid-template-columns: 33.3% 33.3% 33.3%; // 同理
    
    /* 3.repeat */
    /* 每次写相等宽高的麻烦，简便写法 */
    /* grid-template-rows: repeat(3,33.3%); // 重复3次，每次设置为33.3%
    grid-template-columns: repeat(3,33.3%); 
    
    /* 4.repeate auto-fill 自动填满   '%' or 'px'   */
    /* grid-template-columns: repeat(auto-fill,33.3%); //3份
    grid-template-rows: repeat(auto-fill,25%); //4份

    /* 5.fr 片段（单位） 自适应剩下的空间，很像flex:1  */
    /* grid-template-columns: 100px 1fr 300px; //中间自适应剩下的空间
    grid-template-rows: 3fr 4fr 7fr;  // 按比例划分

    /* 6.minmax 给一个范围大小，不超出范围，随其他的div变化而动态变化大小*/
    /* grid-template-columns: minmax(100px,200px) 200px 250px;
    grid-template-rows: repeat(3,33.3%); */

    /* 7.auto 自动填满空间，和1fr一样*/
    /* grid-template-columns: 100px 100px auto;
    grid-template-rows: 100px 100px auto; */

  ```

  > 注意： 1.行或列大小超过容器会溢出的，不要写超了。
  > 2.容器内项目过多，超出单元格数量会导致布局出现不可控变化。

#### 网格布局-间距
  - 写法：
 
  ```
    /* 缝隙占空间，当心撑出大盒子 */
        /* 写法如下 */
        grid-row-gap: 20px;
        grid-column-gap:20px;
        /* 行 列 */
        grid-gap: 20px 20px;
        /* 写法2 */
        gap: 20px 20px;
  ```

#### 网格布局-区域命名与合并

- 布局：
  ```
    /* 划分区域 尽量对应好网格布局结构 合并的区域设置成同名，在设置div对应区域名*/
    /* 一一对应很形象的 形状只能是正方形或者矩形*/
    grid-template-areas:'a a b'
                        'd e b'
                        'f f b';
  ```
- 使用：（给要用的项目加上属性）
  ```
    .box{
        grid-area: a; // a区域为box元素
    }
  ```

#### 网格布局-对齐方式

- 容器的属性：
  1.排列的方式（默认项目横向排列）
  grid-auto-flow: row || column;
  2.表格（没占满容器）在容器中的位置
  如图:[![pkYRoo8.jpg](https://s21.ax1x.com/2024/06/06/pkYRoo8.jpg)](https://imgse.com/i/pkYRoo8)
  > 和flex弹性盒的一毛一样。 后缀是 -content
  3.项目占不满划分的格子时，可以对项目在格子中的位置进行设置
    [![pkYWmTK.jpg](https://s21.ax1x.com/2024/06/06/pkYWmTK.jpg)](https://imgse.com/i/pkYWmTK)
  > 后缀是 -items

#### 网格布局-项目属性

- 项目属性
  1.网格线合并（对单一项目的设置，前面学的是在容器上的调控）
  gird-column-start: 列网格线起始
  gird-column-end: 列网格线结束
  gird-row-start: 同理，行网格线
  gird-row-end:
  ==简写== 
    grid-column:1/2     1->2
    grid-row:1/2   
    
### CSS3的一些高级用法
#### 线性渐变
- 代码：`background: linear-gradient(XX,red,yellow);`
> 1.支持多个颜色
> 2.XX位置可以写 to top/ to right/ to left / to bottom, 例如to top 意为 红色到绿色要往上去（红在下率在上），默认不写就是 to bottom
> 3.支持角度，任意方向，XX位置写xx deg  从12点为0deg顺时针一圈360deg,0deg是to top展现的,90deg = to right ,180 deg = to bottom , 270deg = to left,可以在检查中借助轮盘实时观看不同deg的效果

#### 径向渐变
- 涟漪式渐变，一圈圈扩散的渐变
- ==代码1；==` background: radial-gradient(red,green,blue);` , 从中心向四周依次红到绿到蓝的渐变。（**均匀**）
- ==代码2：==` background: radial-gradient(red 0%,green 10%,blue 30%);`, 0%->10% 意思是红色从0%开始渐变，到10%渐变为绿色，即红到绿过渡；同理10%->30% 绿到蓝过渡  30%->100% 剩下的没其它颜色了，到30%绿色完全渐变为蓝色后就不再变色了，公式是开始渐变点（颜色1）到结束渐变点（颜色2）(**不均匀**)
- ==代码3：==` background:radial-gradient(red 50%,blue 50%);` , 0->50% red 50%->100% blue ,前一个50%意思是红色在50%才刚开始渐变成蓝色，后一个50%意思是50%开始红色正式渐变为蓝色50%，红色刚渐变就变成了蓝色了，所以红蓝衔接没有渐变，直接切换颜色.(**不渐变**)
   > ==代码2和3的百分比式渐变同适用于线性渐变==
- 代码4：` background: radial-gradient(circle,red,green,blue);`
   > circle 以圆显示  ellipse 椭圆 , 径向圆不写默认跟着盒子变化而变化，盒子扁就椭圆，盒子正方形，就正圆，如此。
- 5.其它（改变中心位置和更改渐变大小）
- XXX 不重要，不详细写了
- 知识点：[![pkmvXUU.jpg](https://s21.ax1x.com/2024/05/15/pkmvXUU.jpg)](https://imgse.com/i/pkmvXUU)

#### 重复渐变
- 代码：`  background:repeating-radial-gradient(red,yellow 10%,green 20%);`
- 意思 red 0% -> 10% yellow -> 20% green -> red(重复) -> 30% yellow -> 40% green -> ...
- ==重复渐变于线性渐变区别是，线性渐变过了20%剩下的全是绿色，而重复渐变是，过了20%又为红色重新渐变。== 

#### 动画过渡属性transition

- 知识点：[![pkmxNxs.jpg](https://s21.ax1x.com/2024/05/15/pkmxNxs.jpg)](https://imgse.com/i/pkmxNxs)
- 复合属性： transition 加在动画载体元素上，谁要动画加给谁。
  transition: (1)all (2)2s (3)linear (4)2s
  > transition复合属性解释：
  > 1.由于不支持多个属性写在一起，所以all统筹了所有要变得属性，例如宽、高、颜色等
  > 2.动画持续时间
  > 3.linear 匀速(默认) 还有别的属性
  > 4.延迟显示（用的少）
  > ==特殊地，all不支持display: block <-> none 的转换==
  > ==我们可以曲线实现这个效果，给ul的高度设置为0，加上overflow:hidden; 溢出隐藏后，当鼠标上去后，高度设置好参数，就可以实现动态展开菜单效果==

#### 动画过渡类型

- 除了默认的linear（匀速），还有好多的过渡类型
- 例如： ease逐渐慢 ease-in加速 ease-out减速 ease-in-out先加速后减速
- 贝塞尔曲线：控制变化的快慢速度，在网站里可以调试：https://cubic-bezier.com/#.28,.97,.96,.37 把相应的想要的效果复制过来就行。

#### 动画过渡单一属性（把符合属性transition拆了）

> 1.transition-property 哪个属性谁在变，对应的all
> 2.transition-duration 持续时间
> 3.transition-delay 延迟时间
> 4.transition-timing-function 贝尔赛曲线，对应的linear

#### 2D平移translate()

- 将元素向指定位置进行移动(水平、垂直、对角)
- 代码为：`transform:translateX(...);`,支持正负，正向右水平移动，反之则反。
  同理支持 translateY(...) 在竖直平面上移动（注意translateX/Y也是写在transform里的，要单独写出来）
  同理 translate（X,Y）写两个值，对应X和Y值
  要想平滑移动，结合着transition的那些符合属性一起就行。
  > 问题；平移效果用动画属性去改变left，top等定位值也可以实现
  > 但是这样会造成浏览器重拍，增加浏览器负担

#### 2D缩放scale()

- 对图片等进行放大缩小
- 代码：`transform:scale(1.5);`,默认1为正常大小，放大是以中心为基准。也能负值，会倒过来。
  同理要想平滑移动，结合着transform的那些符合属性一起就行。
  放大一般在盒子上结合overflow:hidden;，防止图像溢出，更美观。
- 还有只支持X轴放大或只支持Y轴放大，scaleX() scaleY()
- 还可以不从中心放大，例如以左上角为中心开始放大，给要放大的图片加上属性transform-origin : left top; (左上角)，同理别的位置。

#### 2D旋转rotate()

- 对指定对象按照参数进行旋转。
- 代码： `transiform: rotate(..deg);`,旋转角度单位deg，正值顺时针，负值逆时针。
- 有rotateX，把屏幕想象成立体空间，在屏幕只一个横向烧烤杆子，然后旋转
  rotateY，把烧烤杆子竖起来转。rotateZ(默认值，即rotate())就是在二维屏幕上旋转了
  更改环绕中心点，默认是这个元素的中心，还是transform-origin属性。

#### 2D transform复合属性
- 我们可以把平移，旋转、缩放都写在一个transform里，==但要注意，往往平移要写在最开头，因为缩放和旋转会影响平移的坐标和位移！==  

#### 2D倾斜
- 代码：` transform: skew(30deg,30deg); `
- 第一个参数是x轴（水平上倾斜）第二个参数Y轴（竖直上倾斜），deg的正负：+拽着右下角   -拽着左下角 
- 可以分开写 skewX( ) ||  skewY( )

#### transition和transform的总结
- **这些个CSS高级属性属性更丰富了网页的美观度，交互性，是一个合格网页必备的！例如164明星资料卡案例**
- ==transition== 负责的是元素的变化速度和时间，一般加在要变化的元素标签上
- ==transform==  有多种属性，例如平移translate()、旋转rotate()、缩放scale()、skew()2d倾斜等，一般加在hover上，体现标签的变化，以平移为例，也可以直接加在标签上，那么标签会直接平移到那个位置
- ==transform-origin==  给缩放和旋转用的，默认中心，加在要变化的标签上，不要加在hover上。

#### 关键帧动画animation

- ==transition 与 animation 的区别== :[![pkM8uKe.jpg](https://s21.ax1x.com/2024/05/21/pkM8uKe.jpg)](https://imgse.com/i/pkM8uKe)
- 关键帧动画分为动画声明和动画调用
- 动画声明部分
  ```
  // 第一种
   @keyframes ani1（名字）
    from{
        ....
    }
    to{
        ...
    }
  // 第二种，相对于第一种可以设置更多的节点，可以用百分比自定义设置，每个时间区段的动画内容。
   @keyframes ani2（名字）
    0%{
        ...
    }
    25%{
        ....
    }
    50%{
        ...
    }
    75%{
        ...
    }
    100%{
        ...
    }
  ```
- 定义好后就调用动画名字，还是在transition上使用，具体格式如下：`animation:ani1 2s linear 2s infinite; `
 >从左到右分别为：名字 总持续时间 过渡类型 延迟时间 执行次数（直接写数字或infinite无限 ）

#### animation单一属性
- ==常见的：==
    1.animation-name:动画名字 ;
    2.animation-duration: 持续时间;
    3.animation-timing-function:动画过渡类型;
    4.animation-delay: 延迟时间;
    5.animation-iteration-count: 循环次数;
- ==新的：==
    6.animation-direction: 动画在循环中是否反向运动;
    默认为normal 正常 、reverse 反方向 、alternate 交替、 alternate-reverse 反方向交替
    7.animation-play-state:动画运行状态;
    有running（运行）和paused（暂停）两个属性值，默认running，一般加在hover上，可以人为的控制一个属性动画的运行。

#### 关键帧动画
- 这个属性step属于animation的过渡类型一类的属性，主要作用是让动画瞬间跳转。
- 代码：
    ```
    div{
            width: 200px;
            height: 200px;
            background: red;

            animation: run  5s steps(1,end) infinite;
            /* 前面的数字是填补帧数设置，也就是切换有几步，1就是瞬间切换 */
            /* end 保留当前帧，看不到最后一帧（黄色）
            start 保留下一帧，看不见第一帧（红色）
            写法2 step-end step-start */
            
        }

    @keyframes run{
            0%{
                background: red;
            }
            50%{
                background: green;
            }
            100%{
                background: yellow;
            }
        }

    ``` 
    > **在169关键帧动画案例关键点是，例如在应用step-end时，我们看不到最后一帧，为了是动画不丢失，所以要多加一帧的空白。**

#### animation动画库
- 会有很多大佬分装好的库，供大家直接使用，下面进介绍css的调用，js的调用还没学。
- 地址为,看demo：https://animate.style/
- ==**以下为操作流程：**==
- 首先，根据说明书，直接引入地址，放入head标签内
   `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>`
- 我们直接给元素输入class的相关名字就可以实现css属性，作者早在相对的class内写好了代码，记得加前缀animate__animated
- 格式为 animate__animated + 空格 + 你想要的效果copy过那个class过来
- 另外，一些动画属性你也可以自己加，比如无限循环属性等，也用class并列写入即可(自定义动画属性)
- 例如 ： 
  ```
    CSS:

    div{
            width: 200px;
            height: 200px;
            margin: 0 auto;
            background-color: red;
        }
        .kerwin666{ // 自我创建
            animation-iteration-count: infinite;
            animation-duration: 0.5s;
        }

    HTML:

    <div class="animate__animated animate__rubberBand kerwin666"></div>
    // 我们引入基础前缀和效果名后，可以自己创建的class类来控制动画的效果，这三个都是class类，前两个class类内部作者已经写好了实现这个视觉效果的css代码
  ```

- 还有一种写法，和上面的功能一样，仔细阅读
  ```
    CSS:

    .my-element {
        display: inline-block;
        margin: 0 0.5rem;

        /* 说明书：直接打名字，删掉前缀animate__ */
        animation:shakeX; 
        animation-duration: 2s; // 记得一定设置持续时间等属性，这些个单一的动画属性需要你自己单独设置了
        animation-iteration-count: infinite;
        }

    HTML:

    <div class="my-element"> </div>    
  ```
- **注意：css动画只有在块级元素和行内块级元素上才能其效果，在行内元素上是无效的，要单独对其display进行设置，还有相关的注意事项在网站上都有。**
