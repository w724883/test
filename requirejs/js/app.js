
// ;(function(global) {
//     var mapping = {}, cached = {};
//     global.define = function(id, func) {
//     	if(mapping[id]) {
//     		throw new Error('[ "' + id + '" ] already exists, don\'t repeat the definition');
//     	}
//         mapping[id] = func;
//     };
//     global.require = function(id) {
//         if(cached[id]) {
//         	return cached[id];
//         } else {
//         	cached[id] = {};
//             mapping[id](cached[id]);
//             return cached[id];
//         }
//     };
// })(this)
// define('/ui',function(exports){
// 	exports.pop = function(){
// 		var $body = $('body');
// 		$body.addClass('open-pop');
// 		$('.pop').fadeIn('400',function(){
// 			// $(this).addClass('open-animation');
// 			$(this).on('click', function(e){
// 				$(this).fadeOut('400', function(){
// 					$body.removeClass('open-pop');
// 				});
// 			}).on('click', '.pop-body', function(e) {
// 				e.stopPropagation();
// 			});;
// 		});
// 	}
// });
// //导航hover
// define('/navhover',function(exports){
// 	exports.navhover = function(container){
// 		// var navContainer = $('#navHover');
// 		var lis = container.children('li');
// 		var line = $('<li class="underline"></li>').appendTo(container);
// 		var left = container.find('li.active').position().left;
// 		var width = container.find('li.active').width();
// 		var timer;
// 		line.css({
// 			width: width,
// 			left: left
// 		});
// 		lis.hover(function() {
// 			clearTimeout(timer);
// 			var left = $(this).position().left;
// 			var width = $(this).width();
// 			timer = setTimeout(function(){
// 				line.animate({
// 					left: left,
// 					width: width
// 				},200);
// 			},100)
// 		},
// 		function(){
// 			clearTimeout(timer);
// 			timer = setTimeout(function(){
// 				line.animate({
// 					left: left,
// 					width: width
// 				},200);
// 			},1000)
// 		});
// 	}
// });
// //图片居中
// define('/center',function(exports){
// 	exports.center = function(container){
// 		var container = container || $('body');
// 		var imgs = container.find('.center');
// 		imgs.each(function(index, el) {
// 			el = $(el);
// 			el.hide();
// 			var img = new Image();
// 			var src = el.data('original');
// 			img.src = src;
// 			img.onload = function(){
// 				var width = this.width,
// 					height = this.height,
// 					parentWidth = el.parent().width(),
// 					parentHeight = el.parent().height(),
// 					ratio = width / height,
// 					parentRatio = parentWidth / parentHeight;
// 				if(ratio > parentRatio){
// 				  el.css({
// 				  	height:'100%',
// 				  	width:'auto',
// 				  	marginLeft:parseInt((parentWidth - parentHeight*ratio)/2)
// 				  });
// 				}else{
// 					el.css({
// 						width:'100%',
// 						height:'auto',
// 						marginTop:parseInt((parentHeight - parentWidth/ratio)/2)
// 					});
// 				}
// 				el.attr("src",src).fadeIn(600);
// 			}
// 			// if(el.attr("src") === undefined || el.attr("src") === false){
// 			// }else{
// 			// }
// 		});
// 	}
// });
// define('/verify',function(exports){
// 	exports.verify = {
// 		tips:'',
// 		account:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请输入账号';
// 				return false;
// 			}else{
// 				return true;
// 			}
// 		},
// 		password:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请输入密码';
// 				return false;
// 			}else if(value.length < 6){
// 				this.tips = '密码长度大于6位';
// 				return false;
// 			}else if(value.length > 25){
// 				this.tips = '密码长度小于25位';
// 				return false;
// 			}
// 			return true;
// 		},
// 		phone:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请输入手机号';
// 				return false;
// 			}else if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)){
// 				this.tips = '请输入正确手机号';
// 				return false;
// 			}else if(value.length != 11){
// 				this.tips = '请输入11位手机号';
// 				return false;
// 			}
// 			return true;
// 		},
// 		repassword:function(value){
// 			if(this.password(value)){
// 				if(value != $('input.password').val()){
// 					this.tips = '确认密码不相同';
// 					return false;
// 				}
// 				return true;
// 			}else{
// 				return false;
// 			};
// 		},
// 		verifycode:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请输入验证码';
// 				return false;
// 			}else if(value.length != 6){
// 				this.tips = '验证码必须是6位数字';
// 				return false;
// 			}else{
// 				return true;
// 			}
// 		},
// 		zipcode:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请填写邮政编码';
// 				return false;
// 			}else if(!/^[0-9]{6}$/.test(value)){
// 				this.tips = '请填写正确邮政编码';
// 				return false;
// 			}else{
// 				return true;
// 			}
// 		},
// 		address:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请填写详细地址';
// 				return false;
// 			}else if(value.length < 5 || value.length > 100){
// 				this.tips = '请填写有效的详细地址';
// 				return false;
// 			}else{
// 				return true;
// 			}
// 		},
// 		username:function(value){
// 			value = $.trim(value);
// 			if(value == ''){
// 				this.tips = '请填写姓名';
// 				return false;
// 			}else{
// 				return true;
// 			}
// 		}
// 	}
// });
// $(function(){
// 	var App = {
// 		init:function(){
// 			this.tabContainer = $('#tabContainer');
// 			this.slideTab = $('#slideTab');
// 			App.slideNav();
// 			App.bindEvent();
// 			$(".lazy").lazyload({
// 				// threshold : 200,
// 		        effect : "fadeIn"
// 		    });
// 		},
// 		bindEvent:function(){
// 			// search
// 			var searchValue = '';
// 			$('#search').on('focus', 'input', function(e) {
// 				$(this).val(searchValue).siblings('.search-placeholder').hide();
// 			}).on('blur', 'input', function(e) {
// 				searchValue = $(this).val();
// 				$(this).val('').siblings('.search-placeholder').show();
// 			});
// 			//图片active
// 			this.tabContainer.on('touchstart', 'li', function(e) {
// 			    $(this).addClass('active').siblings('li.active').removeClass('active');
// 			});
// 			//tab
// 			this.slideTab.on('tap','a', function(e) {
// 				var li = $(this).closest('li');
// 				if(li.hasClass('active')){
// 					return false;
// 				}
// 				$(".lazy").lazyload();
// 				li.addClass('active').siblings('.active').removeClass('active');
// 				App.slideNav(li.index());
// 				App.slideTab.find('.underline').addClass('animation-translate');
// 				App.tabContainer.addClass('animation-translate');
// 			});
// 			App.tabContainer.on('transitionend', function(e) {
// 				$(this).find('.lazy').lazyload();
// 			});
// 			// var header = $('#header');
// 			// var nav = $('#nav');
// 			// var headerHeight = $('.header').height();
// 			// var pop = require('/ui').pop;
// 			// $('body').on('click','.btn-login', function(e) {
// 			// 	pop();
// 			// });

// 			// $(window).scroll(function(e){
// 			// 	var scrollTop = $('body').scrollTop() || $(document).scrollTop();
// 			// 	scrollTop >= headerHeight ? nav.addClass('fixed') : nav.removeClass('fixed');
// 			// });
// 			//商品数量选择
// 			// $('#detailOperation,#orderList').on('click', '.i-amount a', function(e) {
// 			// 	var num = $(this).data('amount');
// 			// 	var input = $(this).closest('.i-amount').find('input');
// 			// 	var getNum = input.val()*1 + num;
// 			// 	if(getNum < 1){
// 			// 		return false
// 			// 	};
// 			// 	input.val(getNum);
// 			// 	return false;
// 			// });
// 		},
// 		slideNav:function(index){
// 			index = index || this.slideTab.find('li.active').index();
// 		    this.slideTab.find('.underline').css('transform','translate3d('+index*100+'%,0,0)');
// 		    this.tabContainer.css('transform','translate3d(-'+index*50+'%,0,0)');
// 		}
// 	}
// 	App.init();
// })