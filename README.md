展示静态资源管理系统设计思路的demo
===========================

## 环境依赖：

1. fis
1. java
2. maven

## 运行方法：

	mvn jetty:run

刷新页面（ http://127.0.0.1:8080/fis ），查看效果

或者
	
	mvn -Dfis.args='release -mpod webapp' jetty:run

刷新页面（ http://127.0.0.1:8080/fis ），查看效果

	mvn package 

或者

	mvn -Dfis.args='release -mpod webapp' package

打包发布


## 目录说明：

* src/main/fis/WEB-INF目录下放fis提供的jsp标签配置及相关jar包文件，包来源看 [这里](https://github.com/leiqin/fis-java-resource)
* src/main/fis/lib目录下放基础库文件，jquery、boostrap等
* src/main/fis/widget目录下放组件化文件
* src/main/fis/fis-conf.js 文件是项目配置
* src/main/fis/index.jsp是入口页面文件

## jsp页面示例

### 代码

```jsp
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%-- 使用<fis:html>标签替代传统<html>标签，并设置map.json文件部署路径，缺省是“/” --%>
<fis:html mapDir="/map"> 
    <head>
        <meta charset="utf-8"/>
        <title>my jsp page</title>
        
        <%-- 使用<fis:require>替代传统<link href>、<script src>标签来加载静态资源 --%>
        <fis:require id="lib/jquery/jquery-1.10.2.js"/>
        <fis:require id="lib/bootstrap/js/bootstrap.js"/>
        <fis:require id="lib/mod/mod.js"/>
        
        <fis:require id="lib/bootstrap/css/bootstrap.css"/>
        <fis:require id="lib/bootstrap/css/bootstrap-responsive.css"/>
        
        <%-- 使用<fis:styles/>标签显示<fis:require>标签收集到的所有css资源 --%>
        <fis:styles/>
        
    </head>
    <body>
        
        <div class="main">
            <div class="main-header">
                <jsp:include page="widget/header/header.jsp" flush="true"/>
            </div>
            <div class="main-body">
                <jsp:include page="widget/body/body.jsp" flush="true"/>
            </div>
            <div class="main-footer">
                <jsp:include page="widget/footer/footer.jsp" flush="true"/>
            </div>
        </div>
        
        <%-- 在其他widget加载完毕后再加载页面的js、css，效果更好 --%>
        <fis:require id="index.css"/>
        <fis:require id="index.js"/>
        
        <%-- 使用<fis:script>标签代替传统<script>标签，它可以帮你收集页面上的js统一放到尾部 --%>
        <fis:script>
            console.log('1111');
        </fis:script>
        
        <%-- 使用<fis:scripts/>标签显示<fis:require>标签收集到的所有js资源 --%>
        <fis:scripts/>
    </body>
</fis:html>
```

### 自定义标签说明

* 见代码注释

## 配置说明

```javascript
fis.config.set('roadmap.path', [
    {
        reg : '**.jsp' //jsp文件不调整部署结构
    },
    {
        reg : 'WEB-INF/**' //WEB-INF目录下的文件不调整部署结构
    },
    {
        reg : 'map.json',   //map.json发布到map目录下
        release : 'map/$&'
    },
    {
        reg : 'widget/**.js',   //widget目录下的js文件
        isMod : true,           //组件化包装
		url : contextPath + '/static$&', //url 带上 contextPath
        release : '/static/$&'  //发布到/static/目录下
    },
    {
        reg : 'README.md',
        release : false
    },
    {
        reg : '**',             //其他文件
		useMap : true,
		url : contextPath + '/static$&', //url 带上 contextPath
        release : '/static/$&'  //发布到/static/目录下
    }
]);

//png图片使用pngquant压缩算法，支持将png24压缩为png8，ie6下显示效果较好
fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');

//csssprite布局算法调整，默认是linear，线性布局
//fis.config.set('settings.spriter.csssprites.layout', 'matrix');

//自动define包装
fis.config.set('settings.postprocessor.jswrapper.type', 'amd');

//打包配置
fis.config.set('pack', {
    'pkg/lib.js'  : [
        'lib/jquery/jquery-1.10.2.js',
        'lib/bootstrap/js/bootstrap.js',
        'lib/mod/mod.js'
    ],
    'pkg/lib.css' : [
        'lib/bootstrap/css/bootstrap.css',
        'lib/bootstrap/css/bootstrap-responsive.css'
    ],
    'pkg/widget.js' : 'widget/**.js',
    'pkg/widget.css' : 'widget/**.css'
});

fis.config.set('deploy', {
	//使用fis release --dest webapp 来使用这个配置
	webapp : {
		//from参数省略，表示从发布后的根目录开始上传
		//发布到当前项目的 webapp 目录
		to: '../webapp'
	}
});
```
