require(["zepto","serialize","ui"],function($,Serialize,ui){
	var Register = {
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			this.container = $('#register');
			this.data = {};
			this.page = 0;
			this.container.on('tap','.J-submit',function(e){
				var params = Serialize.init(Register.container.find('.register-container').eq(Register.page));
				Register.nextPage(params);
				
			});
			this.container.on('tap','.J-verify',function(e){
				Serialize.getCode(Register.container.find('input[name="phone"]'),$(this),1);
			});
		},
		enter:function(){
			$.post('/user_register',Register.data,function(data){
				if(data.code == 200){
					window.location.href = '/';
				}else{
					ui.alert(data.message);
				}
			},'json').fail(function(error){
				ui.alert(error);
			});
		},
		nextPage:function(params){
			if(params.error.length){
				ui.alert(params.error[0].error);
			}else{
				$.extend(this.data,params.data);
				if(this.data.sex){
					this.enter();
				}else{
					this.container.find('.switch-container').css('transform','translate3d(0,-'+$(window).height()+'px,0)');
					this.page++;
				}
			}
		}
	};
	Register.init();
});