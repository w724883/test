// define(function(){
// 	require.config({
// 	    baseUrl:'/public/m/js/lib',
// 	    paths:{
// 	        zepto:'zepto',
// 	        lazyload:'lazyload'
// 	    },
// 	    shim:{
// 	        zepto:{
// 	            exports:'$'
// 	        },
// 	        lazyload:{
// 	            deps:['zepto'],
// 	            exports:'$.fn.lazyload'
// 	        }
// 	    }
// 	});
// });
({
	// appDir: "../",	//上级目录作为appDir,会将appDir下地所有文件复制到dir下
    baseUrl: "",	//相对appDir下地js目录作为baseUrl,所有路径都会相对于baseUrl
    // mainConfigFile: 'main.js',
    // paths:{
    // 	lib:"lib",
    // 	zepto:'lib/zepto',
    // 	lazyload:'lib/lazyload'
    // },
    // shim:{
    //     zepto:{
    //         exports:'$'
    //     },
    //     lazyload:{
    //         deps:['zepto'],
    //         exports:'$.fn.lazyload'
    //     }
    // },
    // dir: "dist",
    optimize: "uglify",
    skipDirOptimize: true,
    // modules: [
    //     {name: "lib/area",create: true},
    //     {name: "lib/dialog",create: true},
    //     {name: "lib/lazyload",create: true},
    //     {name: "lib/serialize",create: true},
    //     {name: "lib/tools",create: true},
    //     {name: "lib/touchslider",create: true},
    //     {name: "lib/ui",create: true},
    //     {name: "lib/zepto",create: true},
    // ]
    name: "main",
    out: "dist/a.js",
})