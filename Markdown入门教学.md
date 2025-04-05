# <font face="宋体" color="red" size = 10>Markdown入门笔记</font>

1. **标题**
#+空格+内容 = 一级标题
##+空格+内容 = 二级标题
以此类推共六个级别的标题
共6个级别的标题.....

1. **引用**
 > 引用内容.......
 >> 嵌套引用

1. **列表**
    1. 无序列表(-/+/*+空格+内容)
       - 1 
       + 2
       * 3

    2. 有序列表:列表号+空格+内容
    3. 列表可以嵌套
        1. 嵌套
        2. 嵌套
        3. 嵌套
    4. TodoList
        - [x] 任务1
        - [ ] 任务2
        - [ ] 任务3
2. **表格**
   | 左对齐 | 居中对齐 | 右对齐 |
   | :- | :-: |-:|
   |对齐格式中有几个 - 无所谓|b|c|
   |写的内容多也会自动扩展表格|e|f|
3. **段落**
    - 换行---2个以上的空格回车在输入内容或者空一行再写
    此致  
    敬礼！
    - 分割线 ： 3个*
    ***
    - 字体

    | 字体 | 代码 |
    | :--: | :--: |
    |*斜体*|* *|
    |==高亮==|== ==|
    |**粗体**|** **|
    |***斜粗体***|*** ***|
    |~~删除~~|~~ ~~|
    |<u>下划线</u>|```<u> </u>```|
    - 脚注
    茅盾[^1]
    [^1]:文学大家，这两个需要组合出现，才会有完整效果。

4. **代码**
   - 多行代码用三个 **`** 前后包上
    ```
    #include<stdio.h>

    int main(){

        printf("Hello World!\n"); 

        return 0;
    }
    ```
    - 单行代码用一个 **`** 前后包上

    `printf("Hello World!\n");`

5. **超链接**
    - [菜鸟教程Markdown] : https://www.runoob.com/markdown/md-tutorial.html
    - 更多的内容请[点击链接][教程]
    > 脚注后记得加空格再打上链接地址

    [教程]:  https://www.runoob.com/markdown/md-tutorial.html
6. **图片**
    - 利用图床来实现图片的插入，作用是突破了图片只在本地电脑的限制，使得别人也可以下载到你的图片并查看到完整的文档
    - [路过图床] : https://imgse.com/
    - [谷雨] : [![pkSIQVs.jpg](https://s21.ax1x.com/2024/04/20/pkSIQVs.jpg)](https://imgse.com/i/pkSIQVs)
    - [谷雨2] : 
    <a href="https://imgse.com/i/pkSIQVs"><div align = center><img src="https://s21.ax1x.com/2024/04/20/pkSIQVs.jpg" alt="pkSIQVs.jpg" border="0" width="50%" height="50%"/></div></a>
7. **数学公式latex 略**
8. **html/css语法**
    - html: font改字体形式、大小和颜色,更改图片的大小和位置
    - css: 在源码/crossnote/style.less中进行统一的更改
9. **个性化设置**
    - File-Preferences-Settings
10. **导出**
    - 右键文档，选择pdf导出(不建议，格式会出错)
11. **反转义**
    - 在打转义字符(特殊的,$,==,b,strong等),前后两个会把中间的文字格式进行转化,这时用\ + 转义字符可以把其当作字符串打印,不再含有转义功能
