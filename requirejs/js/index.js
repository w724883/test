require(["zepto","touchslider","ui","../common","lazyload"],function($,TouchSlider,ui,Common){
    var Index = {
        init:function(){
            this.pushInfos();
            this.pagination = $('#pagination');
            this.touchSlider = TouchSlider({
                'id': 'indexFocus', //string|elementNode 幻灯容器的id或者该节点对象
                'begin': 0, //Number 默认从第几个幻灯开始播放，从0开始
                'auto': true, //bool 是否自动播放
                'speed':600, //Number 动画效果持续时间,单位是毫秒
                'timeout':5000, //Number 幻灯播放间隔时间,单位毫秒
                'direction':'left', //string left|right|up|down 播放方向,四个值可选
                'align':'center', //string left|center|right 对齐方向（fixWidth=true情况下无效），靠左对齐（ipad版appStore上截图展现方式）、居中对齐（iphone版appStore上截图展现方式）、靠右对齐
                'fixWidth':true, //bool 默认会将每个幻灯宽度强制固定为容器的宽度,即每次只能看到一张幻灯；false的情况参见下方第一个例子
                // 'mouseWheel':true, //bool 是否支持鼠标滚轮
                before:function(){
                    Index.pagination.find('.active').removeClass('active');
                },
                after:function(i){
                    Index.pagination.find('span').eq(i).addClass('active');
                }
            });
            this.setPagination();
            this.bindEvent();
            Common.init();
            Common.bindSearch();
            Common.bindTab();
        },
        bindEvent:function(){
            // 焦点图视差滚动
            // var $focusWrap = $('.index-focus');
            // $(window).on('scroll',function(e){
            //     var scrollTop = $('body').scrollTop() || $(document).scrollTop();
            //     $focusWrap.css('transform','translate3d(0,'+scrollTop*0.4+'px,0)');
            // });
            //喜欢
            $('body').on('tap','.J-like',function(e){
                Common.bindLike($(this));
            });
            // 弹窗登陆
            var $container = $('#login');
            $container.on('tap','.J-submit',function(e){
                Common.bindLogin($container);
            });
            //图片active
            $('.picture-items').on('touchstart', 'li', function(e) {
                $(this).addClass('active').siblings('li.active').removeClass('active');
            });
            $(window).on('orientationchange',function(e){
            	$('.center').center();
            }).trigger('orientationchange');
            //focus pagination
            // this.pagination.on('click', 'span', function(e) {
            //     Index.touchSlider.slide($(this).index());
            //     return false;
            // });
            
        },
        setPagination:function(){
            var lis = $('#indexFocus li');
            // var pagination = $('#pagination');
            var paginationRender = '';
            for (var i = lis.length - 1; i >= 0; i--) {
                paginationRender += '<span></span>';
            };
            this.pagination.html(paginationRender);
        },
        pushInfos:function(){
            var push = $('.pop-push');
            push.length && ui.modal(push).find('img').lazyload({
                effect : "fadeIn"
            });
        }
    }
	Index.init();
})