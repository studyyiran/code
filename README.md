目录结构
    pages
    components
    context(store)
    server(api)
    
common
    放一些全局性的内容,例如样式.

router 
    rr-5 use relative router.

hocWithLayout：
    提供了header和footer配置的hoc

documentTitle
    传入title，设置title的hoc


入口文件


css预处理器
    less

webpack
    webpack.config.js
    1)less

lint
    use eslint(eslintrc.json) and typescript(tsconfig)

UI-lib
    antd 按需加载: javascriptEnabled


css命名
    页面 -page结尾 product-list-page
    less内部有不同的模块 包括 mixin color 等

iconfont
    在public中引入。使用Svg组件引用
    
响应式部分的代码
    1）rem 100vw / 37.5.在index中设置
    2）globalSettingContext中，监听window大小，设置isMobile变量，作为js mobile端操作的环境变量。
    3）main.less中，有.hello()mixin 来做响应式的样式计算。
    4）700px以下，添加isMobile的样式。main.less 和 globalSetting都会用到700这个数值
    
Axios
    通过ajax.get 发起请求.参数和Axios保持一致.
    url前面可以加共有的host.
    
    报错处理:
        正常下.code=200
        当code非200的时候,reject打出去.需要在调用处拦截.(页面作死页面拦截.context使用context负责拦截.)
        然后冒泡上去.这样可以保证一致性.
    
context中的细节
    useRef.我们有时需要监听action的情况,这时候,可以利用useRef封装一个不可变的,即时生效的instance变量.这样,我们外部就能跨越时间和空间,拿到
    当下的promise情况了.


ssr part
  ssr的核心是，html拿到的内容，在load下来的时候，就是丰满的，里面有node给我们的大量信息。

  以首页为例。
  node
  在渲染的时候，会在外面形成一个环境，如果整个App依赖于一个状态树。那么，初始状态 + 环境变量 + 服务器数据 = render
  我们在首页的ssr文件中，在node端发起请求。他获取到了他所需要的内容，然后忠实的完成渲染。
  他返回给client就是，
  1）数据（放到了数据store中被一同返回）
  2）首屏界面

  多仓库问题。
  当需要回补的数据来自于多个仓库的时候，不可避免的，就需要去多个store进行设置。
  例如：项目中在进行服务端渲染的时候，通过设置isMobile到全局，进行判定，就是利用了一个globalSetting仓库。

  交合问题。
  当回来的数据，被client端重新拉取（不管是不是相同的参数），就形成了交合。
  交合分为替换和累加。大部分时候，者都会造成数据冗余。

  渲染不同步问题。
  一个设计良好的app，只要数据一样，他的渲染必然一样。
  但是有一些地方处理不当容易出错。

  getinitialprops
  这个方法会在浏览器和客户端同时运行。


  容易出错的地方
  1）window等浏览器才有的方法
  2）dom节点的差异。导致无法获取到正确的dom节点。




请求流
  整个app是流是应用。尽量避免声明式请求。全部都是对数据变更发生次生效应。
  相关流程图（https://zhuanlan.zhihu.com/p/88487121）



请求报错和全局loading
  目前loading和蒙层，都是被特定的请求参数所依赖，所触发。
  
  
路由
    我们使用了rr5 配合.
    routers文件:描述了路结构(Layout,hoc)
    routerConfig:用于map渲染.这样分离对于前后端很有必要
    
    
静态文件
    static: static