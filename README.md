# CodeTracker

## a wakatime client

可视化展示编码活动

![图标](./resources/ios/icon/icon-40%403x.png)

## [What is WakaTime?](https://wakatime.com/about)

**WakaTime**是个全自动化的时间追踪工具,依赖于大量的IDE插件及文本编辑器，可以对我们从事coding活动所花费的时间进行可视化展示，让你明白在那些时间里，都做了什么。

## [What is CodeTracker?](http://1991421.cn)

**CodeTracker**是利用wakatimek开放的API，结合混合开发技术开发的APP,实现移动端可视化显示wakatime对于coding统计。
用开源的技术做开发的事，一方面练习技术，解手痒，一方面满足自己或者有同类需求的友人。

时间匆匆流逝，其实我们做技术的更需要利用技术来了解自己的情况，而wakatime是个很好的工具，个人特别喜欢!


## resources:

- [ionic2(v3)](https://github.com/driftyco/ionic)
- [angular4](ttps://angular.io/)
- [echarts](http://echarts.baidu.com/)
- [WakaTime-API](https://wakatime.com/developers)
- [ionic2-auth0](https://auth0.com/docs/quickstart/native/ionic2)


------
## 涉及技术点

+ ionic2使用(menu,tabs,nav,native-plugins,http)
+ CORS,跨域问题,chrome需要安装[插件Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)
+ 集成echarts
+ 微信分享

## Commands

```
# 初始化开发环境

npm install -g ionic cordova

npm i

# 浏览器运行
ionic serve

# 构建打包
ionic cordova build android --prod 

# 开发环境真机运行
ionic cordova run android --livereload -c -s

# 模拟器运行
ionic cordova emulate ios --livereload -c -s

```
## 入驻商店

+ [腾讯应用宝](http://a.app.qq.com/o/simple.jsp?pkgname=cn.he.codetracker)