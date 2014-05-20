var contextPath = process.env.CONTEXTPATH;
if (!contextPath || contextPath == '/') {
	contextPath = '';
}

console.log('CONTEXTPATH ' + contextPath);

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
