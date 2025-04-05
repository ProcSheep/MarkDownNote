## Vant(移动端)
### Vant的引入
- vue3的vant下载: `npm i vant`,==是一个组件库,内部有许多组件模板==
- ==全局挂载vant的Button组件(**子组件可以直接使用,根据文档,标签为`<v-button>`**)==
- ==**main.js**== (==**注意: 即使后面局部引入vant组件,这个css的样式还是要在全局中统一引入!!!!**==)
  ```
    // 1. 引入你需要的组件
    import { Button } from 'vant';
    // 2. 引入vant组件样式(样式就在全局,不要动了!!!)
    import 'vant/lib/index.css';

    const pinia = createPinia()
    var app = createApp(App)

    app.use(router) // 固定的,注册路由插件
    // app.use(store) // 注册vuex插件 089
    app.use(Button) // 注册vant的Button组件
    app.use(pinia) // 注册pinia
    app.mount('#app')
  ```
  > 步骤: 引入组件Button和组件css样式,最后进行use(XX)注册组件
- ==局部挂载vant + 非语法糖(谁用就在谁哪里引入)==
  - center.vue中
    ```
      <template>
          <div>
              center
              <!-- 102 vant 非语法糖/语法糖改名-->
              <van-button type="primary">主要按钮</van-button>
              <van-button type="success">成功按钮</van-button>
              <van-button type="default">默认按钮</van-button>
              <van-button type="danger">危险按钮</van-button>
              <van-button type="warning">警告按钮</van-button>
          </div>
      </template>

      js:非语法糖
      import { Button } from 'vant'; // 局部引入组件
      export default {
          // 组件注册
          components:{
              // 组件名注册,例如:
              // "mybutton" : Button  那就是<mybutton>...</mybutton>
              // 在ES6中[]内部才是js区域,这样才能当作变量使用它 [XX(js)]: XX
              [Button.name]: Button, // Button.name = van-button,方便使用组件,命名一一对应好了
          }
      }
    ```
    > 步骤: 引入组件,在components中注册即可
- ==局部挂载vant + 语法糖==
  - ==**setup写法只需要导入无需注册,但是我们可以看下setup封装是如何给我们注册的**==
    ```
      js: setup语法糖,仅引入组件这一段代码
          import { Button } from 'vant';

      ---------对语法糖拆解如下------------------
      js:
      // 它会这样子给你引入并注册
      <script> 
          import { Button } from 'vant';
          export default{
              components:{
                  Button: Button // 同名注册的
              }
          }
      </script>
    ```
    > ==上面详细解释了**setup的语法糖注册策略是同名注册**,也就是说使用Button组件,**我们需要把标签`<van-button>`改为`<Button>`才能正常使用**==
  - ==vant 语法糖 + ES6改名{A as B},**即对引入的名字进行重命名操作,带-的用驼峰**==
    ```
      tem:
      <template>
          <div>
              center
              <!-- 102 vant 语法糖 + ES6改名-->
              <van-button type="primary">主要按钮</van-button>
              <van-button type="success">成功按钮</van-button>
              <van-button type="default">默认按钮</van-button>
              <van-button type="danger">危险按钮</van-button>
              <van-button type="warning">警告按钮</van-button>
          </div>
      </template>

      js:
        <!-- 102 vant setup语法糖区域 -->
        <script setup>
            // 用ES6给引入的组件名进行重命名,带-的用驼峰
            import { Button as vanButton } from 'vant';
        </script>
    ```
    > 步骤: 引入组件并改名,改为传统标签名

### vant-swiper(轮播图)
- 简单的完成Films.vue组件的大轮播图,==直接借用vant-swiper组件(**学会看文档,不过vant的文档有地方可能有些偏差**)==
- 代码:
  ```
    tem:
        <!-- 104 大轮播,由vant-swiper组件完成 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="data in loopList" :key="data.id">
                <img :src="data.imgUrl" alt="" style="width:100%; height:300px ;">
            </van-swipe-item>
        </van-swipe>
    
    js: setup语法糖
        import { Swipe as vanSwipe, SwipeItem as vanSwipeItem } from 'vant';
        import { ref } from 'vue';

        const loopList = ref([
            {
                "id" : 1,
                "imgUrl":"https://pic.maizuo.com/usr/movie/02e5b8507b28a6417eb2712643f3b246.jpg",
                "title" : "毒液：最后一舞"
            },
            {
                "id" : 2,
                "imgUrl":"https://pic.maizuo.com/usr/movie/f361418dccb983e2fc29dff53f74a69c.jpg",
                "title" : "焚城"
            },
            {
                "id" : 3,
                "imgUrl":"https://pic.maizuo.com/usr/movie/0c11bf47ea6f4aa021a49d82df2acbcf.jpg",
                "title" : "哈利·波特与火焰杯"
            },
            {
                "id" : 4,
                "imgUrl":"https://pic.maizuo.com/usr/movie/30d87e276c59d8fe9b73ef7a57035bc0.jpg",
                "title" : "乔妍的心事"
            },

        ])
  ```
    > 直接利用组件,插入相关图片,完成最简单的循环轮播图
### vant-list(.deep())
- 下拉列表的组件实现的效果就是瀑布流通讯录,刷新电影数据,拉到底部后再次网络请求加长列表,直到刷完
- ==**文档说明(重点,认识组件的功能)**==: List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true,此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
- 代码:
  ```
    tem: 
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
            :immediate-check="false" offset="10">
            <van-cell v-for="item in datalist" :key="item.filmId" @click="handleClick(item.filmId)">
                <img :src="item.poster" alt="" style="width: 100px; float: left;">
                <div>{{ item.name }} 页数: {{pageNum}}</div>
            </van-cell>
        </van-list>

    js: setup
    // 105 文档引入的组件少了一个Cell,记得重命名
    import { List as vanList, Cell as vanCell } from 'vant';
    const loading = ref(false)
    const finished = ref(false)

    // 检测是否到达底部的函数
    const onLoad = async () => {
        console.log("到底了")
    }

    // 重点在style的样式更改
    <style lang="scss" scoped>
        :deep(.van-cell__value) {
            text-align: left;
        }
    </style>
  ```
