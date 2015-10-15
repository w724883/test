require(["zepto","../common","lazyload"],function($,Common){
    var List = {
        init:function(){
            this.bindEvent();
            Common.init();
            Common.bindSearch();
        },
        bindEvent:function(){
            // 焦点图视差滚动
            // var $focusWrap = $('.index-focus');
            // $(window).on('scroll',function(e){
            //     var scrollTop = $('body').scrollTop() || $(document).scrollTop();
            //     $focusWrap.css('transform','translate3d(0,'+scrollTop*0.4+'px,0)');
            // });
            var $slide = $('#slide');
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
            //导航下拉
            $slide.on('tap','.tab-title li',function(e){
                $(this).addClass('active').toggleClass('arrow-up').toggleClass('arrow-down').siblings('.active').removeClass('active');
                if($(this).index() == $(this).siblings().length){
                    if($(this).hasClass('arrow-down')){
                        var height = $slide.find('.tab-dropdown .tab-box').height();
                        $slide.find('.tab-dropdown').animate({
                            height:height
                        },400);
                    }else{
                        $slide.find('.tab-dropdown').animate({
                            height:0
                        },400);
                    }
                }
            });
            //导航滑动
            Common.bindSlide($slide.find('.slide-box'));            
        }
    }
	List.init();
})