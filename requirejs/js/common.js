define(["zepto","serialize","ui","lazyload"],function($,Serialize,ui){
	var App = {
		init:function(){
			
			$('.center').center();
			$('.lazy').lazyload({
				threshold : 200,
				effect : "fadeIn"
			});
			
		},
		bindSelect:function(){
			//select选项
			$('.select select').on('change',function(e){
				$(this).siblings('span').html($(this).children('option[value="'+$(this).val()+'"]').html());
			}).trigger('change');
		},
		bindSearch:function(){
			// search
			var searchValue = '';
			$('#search').on('focus', 'input', function(e) {
				$(this).val(searchValue).siblings('.search-placeholder').hide();
			}).on('blur', 'input', function(e) {
				searchValue = $(this).val();
				$(this).val('').siblings('.search-placeholder').show();
			});
		},
		bindTab:function(){
			//tab
			var $tabContainer = $('#tabContainer');
			var $slideTab = $('#slideTab');
			var len = $slideTab.find('li:not(.underline)').length;
			var index = $slideTab.find('li.active').index();
			var winWidth = $(window).width();
			$slideTab.find('li').width(100/len+'%');
			$tabContainer.width(winWidth*len).find('.J-items').width(winWidth);
			var timer;
			slideTab(index);
			$slideTab.on('tap','li', function(e) {
				// var li = $(this).closest('li');
				if($(this).data('userid') === ""){
					ui.modal($('.pop-login'));
				}else{
					if($(this).hasClass('active')){
						return false;
					}
					index = $(this).index();				
					$(this).addClass('active').siblings('.active').removeClass('active');
					slideTab(index,true);
					clearTimeout(timer);
					timer = setTimeout(function(){
						$tabContainer.find('.J-items').eq(index).find(".lazy").lazyload();
					},800);
				}
			});
			function slideTab(index,islide){
				$tabContainer.height($tabContainer.find('.J-items').eq(index).height());
				if(islide){
					$slideTab.find('.underline').addClass('animation-translate').css('transform','translate3d('+index*100+'%,0,0)');
					$tabContainer.addClass('animation-translate').css('transform','translate3d(-'+index*(100/len)+'%,0,0)');
				}else{
					$slideTab.find('.underline').css('transform','translate3d('+index*100+'%,0,0)');
					$tabContainer.css('transform','translate3d(-'+index*(100/len)+'%,0,0)');
				}
			}
		},
		bindLogin:function($container){			
			var params = Serialize.init($container);
			if(params.error.length){
				ui.alert(params.error[0].error);
			}else{
				$.post('/user_login',params.data,function(data){
					if(data.code == 200){
						if($container.hasClass('pop')){
							window.location.reload();
						}else{
							window.location.href = "/my";
						}
					}else{
						ui.alert(data.message);
					}
				},'json').fail(function(error){
					ui.alert(error);
				});
			}
		},
		bindLike:function($this){
		    var userid = $this.data('userid');
		    var goodsid = $this.data('goodsid');
		    if(!userid){
		        ui.modal($('.pop-login'));
		        return false;
		    }
		    $.post('/like','goods_id='+goodsid,function(data){
		        if(data.code == 200){
		            $this.toggleClass('like');
		            $this.find('span').html(data.data);
		        }else{
		            ui.alert(data.message);
		        }
		    },'json').fail(function(error){
		        ui.alert(error);
		    });
		},
		bindSlide:function(els){
			els.each(function(){
				var container = $(this).find('.slide-container');
				var items = $(this).find('.slide-item');
				var winWidth = $(window).width();
				var width = 0;
				var sx,gap,lastgap=0;
				for(var i = 0; i < items.length; i++){
					width += items.eq(i).width();
				}
				container.width(Math.ceil(width));
				var children = $(this).children();
				children.on('touchstart',function(e){
					sx = e.targetTouches[0].pageX;
				});
				children.on('touchmove',function(e){
					var mx = e.targetTouches[0].pageX;
					gap = mx-sx+lastgap;
					if(gap > 0){
						gap = 0;
					}
					if(gap < winWidth-width){
						gap = winWidth-width;
					}
					$(this).css('transform','translate3d('+gap+'px,0,0)');
				});
				children.on('touchend',function(e){
					lastgap = gap;
				});
			});
		},
		upload:function(el,url,cb){
			// el = el[0];
			var files = el.files;
			if(el.value && files.length > 0){
				if(files.length > 20){
					cb && cb.tips('最多上传10张哦');
					return false;
				}
				var formData = new FormData();
				for (var i = files.length - 1; i >= 0; i--) {
					if(files[i].size / 1024 > 5120 || !/(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)$/.test(files[i].type)){
						cb && cb.tips('上传失败，可能是图片太大，只支持png/jpg/gif格式的图片哦');
						return false;
					}
					formData.append('file'+i, files[i]);
				};
				$.ajax({
				    url: url,
				    type: 'POST',
				    dataType:'json',
				    beforeSend: cb && cb.before,
				    success: function(data){
				    	cb && cb.success(data);
				    },
				    error: cb && cb.tips,
				    complete:cb && cb.complete,
				    data: formData,
				    cache: false,
				    contentType: false,
				    processData: false
				});
			}
			var _document = $('<div></div>');
			_document.append($(el).clone());
			$(el).replaceWith(_document.html());
			_document = null;
		},
		bindEvent:function(){
			
			// var header = $('#header');
			// var nav = $('#nav');
			// var headerHeight = $('.header').height();
			// var pop = require('/ui').pop;
			// $('body').on('click','.btn-login', function(e) {
			// 	pop();
			// });

			// $(window).scroll(function(e){
			// 	var scrollTop = $('body').scrollTop() || $(document).scrollTop();
			// 	scrollTop >= headerHeight ? nav.addClass('fixed') : nav.removeClass('fixed');
			// });
			//商品数量选择
			// $('#detailOperation,#orderList').on('click', '.i-amount a', function(e) {
			// 	var num = $(this).data('amount');
			// 	var input = $(this).closest('.i-amount').find('input');
			// 	var getNum = input.val()*1 + num;
			// 	if(getNum < 1){
			// 		return false
			// 	};
			// 	input.val(getNum);
			// 	return false;
			// });
		},
	}
	return App;
});