define(['zepto'],function($){
	var $body = $('body');
	var Ui = {
		pop:function(content,fn){
			$body.addClass('open-pop');
			this.html = this.html ? this.html : $('<div class="pop">'+
						(content?content:'')+
			'</div>');
			return this.html.appendTo('body').fadeIn(300,function(){
				var $this = $(this);
				$this.off('tap').on('tap', function(e){
					if($(e.target).is('.pop-select')){
						return false;
					}else if(!$(e.target).closest('.pop-body').length){
						if(fn && (typeof fn == 'function')){
							fn(e);
						}
						$this.fadeOut(400, function(){
							$body.removeClass('open-pop');
							$this.remove();
						});
					}
				}).find('.pop-close,.pop-no,.pop-ok').off('tap').on('tap',function(e){
					if(fn && (typeof fn == 'function')){
						fn($(this).is('.pop-ok'));
					}
					$this.fadeOut(400, function(){
						$body.removeClass('open-pop');
						$this.remove();
					});
				});
			});		
		},
		alert:function(content,fn){
			this.html = $('<div class="pop">'+
							'<div class="c-858484 pop-body">'+
								'<div class="pop-content">'+
									(content?content:'')+
								'</div>'+
								'<div class="pop-btn"><a class="c-858484 pop-ok" href="javascript:;">确定</a></div>'+
							'</div>'+
						'</div>');
			return this.pop(content,fn);
		},
		confirm:function(content,fn){
			this.html = $('<div class="pop">'+
							'<div class="c-858484 pop-body">'+
								'<div class="pop-content">'+
									(content?content:'')+
								'</div>'+
								'<div class="pop-btn">'+
								'<a class="c-858484 pop-close" href="javascript:;">取消</a>'+
								'<a class="c-858484 pop-ok" href="javascript:;">确定</a>'+
								'</div>'+
							'</div>'+
						'</div>');
			return this.pop(content,fn);
		},
		modal:function(modal){
			if(modal){
				$body.addClass('open-pop');
				modal.fadeIn(300,function(){
					var $this = $(this);
					$this.on('tap', function(e){
						if(!$(e.target).closest('.pop-body').length){
							$this.fadeOut(400, function(){
								$body.removeClass('open-pop');
							});
						}
					}).on('tap','.pop-close',function(e){
						$this.fadeOut(400, function(){
							$body.removeClass('open-pop');
						});
					});
				});
				return modal;
			}
		},
		destroy:function(fn){
			this.html.trigger('tap');
			if(fn && (typeof fn == 'function')){
				fn();
			}
		}		
	};
	
	return {
		pop:Ui.pop,
		alert:Ui.alert,
		confirm:Ui.confirm,
		modal:Ui.modal,
		destroy:Ui.destroy
	}
});