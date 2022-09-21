<center><h3>自定义登录页使用帮助文档</h3></center>

1. table.json配置文件详解

```json
{
  "data":{
    //logo图片URL地址
    "logo_path":"https://file.qingflow.com/assets/logoBlack.png",
    //用户相关信息
    "userData":{
      //用户的姓名[标识]
      "username":"QingFlow",
      //用户选择正在使用的轻流的版本
      "useQingFlowVersion":4.3
    },
    "styleData":{
      //logo位置 居中：qf-logo_center 居左：qf-logo_left
      "qf_logo":"qf-logo_center",
      //登录框位置 居中：ms-login 居左：ms-login_left 居右：ms-login_right
      "qf_login":"ms-login_right",
      //底部域名备案位置 居中[OnlyRead]
      "qf_footer":"footer-bottom-center-up",
      //登录方式 账号密码登录：passport 单点登录：sso 账号密码和单点登录：passportsso
      "login_type":"passport",
      //注册忘记密码显隐 显示：1 隐藏[默认]：2
      "login_tips":"2",
      //底部域名备案显隐 显示：1 隐藏[默认]：2
      "login_footer":"2",
      //该环境下home页面地址[⭐️⭐️需要手动配置⭐️⭐️]
      "homeUrl":"https://play.qingflow.com/arch/home",
      //environment.js文件中的versionPrefix[⭐️⭐️需要手动配置⭐️⭐️]
      "qflowType":"prod",
      //environment.js文件中的tokenDomain[⭐️⭐️需要手动配置⭐️⭐️]
      "qflowDomain":"play.qingflow.com",
      //自定义登录页配置按钮显隐 显示：1 隐藏：2
      "settingHide":"1"
    },
    //背景图片的URL地址[最多可配置5项]
    "backgroundImg":[
      "https://w.wallhaven.cc/full/9m/wallhaven-9mjoy1.png",
      "https://w.wallhaven.cc/full/6o/wallhaven-6oxgp6.jpg",
      "https://w.wallhaven.cc/full/3z/wallhaven-3zmr6y.jpg"
    ],
    //[帐号密码登录&SSO登陆]和[SSO登录]选择登录方式配置[默认有四种登录方式(微信、企业微信、钉钉、飞书)]
    "loginWays":[
      {
        //登录方式的名称
        "WayName":"微信",
        //登录方式的简称
        "SyName":"wx",
        //暂无实际意义
        "isShow":true,
        //微信登录的Logo的URL地址
        "WayImgUrl":"https://connect.oalite.com/img/wechat-login.png",
        //单击微信登录要跳转到的URL地址
        "WayToUrl":""
      },
      {
        "WayName":"企业微信",
        "SyName":"qw",
        "isShow":true,
        "WayImgUrl":"https://connect.oalite.com/img/workwechat-login.png",
        "WayToUrl":""
      },
      {
        "WayName":"钉钉",
        "SyName":"dd",
        "isShow":true,
        "WayImgUrl":"https://connect.oalite.com/img/dingtalk.png",
        "WayToUrl":""
      },
      {
        "WayName":"飞书",
        "SyName":"fs",
        "isShow":true,
        "WayImgUrl":"https://connect.oalite.com/img/lark.png",
        "WayToUrl":""
      }
    ],
    //底部域名备案信息配置
    "footData":{
      //底部上半部分相关配置
      "topArea":[
        {
          //单击文本要跳转到的URL地址
          "href":"https://beian.miit.gov.cn",
          //文本前面配置的图片的URL地址[可以为空，为空就只展示text文本内容]
          "img":"http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg",
          //文本内容
          "text":"这是最好的结果"
        }
      ],
      //底部下半部分相关配置
      "underArea":[
        {
          "href":"https://beian.miit.gov.cn",
          "img":"",
          "text":"沪ICP备16014957号"
        }
      ]
    }
  }
}
```

2. logo图片和背景图片替换

   1. 在static/img 目录下查看图片
   2. 将自己logo图片的名称改为与static/img目录下已有logo图片的名称，将其替换掉；背景图片同理

3. ⚠️注意事项：

   1. 该功能仅支持4.1.0及以上版本专有云可用
   2. 该页面目前不支持移动端自适应
   3. 部署时的table.json路径问题，注意映射路径和真实路径
   4. logo图片建议最大尺寸为160*40
   5. 背景图片建议最大尺寸为1920*1080或长宽比为16:9
   6. 关于自定义添加配置项最多可配置5个
   7. 项目部分地方可能存在小问题，还在持续优化中

4. 打包编译命令：

   1. ```
      npm run build
      ```





