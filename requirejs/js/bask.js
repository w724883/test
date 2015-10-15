require(['zepto','ui','../common','lazyload'],function($,ui,Common){
	var Bask = {
		init:function(){
			this.page = 0;
			Bask.getTemplete(this.page);
			Bask.bindEvent();
		},
		bindEvent:function(){
			var appraiseForm = $('#appraiseForm');
			var $appraiseImg = appraiseForm.find('.appraise-img');
			//加载晒单
			$('#moreBtn').on('click',function(e){
				$(this).text('加载中...');
		    	Bask.getTemplete(++Bask.page);
			});
			//点赞
			$('#bask').on('click','.J-praise',function(data){
				Bask.setPraise($(this));
			});
			//喜欢
			$('#bask').on('tap','.J-like',function(e){
			    Common.bindLike($(this));
			});
			//评分
			appraiseForm.on('click','.icon-star-gray',function(e){
				var star = $(this).addClass('icon-star').prevAll('.icon-star-gray').addClass('icon-star').length;
				$(this).nextAll('.icon-star-gray').removeClass('icon-star');
				appraiseForm.find('.comment-text').html($(this).data('appraise'));
				appraiseForm.find('.btn-ok').data('star',star + 1);
			});
			//删除上传
			appraiseForm.on('click','.img-del span',function(e){
				var parent = $(this).closest('.img-del');
				$.post('/delete_image','image_name='+parent.find('img').data('original'),function(data){
					if(data.code == 200){
						parent.remove();
					}else{
						ui.alert(data.message);
					}
				},'json').fail(function(error){
					ui.alert(error);
				});
			});
			//上传
			appraiseForm.on('change', 'input[type=file]', function(e) {
				Common.upload(this,'/upload_face_edit',{
					tips:function(content){
						ui.alert(content);
					},
					before:function(){
						appraiseForm.find('label').append('<i class="icons icon-btn-loading"></i>');
					},
					success:function(data){
						var html = '';
						for(var i = 0; i < data.data.length; i++){
							html += '<div class="img-del"><img class="lazy" data-original="'+data.data[i]+'" /><span><i class="icons icon-delet"></i></span></div>'
						}
						$appraiseImg.append(html).find('.lazy').lazyload({effect : 'fadeIn'});
					},
					complete:function(){
						appraiseForm.find('.icon-btn-loading').remove();
					}
				});
				// $(this).html($(this).html());
			});
			//确认评价
			appraiseForm.on('click','.btn-ok',function(e){
				var params = {};
				params.order_sn = $(this).data('ordersn');
				params.goods_id = $(this).data('goodsid');
				params.comment_num = $(this).data('star');
				params.contents = $.trim(appraiseForm.find('.appraise-textarea textarea').val());
				var images = appraiseForm.find('.appraise-img img');
				params.comment_image = [];
				for(var i = 0; i < images.length; i++){
					params.comment_image.push(images.eq(i).data('original'));
				}
				params.comment_image = params.comment_image.join('&');
				if(!params.comment_num){
					ui.alert('先对商品进行评星才能提交哦！');
					return false;
				}
				if(!params.contents){
					ui.alert('先输入评论才能提交哦！');
					return false;
				}
				if(params.contents.length > 200){
					ui.alert('评论字数小于200字才能提交哦！');
					return false;
				}
				$.post('/comment_add',params,function(data){
					data = $.parseJSON(data);
					if(data.code == 200){
						window.location.href = '/item/'+params.goods_id;
					}else{
						ui.alert(data.message);
					}
				}).fail(function(error){
					ui.alert(error);
				});
			});
		},
		baskTemplate:function(data){
			var templete = '';
			for(var i = 0; i < data.length; i++){	
				templete += '<li>'+
					'<div class="animation-translate show-item">'+
						'<a href="/item/'+data[i].goods_id+'" class="overflow show-img">'+
							'<img class="lazy nocenter animation-scale" data-original="'+data[i].comment_img+'" />'+
						'</a>'+
						'<div class="show-info">'+
							'<a href="" class="c-707070 show-desc">'+data[i].contents+'</a>'+
							'<div class="show-content">'+
								'<div class="show-head">'+
									'<a href="javascript:;"><img class="center" data-original="'+data[i].face+'" alt="'+data[i].username+'"></a>'+
								'</div>'+
								'<a href="javascript:;" class="c-889f40 show-user">'+data[i].username+'</a>'+
								'<div class="f-right J-like like data-goodsid="'+data[i].id+'" data-userid="'+data[i].user_id+'">'+
									'<i class="icons animation-scale icon-favorites"></i><span class="c-c0c0c0">'+data[i].praise+'</span>'+
								'</div>'+
							'</div>'+
						'</div>';
				if(data[i].comment_num > 4){
					templete += '<i class="icons show-flag icon-praise-good"></i>';
				}else{
					templete += '<i class="icons show-flag icon-praise-normal"></i>';
				}
				templete += '</div>'+
					'</li>';
			}
			return templete;
		},
		getTemplete:function(page){
			$.post('/get_bask','action=bask&page='+page,function(data){
				if(data.code == 200){
					data = data.data;
					if(data.length){
						var array = [];
						var container = $('#bask');
						var uls = container.find('ul');
						for(var i = 0; i < data.length; i++){
							if(!array[i%uls.length]){
								array[i%uls.length] = [];
							}
							array[i%uls.length].push(data[i]);
						};
						for(var n = 0; n < array.length; n++){
							var temp = Bask.baskTemplate(array[n]);
							var _temp = $(temp).appendTo(uls.eq(n));
							_temp.find(".lazy").lazyload({
								threshold : 200,
								effect : 'fadeIn'
						    },function(self){
					        	self.closest('li').addClass('animation');
					        });
					    	_temp.find(".center").center();
						};
					}else{
						ui.alert(data.message);
					}
				}else{
					ui.alert(data.message);
				}
			},'json').always(function(){
				$('#moreBtn').text('查看更多');
			}).fail(function(error){
				ui.alert(error);
			});
		},
		setPraise:function(el){
			var id = el.data('praise');
			$.post('/praise_z','common_id='+id,function(data){
				if(data.code == 200){
					el.find('span').text(data.data);
				}else{
					ui.alert(data.message);
				}
			},'json').fail(function(error){
				ui.alert(error);
			});
		}
	}
	Bask.init();
})