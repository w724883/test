require.config({
    baseUrl:'../js/lib',
    paths:{
        zepto:'zepto',
        lazyload:'lazyload'
    },
    shim:{
        zepto:{
            exports:'$'
        },
        lazyload:{
            deps:['zepto'],
            exports:'$.fn.lazyload'
        }
    }
});
