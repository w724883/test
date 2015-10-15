require(["zepto","ui","../common","tools"],function($,ui,Common,Tools){
	var Order = {
		init:function(){
			Common.init();
			this.$order = $('#order');
			this.bindEvent();
			this.setParams();
		},
		bindEvent:function(){
			//下拉选择
			this.$order.on('tap','.J-drop',function(e){
				$(this).find('.arrow').toggleClass('arrow-down');
				$(this).next('.section-drop').fadeToggle(300);
			});
			// 选择支付方式
			this.$order.on('change','.checkbox input[type=checkbox]',function(e){
				var pays = Order.$order.find('.J-pay');
				if($(this).closest('.J-pay').length){
					if($(this).prop('checked')){
						pays.find('.balance-pay input:first').prop('checked',true);
					}else{
						pays.find('.balance-pay input').prop('checked',false);
					}
				}
				Order.setParams();
			});
			// 选择支付平台
			this.$order.on('change','.balance-icons',function(e){
				$(this).siblings('.balance-icons').find('input').prop('checked',false).closest('.J-pay').find('input[type=checkbox]').prop('checked',true);
			});
			// 立即结算
			this.$order.on('tap','.J-accounts',function(e){
				e.preventDefault();
				var inputs = Order.$order.find('input[name]');
				inputs.each(function(){
					if($(this).is('[type=hidden]')){
						if($(this).val() == ''){
							ui.alert($(this).data('error'));
							return false;
						}
					}
				});
				// inputs.filter()
				if(Order.total > 0){
					var platform = Order.$order.find('input[name=pay_platform]');
					if(!platform.prop('checked')){
						ui.alert('请选择支付平台支付余额！');
						return false;
					}
				}
				Order.$order.submit();
			});
			//数量选择
			this.$order.on('tap', '.i-amount a', function(e) {
			    Tools.selectNumber($(this),{inventory:10000,limit:0});
			    Order.setParams();
			}).on('blur', '.i-amount input', function(e) {
			    Tools.selectNumber($(this),{inventory:10000,limit:0});
			    Order.setParams();
			});

			//兑换优惠劵
			this.$order.on('blur','.J-voucher input',function(e){
				// e.preventDefault();
				var $this = $(this);
				// var input = $(this).siblings('input').data('amount',0);
				var voucher = $this.closest('.J-voucher').find('.f-right').html('');
				$this.data('amount',0);
				$.post('/common/common/check_voucher','voucher_code='+$.trim($this.val()),function(data){
					if(data.code == 200){
						if(data.data.price*1 > Order.total*1){
							ui.alert('使用优惠劵 ￥'+data.data.price+' 已超出总计金额！');
							$this.val('');
							return false;
						}else if(data.data.min_use_price*1 < Order.total*1){
							ui.alert('总计金额大于 ￥'+data.data.min_use_price+' 才能使用优惠劵 ！');
							$this.val('');
							return false;
						}
						$this.data('amount',data.data.price).attr('name','voucher_code');
						voucher.removeClass('arrow').html('￥'+data.data.price);
					}else{
						ui.alert(data.message);
					}
				},'json').always(function(){
					Order.setParams();
				}).fail(function(error){
					ui.alert(error);
				});
			});
		},
		setParams:function(){
			var amount = this.$order.find('.J-amount').html();
			var fare = this.$order.find('.J-fare').html();
			var score = this.$order.find('input[name=pay_score]');
			var balance = this.$order.find('input[name=pay_balance]');
			var voucher = this.$order.find('input[name=voucher_code]');
			var addition = this.$order.find('.J-addition input');
			Order.total = amount*1 + fare*1;
			addition.each(function(){
				Order.total += $(this).val()*$(this).data('price');
			});
			if(score.prop('checked')){
				Order.total -= score.data('amount');
			}
			if(balance.prop('checked')){
				Order.total -= balance.data('amount');
				Order.$order.find('.J-balance').text(Order.total > 0 ? 0 : -1*Order.total);
			}
			if(voucher.data('amount')){
				Order.total -= voucher.data('amount');
			}
			
			this.$order.find('.J-total').text('￥'+(Order.total > 0 ? Order.total : 0));

		}
	}
	Order.init();
});