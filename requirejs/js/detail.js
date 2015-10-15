require(["zepto","touchslider","tools","../common","ui","lazyload"],function($,TouchSlider,Tools,Common,ui){
    var Detail = {
        init:function(){
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
                    Detail.pagination.find('.active').removeClass('active');
                },
                after:function(i){
                    Detail.pagination.find('span').eq(i).addClass('active');
                }
            });
            this.$detail = $('#detail');
            this.detailPrice = this.$detail.find('.J-price');
            this.detailOriginal = this.$detail.find('.J-original');
            this.setPagination();
            this.bindEvent();
            Common.init();
            Common.bindTab();
            this.json = $.parseJSON($('#json-detail').html());
            var attr = this.json["attr"];
            var els = this.$detail.find('ul.J-params');
            var param = els.first().data('params');
            var params = attr[param];
            var infoKey = [];
            for(var key in params){
                var attributes = params[key];
                els.first().find('li:contains('+ key +')').addClass('select');
                infoKey.push(key);
                for(var value in attributes){
                    els.filter('[data-params='+value+']').find('li:contains('+attributes[value][0]+')').addClass('select');
                    infoKey.push(attributes[value][0]);
                }
                break;
            }
            this.setInfo(infoKey);
        },
        bindEvent:function(){
            var seft = this;
            //喜欢
            $('body').on('tap','.J-like',function(e){
                Common.bindLike($(this));
            });
            // 弹窗登陆
            var $container = $('#login');
            $container.on('tap','.J-submit',function(e){
                Common.bindLogin($container);
            });

            //商品条件选择
            seft.$detail.find('dd li').on('tap', function(e) {
                //没有库存
                if($(this).hasClass('disable')){
                    return false;
                }
                seft.setParams($(this));
                //去掉错误提示
                // if(seft.getParams(seft.$detail)){
                //     seft.$detail.removeClass('detail-attantion');
                // }
            });
            
            //数量选择
            this.$detail.on('tap', '.i-amount a', function(e) {
                Tools.selectNumber($(this),{inventory:seft.info.inventory});
                var num = $(this).siblings('input').val();
                //显示价格
                seft.detailPrice.html(seft.info.price*num);
                //显示原价
                seft.detailOriginal.html(seft.info.original*num);
            }).on('blur', '.i-amount input', function(e) {
                Tools.selectNumber($(this),{inventory:seft.info.inventory});
                var num = $(this).val();
                //显示价格
                seft.detailPrice.html(seft.info.price*num);
                //显示原价
                seft.detailOriginal.html(seft.info.original*num);
            });
            
            //提交数据
            $('.detail .J-buy').on('tap', function(e) {
                if($(this).data('userid')){
                   var params = Detail.getParams(seft.$detail);
                   if(params){
                       $.post('/cart_create', params,function(data){
                           if(data.code == 200) {
                               ui.confirm('购买成功！前去购物车？',function(value){
                                   if(value){
                                       window.location.href = '/cart';
                                   }
                               });
                           }else {
                               ui.alert(data.message);
                           }
                       },'json').fail(function(error){
                           ui.alert(error);
                       });
                   }else{
                       ui.alert('请选择您要的商品信息');
                   } 
                }else{
                    ui.modal($('.pop-login'));
                }
            });
            //关闭错误提示
            // seft.$detail.on('tap','.attantion-close',function(e){
            //     seft.$detail.removeClass('detail-attantion');
            // });

            $(window).on('orientationchange',function(e){
                $('.center').center();
            }).trigger('orientationchange');
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
        setParams:function(el){
            var attr = this.json["attr"];
            var infoKey = [];
            var attribute = el.closest('ul').data('params');
            var value = el.html();
            var params = attr[attribute][value];

            var els = this.$detail.find('ul.J-params');
            el.addClass('select').siblings('.select').removeClass('select');
            el.siblings('.disable').removeClass('disable');
            for(var l = 0; l < els.length; l++){
                var param = els.eq(l).data('params');
                if(param != attribute){
                    els.eq(l).find('li').addClass('disable');
                    if(params){
                        var array = params[param];
                        for(var a = 0; a < array.length; a++){
                            els.eq(l).find('li:contains('+array[a]+')').removeClass('disable');
                        }
                    }
                }
                infoKey.push(els.eq(l).find('.select').html());
            }
            this.setInfo(infoKey);
        },
        getParams:function(operation){
            var uls = operation.find('.J-params');
            var params = {};
            for (var i = 0; i < uls.length; i++) {
                if(uls.eq(i).is('input')){
                    if(uls.eq(i).is(':hidden')){
                        params[uls.eq(i).data('params')] = uls.eq(i).val();
                    }else{
                        if((uls.eq(i).val() < 1) || isNaN(uls.eq(i).val())){
                            return false;
                        }else{
                            params[uls.eq(i).data('params')] = uls.eq(i).val();
                        }
                    }
                }else{
                    var select = uls.eq(i).find('.select:not(.disable)');
                    // var btns = operation.find('.detail-btns').removeClass('hide');
                    if(select.length == 0){
                        return false;
                    }else{
                        // if(select.data('inventory') == ''){
                        //  btns.addClass('hide');
                        // }
                        params[uls.eq(i).data('params')] = $.trim(select.text());
                    }
                }
            };
            return params;
        },
        setInfo:function(infoKey){
            var info = this.json["info"];
            for(var key in info){
                if(key.split(',').sort().toString() == infoKey.sort().toString()){
                    var num = this.$detail.find('.i-amount input').val();
                    //显示价格
                    this.detailPrice.html(info[key].price*num);
                    //显示原价
                    this.detailOriginal.html(info[key].original*num);
                    //显示库存
                    this.$detail.find('.J-inventory').text(info[key].inventory);
                    this.info = {price:info[key].price,original:info[key].original,inventory:info[key].inventory};
                }
            }
        }
    }
	Detail.init();
})