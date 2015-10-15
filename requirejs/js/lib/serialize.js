define(['zepto','ui'],function($,ui){
	var Serialize = {
		getParams:function(container){
			var params = container.find('.J-param');
			var _data = {
				data:{},
				error:[]
			};
			params.each(function(){
				var name = this.name;
				var value = this.value;
				var status = Serialize.verify(name)(value);
				_data.data[name] = value;
				if(!status){
					if(typeof status == 'boolean'){
						_data.error.push({element:$(this),error:$(this).data('verify')});
					}else if(typeof status == 'undefined'){
						_data.error.push({element:$(this),error:$(this).data('error')});
					}
					
				}
			});
			return _data;
		},
		getCode:function(input,btn,type){
			var status = Serialize.verify(input[0].name)(input[0].value);
			if(status){
				if(Serialize.timer) return false;
				var seconds = 60;
				btn.text('发送验证码...');			
				$.post('/get_code', 'phone='+input.val()+'&code_type='+type,function(data){				
					if(data.code == '200') {
						btn.text('发送成功 ('+seconds+'s)');
						Serialize.timer = setInterval(function(){
							if(seconds > 1){
								btn.text('发送成功 ('+(--seconds)+'s)');
							}else{
								clearInterval(Serialize.timer);
								btn.text('重新发送');
								Serialize.timer = null;
							}
						},1000);
					}else {
						ui.alert(data.message);
						btn.text('重新发送');
						return false;
					}
				},'json').fail(function(error){
					ui.alert(error);
					btn.text('重新发送');
				});
			}else{
				if(typeof status == 'boolean'){
					ui.alert(input.data('verify'));
				}else if(typeof status == 'undefined'){
					ui.alert(input.data('error'));
				}
			}
		},
		verify:function(name){
			var params = {
				phone:['phone'],
				password:['passwd','pay_passwd'],
				repassword:['repassword'],
				verifycode:['verifycode'],
				zipcode:['zipcode']
			}
			for(var key in params){
				if(params[key].indexOf(name) > -1){
					return this.filter[key];
				}
			}
			return this.filter['checknull'];
		},
		filter:{
			select:function(value){
				if(value != ''){
					return true;
				}
				
			},
			password:function(value){
				value = $.trim(value);
				if(value == ''){
					return undefined;
				}if(value.length < 6 || value.length > 25){
					return false;
				}
				this.pwd = value;
				return true;
			},
			phone:function(value){
				value = $.trim(value);
				if(value == ''){
					return undefined;
				}else if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)){
					return false;
				}
				return true;
			},
			repassword:function(value){
				value = $.trim(value);
				if(value == ''){
					return undefined;
				}else{
					if(value != this.pwd){
						return false;
					}
				};
				return true;
			},
			verifycode:function(value){
				value = $.trim(value);
				if(value == ''){
					return undefined;
				}else if(!/^\d{6}$/.test(value)){
					return false;
				}else{
					return true;
				}
			},
			zipcode:function(value){
				value = $.trim(value);
				if(value == ''){
					return undefined;
				}else if(!/^[0-9]{6}$/.test(value)){
					return false;
				}else{
					return true;
				}
			},
			address:function(value){
				value = $.trim(value);
				if(value == ''){
					return undefined;
				}else if(value.length < 5 || value.length > 100){
					return false;
				}else{
					return true;
				}
			},
			checknull:function(value){
				value = $.trim(value);
				if(value != ''){
					return true;
				}
			}
		}
	}
	return {
		init:Serialize.getParams,
		getCode:Serialize.getCode
	}
});