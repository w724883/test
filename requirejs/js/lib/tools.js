define(['zepto'],function($){
	// var $body = $('body');
	// var Ui = {
	// 	pop:function(content,fn){
	// 		$body.addClass('open-pop');
	// 		this.html = this.html ? this.html : $('<div class="pop">'+
	// 					(content?content:'')+
	// 		'</div>');
	// 		return this.html.appendTo('body').fadeIn(300,function(){
	// 			var $this = $(this);
	// 			$this.off('tap').on('tap', function(e){
	// 				if($(e.target).is('.pop-select')){
	// 					return false;
	// 				}else if(!$(e.target).closest('.pop-body').length){
	// 					if(fn && (typeof fn == 'function')){
	// 						fn(e);
	// 					}
	// 					$this.fadeOut(400, function(){
	// 						$body.removeClass('open-pop');
	// 						$this.remove();
	// 					});
	// 				}
	// 			}).find('.pop-close,.pop-no,.pop-ok').off('tap').on('tap',function(e){
	// 				if(fn && (typeof fn == 'function')){
	// 					fn($(this).is('.pop-ok'));
	// 				}
	// 				$this.fadeOut(400, function(){
	// 					$body.removeClass('open-pop');
	// 					$this.remove();
	// 				});
	// 			});
	// 		});		
	// 	},
	// 	alert:function(content,fn){
	// 		this.html = $('<div class="pop">'+
	// 						'<div class="c-858484 pop-body">'+
	// 							'<div class="pop-content">'+
	// 								(content?content:'')+
	// 							'</div>'+
	// 							'<div class="pop-btn"><a class="c-858484 pop-ok" href="javascript:;">确定</a></div>'+
	// 						'</div>'+
	// 					'</div>');
	// 		return this.pop(content,fn);
	// 	},
	// 	confirm:function(content,fn){
	// 		this.html = $('<div class="pop">'+
	// 						'<div class="c-858484 pop-body">'+
	// 							'<div class="pop-content">'+
	// 								(content?content:'')+
	// 							'</div>'+
	// 							'<div class="pop-btn">'+
	// 							'<a class="c-858484 pop-close" href="javascript:;">取消</a>'+
	// 							'<a class="c-858484 pop-ok" href="javascript:;">确定</a>'+
	// 							'</div>'+
	// 						'</div>'+
	// 					'</div>');
	// 		return this.pop(content,fn);
	// 	},
	// 	modal:function(modal){
	// 		if(modal){
	// 			$body.addClass('open-pop');
	// 			modal.fadeIn(300,function(){
	// 				var $this = $(this);
	// 				$this.on('tap', function(e){
	// 					if(!$(e.target).closest('.pop-body').length){
	// 						$this.fadeOut(400, function(){
	// 							$body.removeClass('open-pop');
	// 						});
	// 					}
	// 				}).on('tap','.pop-close',function(e){
	// 					$this.fadeOut(400, function(){
	// 						$body.removeClass('open-pop');
	// 					});
	// 				});
	// 			});
	// 			return modal;
	// 		}
	// 	},
	// 	destroy:function(fn){
	// 		this.html.trigger('tap');
	// 		if(fn && (typeof fn == 'function')){
	// 			fn();
	// 		}
	// 	}
	// };
	var selectNumber = {
		setNumber:function($this,params){
			var amount = $this.data('amount');
	        var input = amount ? $this.siblings('input') : $this;
	        var num = amount ? Math.round(amount) : Math.round($this.val());
	        var val = amount ? (Math.round(input.val()) + num) : num;
	        var limit = params.limit == undefined ? 1 : params.limit;
	        selectNumber.input = input;
	        if(val < limit || isNaN(val)){
	            val = params.num = limit;
	            selectNumber.httpNumber(params);
	            return 0;
	        }
	        if(val > params.inventory){
	        	val = params.num = params.inventory;
	        	selectNumber.httpNumber(params);
	            return false;
	        };
	        params.num = val;
	        selectNumber.httpNumber(params);
	        return val;
		},
		httpNumber:function(params){
			if(params.cart_id == undefined){
				selectNumber.input.val(params.num);
			}else{
				$.post('/edit_cart',params,function(data){
					if(data.code == 200){
						selectNumber.input.val(params.num);
					}else{
						Ui.alert(data.message);
					}
				},'json').fail(function(error){
					Ui.alert(error);
				});
			}
		}
	};
	return {
		// pop:Ui.pop,
		// alert:Ui.alert,
		// confirm:Ui.confirm,
		// modal:Ui.modal,
		// destroy:Ui.destroy,
		selectNumber:selectNumber.setNumber
	}
});