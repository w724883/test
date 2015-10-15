require(["zepto","tools","../common","ui","lazyload"],function($,Tools,Common,ui){
    var Cart = {
        init:function(){
            this.$cart = $('#cart');
            Common.init();
            this.bindEvent();
            //初始化总金额
            this.setSelect();
        },
        bindEvent:function(){
            //数量选择
            this.$cart.on('tap', '.i-amount a', function(e){
                var parent = $(this).closest('.J-params');
                Tools.selectNumber($(this),{inventory:parent.data('inventory'),goods_id:parent.data('goodid'),cart_id:parent.data('cartid')});
                Cart.setParams();
            }).on('blur', '.i-amount input', function(e){
                var parent = $(this).closest('.J-params');
                Tools.selectNumber($(this),{inventory:parent.data('inventory'),goods_id:parent.data('goodid'),cart_id:parent.data('cartid')});
                Cart.setParams();
            });

            // 选择商品
            this.$cart.on('tap','ul .J-select',function(e){
                $(this).toggleClass('active');
                Cart.setSelect();
            });
            this.$cart.on('tap','.order-desc .J-select',function(e){
                $(this).toggleClass('active');
                var labels = Cart.$cart.find('ul .J-select');
                if($(this).hasClass('active')){
                    labels.addClass('active');
                }else{
                    labels.removeClass('active');
                }
                Cart.setParams();
            });

            // 删除商品
            this.$cart.on('tap','.J-delete',function(e){
                var parent = $(this).closest('.J-params');
                ui.confirm('删除该商品？',function(value){
                    if(value){
                        $.post('/del_cart','cart_id='+parent.data('cartid'),function(data){
                            if(data.code == 200){
                                parent.fadeOut(300,function(){
                                    $(this).remove();
                                    Cart.setParams();
                                });
                            }else{
                                ui.alert(data.message);
                            }
                        },'json').fail(function(error){
                            ui.alert(error);
                        });
                    }
                });
            });

            //立即购买
            this.$cart.on('tap','.J-buy',function(e){
                e.preventDefault();
                var els = Cart.$cart.find('.J-params');
                var input = '';
                els.each(function(index){
                    if($(this).find('.J-select').hasClass('active')){
                        input += '<input type="hidden" name="cart_id[]" value="'+$(this).data('cartid')+'" />';
                    }
                });
                if(input != ''){
                    Cart.$cart.append(input).submit();
                }else{
                    ui.alert('请选择商品！');
                }
            });
        },
        setSelect:function(){
            var labels = Cart.$cart.find('ul .J-select');
            if(labels.filter('.active').length == labels.length){
                Cart.$cart.find('.order-desc .J-select').addClass('active');
            }else{
                Cart.$cart.find('.order-desc .J-select').removeClass('active');
            }
            this.setParams();
        },
        setParams:function(){
            var totals = 0;
            var lis = this.$cart.find('.J-params');
            var els_total = this.$cart.find('.J-totals');
            lis.each(function(){
                if($(this).find('.J-select').hasClass('active')){
                   totals += $(this).data('amount') * $(this).find('input').val(); 
                }
            });
            els_total.text(totals);
        }
    }
	Cart.init();
})