- **==重点:在组件作者未预留"接口"(通过往组件传递信息进而控制组件的实现效果)的情况下,控制组件的css样式==**
- 问题: 我们想要让电影的名字在页面的左边,而组件的内部设置是在右边,如图
- ==现实中的效果==: 
  [![pAyPCgP.png](https://s21.ax1x.com/2024/11/06/pAyPCgP.png)](https://imgse.com/i/pAyPCgP)
- ==理想中的效果==:
  [![pAyPPjf.png](https://s21.ax1x.com/2024/11/06/pAyPPjf.png)](https://imgse.com/i/pAyPPjf)
- 首先我们发现组件并没有设置文字左右样式的选项,==通过**检查工具**,发现在**class为van-cell__value的div的style属性中的text-align为right**,我们需要给它改为left==
- 如图:
  [![pAyP93t.png](https://s21.ax1x.com/2024/11/06/pAyP93t.png)](https://imgse.com/i/pAyP93t)
  [![pAyCxNd.png](https://s21.ax1x.com/2024/11/06/pAyCxNd.png)](https://imgse.com/i/pAyCxNd)
> ==上面的代码是v-cell组件展开后的效果==
- ==**直接进行样式style的覆盖行不通,因为scoped的原因,所有html标签会加一个自定义属性(图中的data-v-XXX)**==,只有这样组件才能有自己单独的css样式,并且不会影响别的组件.
- 我们使用别人的组件,==只有根组件(<v-cell>...<\v-cell>>)会打上和我们组件一样的标识(scpoed给的),**根组件内部的孩子是没有标识的,但是van-cell__value(div)正是其内部的孩子,他是没有标识的**==
- ==这样造成的问题是style/css是带标识的标识(scoped),而相关的div-class=van-cell__value却不带标识,导致双方class名对应不上无法添加css样式==
- [![pAyCz4A.png](https://s21.ax1x.com/2024/11/06/pAyCz4A.png)](https://imgse.com/i/pAyCz4A)
> ==你看这样的css样式是带有data-v-XX,而div标签van-cell__value没有这个自定义属性,所以css添加了个寂寞==
- 我们可以删除scoped属性,但是那样不安全,会对全局影响;而且由于组件不是我们写的,所以我们无法进入组件源码去修改css样式
- ==**解决(重点):**== ==**vue给我们提供了一个:deep()的方法**==,scoped添加的标识是在html标签上加一个自定义属性,这个属性自带一串不重复的数字和字母组合,以防止失误给别的标签加上css样式,==deep的操作是在style中,使用css的属性选择器:"[data-v-XXXX] .van-cell__value"去锁定相关标签,即先找带标识(自定义属性)的父标签,然后再找到其后代中有class为van-cell__value的html标签添加css样式==
- 这样子css的样式变为这样:
  [![pAyPp9I.png](https://s21.ax1x.com/2024/11/06/pAyPp9I.png)](https://imgse.com/i/pAyPp9I)
> 这里面有个css知识(属性选择器),相关知识在css笔记由,如果忘记了回去看看 
- ==**拓展(重点)**==:".a :deep(.b){...} ---> .a[data-v-XXX] .b",==限制了自定义属性的标签类型==,比如a为span标签,即有".span[data-v-XXX] .b",意为只在span标签中找带有自定义属性data-v-XXX的合规标签,你即使有div带相同的data-v-xxx也不在筛选范围内
### vant-list 下拉懒加载
- ==**由于卖座网站更新了,所以无法实时更新请求数据,原来能用的时候是通过传递url中改变pageNum的信息去请求新页面的数据**==
- ==所以这里重构了代码(伪代码),运行不了,和原Nowplaying.vue文件的代码不同,先用伪代码去介绍思路==
- Nowplaying.vue
    ```
        tem:
            <div>
            <!-- van-cell -->
            <!-- 禁用初始化时立即进行滚动位置检查,还没有数据初始化就检测会导致组件认为数据已经滚动完了(执行Load函数),不过不代表这个没用,有别的请求数据逻辑可能也需要这个属性 -->
            <!-- 调试下offset(看文档):滚动条与底部距离小于 offset 时触发 load 事件 , 尽量别设置为0,容易出bug -->
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                :immediate-check="false" offset="10">
                <van-cell v-for="item in datalist" :key="item.filmId" @click="handleClick(item.filmId)">
                    <img :src="item.poster" alt="" style="width: 100px; float: left;">
                    <div>{{ item.name }} 页数: {{pageNum}}</div>
                </van-cell>
            </van-list>
        </div>
    ```
  > ==为了使下拉列表更完美的显示,我们按照文档给van-cell的组件添加了写属性指导,看看注释==
- ==js setup区==
    ```
        import { List as vanList, Cell as vanCell } from 'vant';
        const loading = ref(false)
        const finished = ref(false)
        const pageNum = ref(1) // 页数
        const total = ref(0) // 数据个数

        const onLoad = async () => {
        console.log("到底了")

        // 判断数据是否被请求完毕(先跳过,往后看)
        if(datalist.value.length === total.value){
            finished.value = true // 结束请求,之后不再执行Load函数了
            return // 跳出Load函数
        }

        pageNum.value ++ // 页数更新,请求新的一页的数据
        // 像后端发送网络请求,利用模板字符串和${},把变量pageNum动态添加到地址内部,每次给后端的pageNum值都不一样,请求不同页的数据
        let res = await axios(`https://m.maizuo.com/gateway?cityId=110100&${pageNum.value}&pageSize=10&type=1&k=8063337`)
        // 记住,一定是追加数据,而非覆盖,这里用展开运算符,把数组拆开合并,和当时的对象合并一样
        datalist.value = [...datalist.value,...res.data.data.films]
        // 记得组件的注意事项: 每次请求完新的数据后要把loading重新设置为false(触发load事件会自动把loading设置成true),否则下次无法请求数据了
        loading.value = false

        // 假如后端会给你total属性,代表总数据个数,而数组长度代表现如今的数据个数
        // 需要在axios前进行一个if逻辑判断了,如果现有数据列表datalist和total总数一样了,即证明数据已经被请求完了,跳出Load函数并对finished设置为true
        total.value = res.data.data.total // 获取后端的total值

    }
    ```

### indexBar组件1--Navbar
- 本节课分两步完成"列表的索引分类显示和快速定位",indexBar是vant的组件专门负责列表的索引,我们使用这个组件逐步完善功能,==**第一节用的是Navbar组件和电影院的数据处理两部分,还没到indexBar组件的部分**==
- Navbar组件使用后的效果图:(==看顶部导航栏,经典左中右布局==)
  [![pAy1QYt.png](https://s21.ax1x.com/2024/11/07/pAy1QYt.png)](https://imgse.com/i/pAy1QYt)
- ==**惊天失误: 卖座的数据是可以请求的,之前写错了,其实是地址小写的x变为大写的X即可**==
- 组件的引入和使用(看看文档)==cinema.vue==
  ```
    tem:
    <!-- 107 Navbar组件 -->
    <van-nav-bar title="影院">
        <template #left>
            <!-- 额外加一个向下指示标 -->
           <div @click="handleCity">{{cityStore.cityName}}<van-icon name="arrow-down" color="black"/></div>
        </template>
        <template #right>
            <!-- 关于icon的属性设置可参考文档,这里修改了颜色 -->
            <van-icon name="search" size="18" color="black"/>
        </template>
    </van-nav-bar>

    js: setup
    import { NavBar as vanNavBar, Icon as vanIcon } from 'vant';

  ```
  - 首先文档有漏洞: 文档又少引入了van-icon的组件,用于显示右侧的搜索标志(==看报错警告也能发现!!!!==)
  - 使用了Navbar组件,在vant网站正好和indexBar挨着,==其中我们使用了"左 中 右"导航经典布局==,其中对左布局又加了个小图标组件(Icon),其余的组件改变了颜色,均来自文档的指导进行简单修改
  > ==稍微介绍Navbar组件的代码==: 最外面的`van-nav-bar`的title是导航中间的文字,内部tem#left和#right是导航左右两边的东西,左边是显示城市的,其中`{{cityStore.cityName}}`先别管,那是城市的动态显示,外加icon小图标组件和一个点击事件,右侧就是搜索的组件样式,没有深入添加功能
- **==第二步: 我们实现点击导航左部分城市,进入城市页面,这就是索引indexBar的领域了,不过首先要解决的是我们还没有写城市页面的路由组件,所以我们在views文件夹创建city.vue路由组件==**
- 先完成cinema.vue组件的跳转功能:
  ```
    tem: 
    // 我们在导航左边(#left)添加了点击事件@click="handleCity",摘录代码如下:
    <template #left>
            <!-- 额外加一个向下指示标 -->
           <div @click="handleCity">{{cityStore.cityName}}<van-icon name="arrow-down" color="black"/></div>
    </template>

    js:
    // 需要复习路由的相关知识
    import {useRouter} from 'vue-router'
    
    const router = useRouter() 
    const handleCity = ()=>{ 
        router.push('/city') // 跳到city.vue页面
    }
  ```
  > 这个点击事件作用就是帮助我们跳转到city.vue页面
- ==在制作city.vue之前,莫要忘记router需要注册==,你的'/city'地址是需要注册的,==回到router文件夹的index.js中==
  ```
    const routes = [
        .....
        {
            // 107 注册City路由组件
            path:'/city',
            name:'City',
            component: City
        },
        .....
    ]
  ```
- ==制作city.vue(在views文件夹内)==
- ==本节内容先讲解处理电影数据的问题,**在这里也出了重大失误,猫眼的数据是可以请求的**==
    ```
    js: setup
    import axios from 'axios'
    import { onMounted, ref } from 'vue';

    const datalist = ref([])

    onMounted(async () => {
        let res = await axios({
            url: "https://m.maizuo.com/gateway?k=8499442",
            headers: { // x大写
                "X-client-info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"1700392515260648680292353","bc":"110100"}',
                "X-host": 'mall.film-ticket.city.list'
            }
        })
        // console.log(res.data.data.cities)
        // 将筛选后的数据赋值给状态datalist
        datalist.value = filterCity(res.data.data.cities)
    })
    ```
    > 初步的请求数据后,对数据进行整理筛选,==首先数据是300多个乱序城市名数组,我们要把数据按A B C ... Z的26英文字母分类,每个字母对应的list数组内部是城市集合,依据拼音分类,例如"北京"在B栏==
- ==筛选前的数据:==
    [![pAy3Ehq.png](https://s21.ax1x.com/2024/11/07/pAy3Ehq.png)](https://imgse.com/i/pAy3Ehq)
- ==筛选后的数据:==
    [![pAy3njU.png](https://s21.ax1x.com/2024/11/07/pAy3njU.png)](https://imgse.com/i/pAy3njU)
- ==方法1:纯js筛选==(filterCity函数)
  ```
    const filterCity = (cities) =>{
        var letterArr = []
        // ASCII码 A(65)-Z(90)
        for(let i=65;i<91;i++){
            // js的知识 String.fromCharCode() ASCII-->字符
            letterArr.push(String.fromCharCode(i))
        }
        // console.log(letterArr)
        // 单个过滤测试 例子A
        // console.log(cities.filter(item=>item.pinyin.substring(0,1).toUpperCase()==='A'))

        // 分类并放入数组,数组是对象数组,每个字母对应一个对象,type为首字母,list内放所有的数据
        let newCities = []
        for(let i=0; i<letterArr.length;i++){
            newCities.push({
                type: letterArr[i],
                list: cities.filter(item=>item.pinyin.substring(0,1).toUpperCase()=== letterArr[i])
            })
        }
        // 过滤数据,有的首字母没有一个城市匹配,list长度为0的都会被过滤出去
        newCities = newCities.filter(item => item.list.length)
        // console.log(newCities)
        // 把数据返回出去
        return newCities 
    }
  ```
  - 第一步: 26个英文字母的数组,我们使用的是ASCII转字母,最后for循环把它放入letterArr数组
  - 第二步: 筛选并重构数组,创建新数组newCities空数组,再用for循环,往newCities内部push对象,每个对象是type和list两个属性,type是首字母A B C...Z,list是根据拼音筛选对应的城市,其中做法是"截取第一个拼音字母" + "大写" = letterArr[i] (A~Z)
  - 第三步: 过滤无效数据,比如O开头的城市一个都没有,所以对应的list为空,所以我们在请求数据的时候应该提前过滤那些没用的数据,使用filter即可,这样最后显示的数组中就没有O这一项了
  - 第四步: 返回数据,这是个函数,内部的数据是局部的,需要外部状态承接结果数据
> 
- ==方法2: lodash js库==(filterCity函数)
  ```
    // 引入lodash
    import _ from 'lodash'

    const filterCity = (cities) => {
        // 把cities的数据整理顺序
        // sort排序,正序item1-item2,倒序item2-item1,item1和2是ASCII码,需要charCodeAt()把字符传为ASCII码
        cities.sort((item1, item2) => {
            return item1.pinyin.substring(0, 1).toUpperCase().charCodeAt() - item2.pinyin.substring(0, 1).toUpperCase().charCodeAt()
        })
        // 分组 库--lodash,js升级版,内部有许多方法
        // 这里用的groupBy, 需要下载 npm i --save lodash
        // 第一个参数是数据,第二个参数是按照什么分类(箭头函数),返回值是一个全新的数组
        let groupObj = _.groupBy(cities, item => item.pinyin.substring(0, 1).toUpperCase())
        // 筛选后的数组是对象数组,每个item内部结构也是对象,为 '首字母(key): [{...},{...},{...}](城市/value)'
        // 分组会自动筛去空数据城市数据
        // console.log(groupObj)
        // Object.keys() 取对象的所有key
        // i的值顺序与初始数据有很大关系,我们对初始数据进行首字母排序
        let newCities = []
        for (let i in groupObj) {
            // console.log(i)
            newCities.push({
                type: i, // key
                list: groupObj[i] // value
            })
        }
        console.log(newCities)
        // 把数据返回出去
        return newCities
    }
  ```
  - 第一步: 下载并引入lodash库
  - 第二步: 首先对所有的数据进行排序(简单按照A-Z排序),这是因为lodash库的方法的小问题,如果没有排序,最后呈现的效果字母顺序会有点乱,使用js原生方法sort对300条城市数据的首字母进行排序,回忆sort的知识,按照ASCII排序,正序排列,看注释即可
  - 第三步: 使用lodash库的_.groupBy工具(==看文档学用法==),第一参数写数据,第二参数写排序规则(回调函数)**==其实看文档没看懂,真正内核没会==**
  - 第四步: lodash库的_.groupBy工具已经帮你排好了数据,但是真正的样式与我们所需要的不同,如下
    [![pAyY7o4.png](https://s21.ax1x.com/2024/11/07/pAyY7o4.png)](https://imgse.com/i/pAyY7o4)
  - 第五步: 创建newCities空数组,把groupObj每一项的key和其对应的value放入type和list中,提取的key的语法(for a in Obj),最后效果还是一样的,==而且这个方法会自动过滤点list为0的无效数据==
  - 第六步: 返回数据
  > 本节笔记总结:
  > 1.介绍了业务逻辑和效果图片,然后使用Navbar(vant)组件,整改后,梳理跳转逻辑,进而发现需要创建新的路由视图City.vue
  > 2.对路由Router进行注册,然后创建City.vue,并请求网络数据,重点是处理了卖座的后台数据,还没真正使用indexBar组件
### indexBar组件2
- 进一步完善city.vue的页面,上一节课我们已经获取并整理好了卖座的电影后台数据,接下来正式进入indexBar组件的使用,利用获取的卖座数据和组件渲染出一个城市通讯录
- ==indexBar样板如下图:==
  [![pAy1MFI.png](https://s21.ax1x.com/2024/11/07/pAy1MFI.png)](https://imgse.com/i/pAy1MFI)
> 
- ==经过数据渲染之后:==
  [![pAy1uTA.png](https://s21.ax1x.com/2024/11/07/pAy1uTA.png)](https://imgse.com/i/pAy1uTA)
- City.vue代码
  ```
    tem:
    <div>
        <!-- 由计算属性去完成索引标indexList的更新 -->
        <van-index-bar :index-list="indexList">
            <div v-for="item in datalist" :key="item.type">
                <van-index-anchor :index="item.type" />
                <!-- 小重点: 双v-for嵌套,和"for i {for j}",里面的遍历data和外面的item不能重名 -->
                <!-- item外层负责: 首字母type的遍历; data内层负责: 对这个字母list的进行遍历 -->
                <van-cell :title="data.name" v-for="data in item.list" :key="data.cityId" @click="handleChange(data)" />
            </div>
        </van-index-bar>
    </div>

    js:
    // 引入indexBar相关组件,文档有少了van-cell
    import { IndexBar as vanIndexBar, IndexAnchor as vanIndexAnchor, Cell as vanCell } from 'vant';
    // 计算属性,筛选首字母,这个组件不够智能,需要你自己把对应的索引传给组件(组件会死板地把26英文字母放在侧边栏)
    const indexList = computed(() => datalist.value.map(item => item.type)) // 获取筛选后的所有字母索引
  ```
  > 代码解析: 引入了三个组件
  > 第一个van-index-bar负责通讯录最右侧一列的英文字母,点击可以跳转到对应的位置,相当于通讯录的"目录";
  > 第二个组件van-index-anchor负责A B C .. Z的索引,主要是获取索引的名字,这里写的是26个大写英文字母;
  > 第三个组件van-cell负责每个通讯录内的城市名字,比如A内有什么内容
  > ==以上的代码已经动态处理过了,vant的网站有写死的代码介绍,可以更直观的了解到每个组件具体干什么==

- ==**1.小重点: vue双v-for循环**==:
    其实和我们学习C语言的双循环一样,嵌套的,一个负责外层,一个负责内层,这里负责外层的v-for是div,获取的是datalist的单项数据item,单个的item结构为
    ```
    item:
        {
            type: ...
            list: [...]
        }
    ```
    ==使用这个外层循环的是van-index-anchor组件==,它负责索引的动态绑定,根据文档,对参数index动态绑定item的type,即为`:index="item.type"`
    ==使用内层循环的是van-cell==,它负责每个分类的城市渲染,所以它的v-for落脚点是item的list数据,它要遍历list内的每一个数据,渲染当前分类的所有城市,既有`v-for="data in item.list"`,并动态绑定城市的名字`:title="data.name`
    ==外层的item和内层data就相当于C语言的i和j,所以不要重名==
    ```
        for(int i=xxx ){
            for(int j=xxx ){
                .....
            }
        }

    ``` 
- 2.==索引van-index-bar动态绑定indexList计算属性==
   筛选首字母,这个组件不够智能,组件会死板地把26英文字母放在侧边栏,所以需要你自己把删减后的新索引传给组件(之前请求数据的时候我们已经过滤了例如O开头这种无效数据了,所以索引已经少于26个字母了,如果没有给组件传递新索引值,会导致组件默认26个字母索引,而你提供给组件的数据分类却少于26个,会出bug的,具体体现在目录与内容出现偏差)
>    
- ==**接下来下处理新功能:点击对应城市后我们跳转回cinema页面**==
    - 左上角的城市变为我们所选择的城市
    - 显示的电影院也是这个选择城市的电影院,相当于动态请求了我们所点击城市的city数据
- ==**第一步**==: 在city页面记录点击的city名字和id,并传入新piniaStore文件cityStore,==这个cityStore.js专门负责处理city路由组件的相关数据==
- store文件夹内创建cityStore.js文件,代码如下
  ```
    import { defineStore } from 'pinia'
    import {ref} from 'vue'

    const useCityStore = defineStore("city", () => {
        // ref包装 = state
        const cityName = ref("北京")
        const cityId = ref(110100)
        // 函数 = Action
        // change会传入新的城市名name和城市的id
        const change = (name,id)=>{
            cityName.value = name
            cityId.value = id
            // console.log( cityName.value, cityId.value )
        }

        return{ 
            cityName, 
            cityId,
            change
        }
    })

    // 记得导出
    export default useCityStore
  ```
  > 这个store有个change函数,会接受传递过来的2个形参,代表城市的名字和id,并把这个形参的值存储到状态中保存起来,==日后必有大用==
- 所以承接上面,在city.vue中,对每个城市设置点击事件,引入cityStore,每次点击后,给这个store的change函数传递当前点击城市cityName和cityId
  ```
    tem:
        // 我们传进去的形参data,是来自item.list的数据,就是看看上面的双v-for循环小重点,这个data正是list中每个城市的详细数据(其中就有cityName和cityId这两个关键信息)
        <van-cell :title="data.name" v-for="data in item.list" :key="data.cityId" @click="handleChange(data)" />

    js:
        // store相关知识:
        // 引入city组件
        import useCityStore from '../store/cityStore';
        // 使用city组件
        const store = useCityStore()

        // 把获取的形参解构了
        const handleChange = ({name,cityId})=>{
            // console.log(name,cityId)
            // 调用store,向内部的change函数传入name和cityId数据
            store.change(name,cityId)
            // 返回城市筛选页面
            router.go(-1)
        }
  ```
  > 通过事件传参,我们的cityStore.js获取了当前点击城市的名字和id,接下来城市名字用来更改cinema.vue页面左上角的城市名,id用于CinemaStore.js请求网络数据是传递城市的参数
  > 看代码: 点击完后先向cityStore.js传递形参,在回退到cinema页面`router.go(-1)`
- ==CinemaStore.js(内部的网络请求我已经改为axios向卖座后端请求的格式了)==
  ```
    // 新知识: pinia: 在一个store中引入另一个store的数据
    import useCityStore from './cityStore'
    // 直接调用,直接创建,直接使用,十分简单
    const cityStore = useCityStore()

    // 请求cinema.vue页面的电影院后端数据 
    const getCinemaList = async()=>{
        // 107 来报: 正式使用卖座可以请求数据
        let res = await axios({
            // 网络请求是携带对应的cityId数据, ES6`` + ${}
            url: `https://m.maizuo.com/gateway?cityId=${cityStore.cityId}&ticketFlag=1&k=8814`,
            headers:{ // 大写X
                "X-client-info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"1700392515260648680292353","bc":"110100"}',
                "X-host": 'mall.film-ticket.cinema.list'
            }
        })
        cinemaList.value = res.data.data.cinemas
    }
  ```
  - ==新知识: 在pinia中从一个store中引入另一个store的数据==
  - ==直接调用,直接创建,直接使用,十分简单(**看代码**)==
  - ==cityId的用处==: 我们从CinemaStore.js中获取了来自cityStore.js的cityId数据,==**这个cityId会作为请求链接的参数发送网络请求,认真看axios的url代码**,ES6模板字符串\`\`和\${}的组合,**动态地把每一次的cityId放入url,从而实现动态地请求不同城市的电影院后端数据**==
- cinema.vue(最后完善电影页面)
  ```
    tem:
        <template #left>
           <div @click="handleCity">{{cityStore.cityName}}<van-icon name="arrow-down" color="black"/></div>
        </template>

    js:
        // 引入cityStore
        import useCityStore from '../store/cityStore';
        // 使用cityStore内部数据
        const cityStore = useCityStore()
  ```
  > 完善了左上角的城市名字,动态化了
- 最后一个问题,之前我们为了实现数据缓存(即从别的页面切到电影页面不会重复进行网络请求,而是把数据缓存到本地,这样减少了服务器的压力)
- ==问题:== 看看处理缓存问题的源码
  ```
    js:
        onMounted(() => {
            if (store.cinemaList.length === 0) {
                // 请求数据,带着影院数据 cityId请求对应城市的数据
                store.getCinemaList() // 直接调用CinemaStore.js的action方法
            } else {
                console.log("缓存")
            }
        })
  ```
- 源码意思是,只有store.cinemaList数据为空时,才会执行CinemaStore.js中的getCinemaList函数(==这是我们请求电影院数据的函数,也是动态改变电影院数据的关键==),所以如果不做任何更改,那么在初始化时,我们自动请求数据,比如北京的电影数据后,如果不清除缓存,就无法执行store.getCinemaList()请求新的电影数据,但是如果删除缓存判断,又会造成服务器压力大
- ==解决:== 只有从city页面回到cinema页面会清除缓存(cinemaList数组清空),从其他页面,比如 电影(Film.vue),我的(Center.vue) 页面跳转到cinema页面不会清空缓存,==那么我们需要在跳去city页面后清空cinema页面的缓存,如下==
- cinema.vue
  ```
    const handleCity = ()=>{
        router.push('/city') // 跳到city.vue页面
        // 清空缓存,一会从city页面回来时,又可以请求新的数据了
        store.clearCinemaList() // store指的是CinemaStore.js
    }
  ```
- CinemaStore.js(==clearCinemaList()函数==)
  ```
    // 清缓存函数
    const clearCinemaList = ()=>{
        cinemaList.value = []
    }
  ```
  > 清空cinemaList数组后,再回到cinema页面,在执行if()缓存逻辑判断时,就可以请求新的数据了

- **==至此所有的内容完毕,下面是总结!!!==**
- 1.cinema的Navbar组件样式和动态化显示(来自cityStore.js的相关数据)
- 2.city.vue的创建(选择城市的页面),使用了indexBar组件,请求所有城市的数据后,对城市数据进行了分类整合,有纯js方法和lodash库两个方法,随后使用indexBar组件结合我们筛选分类后的数据进行页面渲染(tem有个双v-for循环)
- 3.在city页面选择城市时记录城市的数据(name和id),这又创建了cityStore,处理记录城市的相关数据,供别的组件和store使用
- 4.更新axios请求数据时,新知识,pinia的store之间的引用,CinemaStore.js引入了cityStore.js的相关数据,用于动态请求新的电影数据,发送新的城市数据请求,一会回退到cinema页面时,能动态化显示新城市的电影院数据
- 5.处理了cinema页面跳转的缓存问题,添加了由cinema页面跳到city页面时清空缓存的操作

## elementPlus组件库(PC端)
- 安装elementPlus组件: `npm install element-plus --save` (==多看文档学习ele的更多用法==)
- 简单的使用ele组件,首先全局注册,引入所有组件(main.js)
- 效果是: 这样子在所有的组件中都可以直接使用ele组件
- ==main.js==
  ```
    // 6-elementPlus
    import { createApp } from 'vue'
    import './style.css'

    // 全局引入ele,所有组件随意使用ele组件,直接用
    import ElementPlus from 'element-plus'
    import 'element-plus/dist/index.css'
    import App from './6-elementPlus/App.vue'
    import router from './6-elementPlus/router'
    import { createPinia } from 'pinia'

    const pinia = createPinia()

    var app = createApp(App)
    app.use(router) // 固定的,注册路由插件
    app.use(pinia) // 注册pinia
    app.use(ElementPlus) // 全局注册ele
    app.mount('#app')
  ```
- 我们修改了6-elementPlus的结构,除了留下views的Notfound路由组件,其余全删除,并添加Home,NewList,AddList三个新的路由组件,删除vant,store等文件夹和内容,删除components的Tabbar组件,删除router内部index.js对于前路由组件的注册,并注册新的三个路由组件,把Home页面设置为默认页面
- ==Home.vue==
  ```
    <template>
        <div>
            home
            <!-- 全局注册ele,所以直接使用ele组件即可 -->
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </div>
    </template>
  ```
### elementPlus基础组件
- 做一个新闻后台管理系统,首先在container布局容器里挑选一个喜欢的样式,然后进行适当删减,重新构建内部数据,同时看不懂的组件可以查询文档说明,如下
  ```
    <template>
        <!-- 根组件,我们设置占全屏高度 100vh -->
        <el-container class="layout-container-demo" style="height: 100vh">
            <!-- 测边栏 -->
            <el-aside width="200px">
                <!-- 侧边滚动 -->
                <el-scrollbar>
                    <!-- 遇到猜不到的标签,去官网ctrl+f搜索menu组件的说明 -->
                    <!-- Menu Attributes的router说明: 启用该模式会在激活导航时以index作为path进行路由跳转  -->
                    <!-- default-active: 页面加载时默认激活菜单的 index -->
                    <el-menu :router="true" :default-active="route.fullPath">
                        <!-- index string 唯一标识,建议弄成路由地址,方便跳转(一鱼两吃,即唯一标识,也提供路径) -->
                        <el-menu-item index="/home">
                            <el-icon>
                                <!-- 小图标,在ele中图标组件不会被引入,所以记得按需引入,在script内部 -->
                                <HomeFilled />
                            </el-icon>
                            <span>首页</span>
                        </el-menu-item>
                        <!-- 展开菜单 el-sub-menu -->
                        <el-sub-menu index="/news">
                            <template #title>
                                <el-icon>
                                    <message />
                                </el-icon>新闻管理
                            </template>
                            <!-- 展开内容 el-menu-item -->
                            <!-- 下拉菜单命名尽量体现出二级/父子的关系 -->
                            <el-menu-item index="/news/addnews">创建新闻</el-menu-item>
                            <el-menu-item index="/news/newlist">新闻列表</el-menu-item>
                        </el-sub-menu>

                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-container>
                <!-- 顶栏 -->
                <el-header>
                    <div>新闻管理系统</div>
                    <div>欢迎回来</div>
                </el-header>
                <!-- 主要内容区 -->
                <el-main>
                    <el-scrollbar>
                        <!-- 显示自己的路由 -->
                        <router-view></router-view>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>

    </template>

    <script setup>
        import { Menu as IconMenu, Message, Setting, HomeFilled } from '@element-plus/icons-vue'
        import { useRoute } from 'vue-router'

        const route = useRoute() // 获取当前路由的信息,其中路径信息存在fullPath里面
        console.log(route) // 直接打印route.fullPath是没有的,因为js立即执行,所以还没匹配上就打印了,即'/'

    </script>

    <style>
        /* App全局影响,取消默认样式 */
        * {
            margin: 0;
            padding: 0;
        }
        .el-header{
            background-color: aqua;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
        }
    </style>

  ```
- ==下面的都可以根据文档查询学习,这里说明是为了更好的复习==
  - ==简单介绍布局:== 
    - el-container 根组件
    - el-aside 侧边栏(左侧)
    - el-container 主要内容区(右侧) 内含el-header(顶栏)和el-main(内容区)
  - ==简单组件介绍==
    - el-scrollbar 滚动条
    - el-menu 菜单
    - el-menu-item 普通菜单
    - el-sub-menu 下拉菜单,内部可以放普通菜单,结合`<template #title></template>`使用
    - el-icon 图标使用组件,内含图标组件,例如`<HomeFilled />`(==图标组件需要引入,import {HomeFilled} from '@element-plus/icons-vue'==)
- **==重点:==**
- 菜单部分:
  - el-menu内部的所有菜单都有index属性(String),在文档中说明这是唯一标识符,==建议弄成路由地址,方便跳转(一鱼两吃,即唯一标识,也提供路径)==
  - ==el-menu的属性router: 文档Menu Attributes的router说明: **启用该模式会在激活导航时以index作为path进行路由跳转**==
  - ==default-active: 页面加载时**默认激活菜单**的 index,即index是什么就调到哪里去==
  - ==index命名潜规则==: 涉及二级菜单的,父子关系的,尽量渐进式的命名,如代码上面的news下的/news/addnew和/news/newlist(**记得router的index注册表跟着改了**)
  - 如何获取当前点击位置的路由地址: 旧知识 useRoute
    ```
        js: setup
        import { useRoute } from 'vue-router'

        const route = useRoute() // 获取当前路由的信息,其中路径信息存在fullPath里面
        console.log(route) // 直接打印route.fullPath是没有的,因为js立即执行,所以还没匹配上(速度慢)就打印了,即'/'
        // 把route.fullPath动态绑定给default-active即可
    ```
    > 这样即使刷新也不会影响到侧边栏,它不会重置
  - 自己的内容显示在哪? 侧边栏是el-side,咱们自己的路由组件要显示子在el-container的el-main内部,==**记得给上路由插槽位置`<router-view></router-view>`**==
> 
- ==改style样式:== 直接改,人家为了让你方便改样式,直接把class名字和组件名字同步了
> 
- ==轮播图(在文档中叫走马灯)和24栏: Home.vue内部==
  ```
    <template>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>

        <!-- 24栏 layout布局 -->
        <el-row>
            <!-- 注意:没有响应式布局,当宽度小于一定程度时内部内容会溢出 -->
            <!-- 一人8分,即3/1 -->
            <el-col :span="8">
                <div>个人介绍</div>
            </el-col>
            <el-col :span="8">
                <div>公司介绍</div>
            </el-col>
            <el-col :span="8">
                <div>公司产品</div>
            </el-col>
        </el-row>
    </template>

    <style scoped>
        .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
            text-align: center;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
        }
    </style>
  ```
> ==轮播图:== 直接使用即可,内部由许多的样式,至于内容替换成你自己想要的即可
> ==24栏:== 就是把100vw分成24份,你可以随意搭配每个栏的长短,不再需要设置width: 33.3% 等烦人的css样式了,**最后注意,24栏没有响应式布局,当宽度小于一定程度时栏内内容会溢出**

### elementPlus表单组件
- 表单只留下了部分数据,均来自模板
  ```
    <!-- form表单组件 -->
    <template>
        <!-- :model记录form表单信息,form在下面是个对象 -->
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="新闻标题">
            <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="新闻分类">
            <el-select v-model="form.category" placeholder="请选择分类信息">
                <el-option label="经济" value="经济" />
                <el-option label="明星" value="明星" />
                <el-option label="科技" value="科技" />
            </el-select>
            </el-form-item>
            <el-form-item label="新闻内容">
            <el-input v-model="form.content" type="textarea" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </template>

    <script setup>
        import { reactive } from 'vue'
        import useNewStore from '../store/newStroe'; // 引入useNewStore
        import {useRouter} from 'vue-router'

        const router = useRouter()
        // 响应式 和model绑定了
        const form = reactive({
        title: "",
        category: "",
        content: ""
        })
        // 提交pinia临时存储数据,就不给后端发信息了,太麻烦了,不过刷新数据就会丢失了
        // 这里就涉及一个地址传参和值传参的问题,在newStroe.js文件中看看
        const newStore = useNewStore()

        const onSubmit = () => {
        console.log('提交数据给后端', form)
        newStore.add(form) // 存储数据到newStore中
        router.push('/news/newlist') //跳到新闻列表页面
        }
    </script>
    ```
- 由几个简单的板块组成: 
    - el-form: 表单根组件,:model="form"的form记录所有表单信息,新闻标题title,新闻分类category,新闻内容content,已经创建reactive型状态
    - el-form-item: 普通表单框,v-model="form.title"(==记录title信息==)
    - el-form-item + el-select(v-model="form.category"==记录分类信息==) + el-option: 可选择的表单框
    - el-input: v-model="form.content" (==记录内容==)
    - el-button: 按钮组件,挑选了2个好看的按钮样式
- ==onSubmit函数: **提交pinia临时存储数据,就不给后端发信息了**==,太麻烦了,不过刷新数据就会丢失了
  - newStore.add(form): 调用newStore的add函数,传入数据
  - router.push('/news/newlist') 跳去新闻列表页面,==这是index命名潜规则==
- **这里就涉及一个地址传参和值传参的问题,在newStroe.js文件中看看**
- ==newStore.js==
  ```
    import { defineStore } from 'pinia'
    import {ref} from 'vue'

    const useNewStore = defineStore("news", () => {
        // ref包装 = state
        const list = ref([])
        // 函数 = Action 存信息
        const add = (value)=>{
            // list.value.push(value)
            // 在测试中,注意,每次传进来的是一个钥匙,指向form这同一个内存
            // 产生问题: 每次我们修改form添加进去,之前所有已经在list内部的数据都会变成这个新提交的数据
            // 原因: list内部都共用一把钥匙,内存数据变化,所有已经添加进入数组数据跟着变,都长一样的
            // 解决: 结构赋值,把穿过来的内容解构赋值给新对象(大家的钥匙各不相同了,对象是复杂数据,独一无二),加入list数组
            list.value.push({...value})
        }

        return{ 
            list, 
            add
        }
    })

    // 记得导出
    export default useNewStore
  ```
  > 总结: ==重点学习表单组件的简单用法==,**认识到值传参和地址传参的区别,在传递复杂数据时要有这个意识**
### elementPlus表格组件
- 均来自模板复制,略微改造
  ```
    <!-- Table 表格组件 -->
    <!-- 自定义列模板: 网站提供了自定义功能,插槽 -->
    <template>
        <el-table :data="newStore.list" style="width: 100%">
            <!-- prop的作用是把tableData的title信息都放在列表的标题(label)列,很重要 -->
            <!-- #default="scope" 插槽作用域问题,复习,使得插槽代码可以突破作用域获取父组件的内容  -->
            <el-table-column label="标题" width="180">
                <!-- 插槽 -->
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <b style="margin-left: 10px; color: red;">{{ scope.row.title }}</b>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="category" label="分类" width="180" />
            <el-table-column prop="content" label="内容" />

            <el-table-column label="操作" width="180">
                <!-- 插槽 -->
                <template #default="scope">
                    <el-button type="primary" round @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" round>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>

    <script setup>
        import useNewStore from '../store/newStroe';
        const newStore = useNewStore()
        // 直接在表单中使用了,在:data属性中

        const handleEdit = (data) => {
            console.log(data)
        }


        // tableData就是以后我们做项目时从后端传过来的数据 axios
        // const tableData = [
        //     {
        //         date: '2016-05-03',
        //         name: 'Tom',
        //         address: 'No. 189, Grove St, Los Angeles',
        //     },
        //     {
        //         date: '2016-05-02',
        //         name: 'Tom',
        //         address: 'No. 189, Grove St, Los Angeles',
        //     },
        //     {
        //         date: '2016-05-04',
        //         name: 'Tom',
        //         address: 'No. 189, Grove St, Los Angeles',
        //     },
        //     {
        //         date: '2016-05-01',
        //         name: 'Tom',
        //         address: 'No. 189, Grove St, Los Angeles',
        //     },
        // ]
    </script>

  ```
- 组件简单介绍:
  - el-table: 根组件,:data="newStore.list"放数据的地方,是列表的数据来源
  - el-table-column: 表格列,==label是列名==,会把数据中对应类型的数据放在这一列,==内部放插槽template #default="scope",**自定义数据+突破插槽作用域(获取父组件的用户信息)**==,内部放标题数据
  - 最后加了2个el-button,和上面一样,插槽+作用域跨级获取父信息,象征性地添加了事件和执行打印信息的功能
> 总结: 获取来自newStore的信息,然后动态添加到列表中,实现表单向newStore添加数据,列表从其中获取数据,在项目里,代替store的角色就是数据库

## swiper与vue
### swiper的基本应用
- 我们本节课学习了基本的swiper应用,==内容全在public/html/058test.html内部了,html文件在静态资源库pubilc==,直接访问: localhost:5173/html.058test.html 即可
- ==本次使用swiper的本地文件,即把代码复制到本地==
- 基本使用:
  - 1.引入swiper的css和js
  - 2.按照模板写html(==特别是结构和class名字,这是基石==)
  - 3.==配置Swiper的对象(new Swiper(...))==,内部有许多属性和功能,按照文档提示写,在官方中,有演示区,我们发现新的分页器样例时,打开新窗口显示,查看源代码,看看多了什么代码,然后可以查询其API,看看作用,复制过来用一下,测试效果
  - 4.最后swiper的html内容也不是写死的,我们可以模拟ajax请求去动态实现一个轮播图,也就是接下来的案例代码
- 案例(综合基本使用的四步)
  ```
    <!-- 引入项目组中的css js文件(swiper) -->
    <link rel="stylesheet" href="/lib/swiper.css">
    <script src="/lib/swiper.js"></script>
    <!-- 1.添加基本的css样式 -->
    <style>
        .swiper {
            width: 600px;
            height: 300px;
        }
    </style>

    <body>
    <!-- 2.class名字和结构需要留着,这是响应css和js的html结构 -->
    <div class="swiper">
        <!-- 轮播几页东西 -->
        <div class="swiper-wrapper">
            <!-- 轮播内容不是写死的,全注释了 -->
            <!-- <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div> -->
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>>
    </div>

    <script>

        function init() {
            var mySwiper = new Swiper('.swiper', {
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },

                // 3.我们发现新的分页器案例时,打开新窗口显示,查看源代码,看看多了什么代码,然后可以查询其API,看看作用,复制过来用一下
                // slidesPerView: 3,
                // spaceBetween: 30,
                // centeredSlides: true,

                // 官方网站中 在API文档(有很多别的方法)/事件/Event/sliceChange(swiper) 如下,可以获取当前页的下标,从0开始,和loop结合有BUG
                on:{
                    slideChange: function () {
                        console.log('改变了,activeIndex为',this.activeIndex);
                    }
                }
            })
        }

         // 4.模拟ajax,请求数据,1.5s后动态更改分页内容
        setTimeout(() => {
            var list = ["111", "222", "333"]
            var newList = list.map(item => `<div class="swiper-slide">${item}</div>`)
            console.log(newList.join(""))

            var owrapper = document.querySelector(".swiper-wrapper")
            owrapper.innerHTML = newList.join("")
            // 异步的,填充完内容后在进行初始化,否则初始化速度会快于填充内容,造成无内容显示
            init()
        }, 1500)

    </script>
  ```
    > 注意: ==(模拟)ajax请求是异步的,所以我们要等待请求完数据后再进行new Swiper渲染==,所以包装进init函数,请求后调用init()
### swiper与vue
- 在我们收藏的Swiper中文网站中,我们有 "==开始使用,Swiper核心/API,Swiper Element/Swiper React/Swiper Vue=="
- ==**开始使用**:== 教你如何在项目中使用swiper,比如在vite中,按照里面文档结合目前的swiper11,可以正常使用
- ==Swiper核心/API==: 单纯讲swiper11的所有API,不会的属性可以去查,当然直接在搜索框里查更快
- ==Swiper 元素(Element)==: 一个新型框架
- ==Swiper React==: swiper与react框架结合
- ==Swiper Vue==: **基于vue的swiper组件,就和我们学的自定义组件一样,人家用底层的swiper封装了一个组件,==下一节swiper组件组装,我们也封装一个自己的简单组件==**
- ==重点在于引入swiper进入vite项目==:(根据"开始使用"文档我们选择导入带有所有模块,一般用多少导入多少,按需导入这里省事)
  ```
    import Swiper from 'swiper/bundle';
    import 'swiper/css/bundle';
  ```
- 其余的一样了,正常使用swiper即可,html进入template,==引入和创建new swiper写进mounted函数(即dom创建完了再swiper渲染),也是为了防止updated重复渲染,还是把swiper拿出了updated,放入mounted里了==,css放style里
- 代码:(==迁移swiper基本应用案例的代码进入vite项目==)
  ```
    <template>
        <!-- class名字和结构需要留着,这是响应css和js的html结构 -->
        <div class="swiper">
            <div class="swiper-wrapper">
                <!-- Slides : 结合vue动态绑定 -->
                <div class="swiper-slide" v-for="data in datalist" :key="data">
                    {{ data }}
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </template>

    <script>
        import Swiper from 'swiper/bundle';
        import 'swiper/css/bundle';

        export default {
            data() {
                return {
                    datalist: []
                }
            },
            //dom创建好再给配swiper样式
            mounted() {
                // 模拟ajax
                setTimeout(() => {
                    // 更新datalist后不能马上更新dom,要在updated之后
                    this.datalist = ["111", "222", "333"]
                    this.$nextTick(() => { // 只能用一次,之后再改也不好用了,如果再改一次就在跟一个nextTick
                        var mySwiper = new Swiper('.swiper', {
                            loop: true, // 循环模式选项
                            observer: true, // 解决nextTick一次性问题
                            // observer API官方文档作用摘录: 如果你更改swiper 的样式（隐藏/显示）或修改其子元素（添加/删除幻灯片），Swiper 会更新（重新初始化）并触发 observerUpdate 事件,默认 false ，不开启动态检查器，此时可以使用 update() 方法手动更新。
                            // 按道理这样我们创建swiper可以不必关心datalist的变化了,像放哪都行,但是由于轮播循环底层js代码的问题,如果不这样写,会出BUG,除非你没有循环样式,那样随便
                            // 这个底层js代码,我们之前写过轮播图的js代码,即实现循环需要第一页和最后一页连接,所以必须要有轮播内容初始化,没有初始化何来第一页与最后一页,所以在初始化后,即datalist不为空之后我们new Swiper + 循环loop时才会正常
                            // 不过这个observer也解决了一个问题,那就是nextTick一次性的问题,后续更改swiper样式的变化都交给observer去监听了,不过它还是要写的,因为第一次数据更新,需要常规nextTick去解决,它的周期在updated之后,且会响应一次(只有一次)datalist的变化,调用new Swiper完成数据的初始化(从无到有),杜绝了空datalist造成的new Swiper + 循环loop的BUG

                            pagination: { // 如果需要分页器
                                el: '.swiper-pagination',
                            },
                            // 和循环在一起出BUG
                            // on: {
                            //     slideChange:  function() {
                            //         console.log('改变了,activeIndex为', this.activeIndex);
                            //     }
                            // }
                        })
                    })
                }, 2000)
            },
            updated() { // 为了防止改数据频繁调用updated,我们再次用nextTick,给拿走

            },
        }
    </script>


    <style>
        .swiper {
            width: 600px;
            height: 300px;
        }
    </style>

  ```
    > ==1.重点看下原swiper从html文件进入项目vite文件vue过程中的代码分配工作,看看位置变化==
    > ==2.思考new Swiper的位置为何不在updated里面,上面有答案==
    > ==3.swiper 新API observer与loop的局限,对nextTick的改善,以及有observer的swiper初始new为何还要限制在nextTick内,没有自由身,**均在注释中**==
### swiper组件组装
- 官方基于swiper底层封装了一个组件swiper Vue,那么我们也封装一个简单的,基于swiper的组件myswiper
- 本次封装基于最大化方便使用
  - 组件1 Myswiper 来自 myswiper.vue 起作用是完成swiper的核心创建,以及接受属性完成部分功能的用户自定义
  - 组件2 Myswiperitem 来自 myswiperitem.vue,只是帮你写好了基础的div和class名字
- 代码: App(==父,引入了两个组件==)
  ```
    tem:
    // 组件名字为Myswiper,往里面子父互传,父传子(:)指导swiper组件格式,子传父(@)返回分页器的一些数据,比如现在分页器到第几页了
    <Myswiper v-if="datalist.length" :slides-per-view="3" :space-between="50" :loop="false" @kerwinSildeChange="handleChange">
            // Myswiperitem帮你写好了div和class
            <Myswiperitem v-for="data in datalist" :key="data"> {{ data }} </Myswiperitem>
    </Myswiper>

    js:
    mounted() {
        // 模拟ajax 2s后再给数据
        setTimeout(()=>{
            this.datalist = ["111","222","333","444","555"]
        },2000)
    }
  ```
- Myswiperitem组件(==固定好的div和class==)
  ```
    <template>
        <div class="swiper-slide">
            <slot></slot>
        </div>
    </template>
  ```
- Myswiper(组件核心)
  ```
    tem: 
    // swiper固定的class格式
    <div class="swiper">
        <div class="swiper-wrapper">
            <!-- 插槽: 提高组件的复用性,父App使用组件时直接往里塞数据即可 -->
            <slot></slot>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>

    js:
    props: { // 接受父传子的信息,并规定样式
        loop: {
            type: Boolean,
            default: true
        },
        // 带-的属性要么加引号要么驼峰
        slidesPerView: { // 显示几页内容
            type: Number,
            default: 1
        },
        spaceBetween: { // 页间距px
            type: Number,
            default: 0
        }
    },
    mounted() {
        // 在updated中会因为多次初始化出BUG
        var mySwiper = new Swiper('.swiper', {
            // 接受props的值(来自父的自定义值)
            loop: this.loop,
            observer: true
            slidesPerView: this.slidesPerView,
            spaceBetween: this.spaceBetween,

            pagination: { // 如果需要分页器
                el: '.swiper-pagination',
            },
            on: {
                slideChange: ()=>{
                    this.$emit("kerwinSildeChange",mySwiper.activeIndex)
                }
            }
        })
    }

    css: 给分页器设置点css样式,起码有大小
    <style>
        .swiper {
            width: 600px;
            height: 300px;
        }
    </style>
  ``` 
  - ==代码解析:==
  - 问题1: 我们之前遇到的数据还未生成就new Swiper的问题依旧存在,那么我们如何解决?
    - ==首先解决的核心这次不再组件内部了,我们也没有使用nextTick,由此我们有了个新的解决方法,**就是在组件添加v-if语句,检测datalist的长度,如果为空,直接不创建组件,不为空再创建组件,由于new Swiper操作在组件里,所以这一定保证了先有数据后有swiper样式**,同时我们把new swiper放入mounted,因为在updated中,一旦数据更新就会重新执行一遍new Swiper,而多次初始化swiper会造成样式BUG==
  - 问题2: 在@子传父的on方法里面,我们把源代码"on + func"组合改为了"on + 箭头函数组合",并把里面的代码也改了点,==**这里涉及2个this的问题**==
    - 1.第一个是this.\$emit(): 使用\$emit方法时,this指向要求是和mounted同级的,也就是指向这个组件的,但是原方法是function写法,这样this指向的是mySwiper,如此我们把其改为箭头函数即可解决,对于箭头函数的this指向如果不懂可以看看ES6的箭头函数内容(js)
    - 2.问题又来了,第二个this问题,在没改变的function格式下,源代码为this.activeIndex,说明这个activeIndex是属于mySwiper的,但是改为箭头函数后,this不再指向mySwiper,所以写成mySwiper.activeIndex
  - ==总结==: 组件的封装通过父传子(:)指导swiper组件格式,子传父(@)返回分页器的一些数据,比如现在分页器到第几页了,实现了组件的自定义自由性,==而插槽则提高了组件的可复用性,我们接着把猫眼的数据插入插槽来测试数据==
- 猫眼案例:(App)
    ```
    tem:
        <Myswiper v-if="datalist.length" :slides-per-view="3" :space-between="50" :loop="false" @kerwinSildeChange="handleChange">
        <Myswiperitem v-for="data in datalist" :key="data.id"> 
            <!-- {{data.nm}} -->
                <!-- 图片本身大小不同,显示出来大小也会有所不同 -->
            <img :src="data.img" :alt="data.nm" style="width: 100%;">
        </Myswiperitem>
    </Myswiper>

    js:
    mounted() {
        // public/lib的猫眼数据
        // 自己电脑上请求数据,没有跨域,可以不写域名
        axios.get('public/lib/054test.json').then(res=>{
            console.log(res.data.data.hot)
            this.datalist = res.data.data.hot
        })
    }
    ```
  - 总结: 请求猫眼的数据,使用v-for把数据插入插槽,配置好swiper样式,主要显示的图片
