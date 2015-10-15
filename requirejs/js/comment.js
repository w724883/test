require(["zepto","../common","ui","serialize"],function($,Common,ui,Serialize){
	var Comment = {
		init:function(){
			Common.init();
			this.$comment = $('#comment');
			this.bindEvent();
		},
		bindEvent:function(){
			// 字数限制
			var $count = this.$comment.find('.comment-desc span');
			var countText = $count.text();
			this.$comment.on('input','textarea',function(e){
				var len = $(this).val().length;
				$count.text((countText - len) < 0 ? 0 : (countText - len));
			});
			// 评星
			this.$comment.on('tap','.icon-star-gray',function(e){
				$(this).addClass('icon-star-active').prevAll('.icon-star-gray').addClass('icon-star-active');
				$(this).nextAll('.icon-star-active').removeClass('icon-star-active');
				$(this).nextAll('.comment-status').html($(this).data('text'));
			});
			// 上传图片
			this.$comment.on('change', '.upload-item input[type=file]', function(e) {
				Common.upload(this,'/comment_upload_img',{
					success:function(data){
						if(data.code == 200){
							Comment.$comment.find('.comment-upload').prepend('<div class="upload-item active"><label><img data-original='+ data.data +' /></label><a href="javascript:;"></a></div>').find('img').center();
						}else{
							ui.alert(data.message);
						}
					},
					tips:function(error){
						ui.alert.alert(error);
					}
				});
			});
			//删除评论图片
			this.$comment.on('tap','.upload-item .J-delete',function(e){
				var parent = $(this).closest('.upload-item');
				ui.confirm('你要删除上传的图片吗？',function(value){
					if(typeof value == 'boolean' && value){
						$.post('/comment_img_delete','image_name='+parent.find('img').data('original'),function(data){
							if(data.code == 200){
								parent.fadeOut(300, function(){
									$(this).remove();
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
			//查看大图
			this.$comment.on('tap','.upload-item img',function(e){
				var $this = $(this);
				ui.pop('<div class="comment-preview"><img data-original='+ $(this).data('original') +' /></div>').find('img').contain();
			});
			//确认评价
			this.$comment.on('tap','.J-submit',function(e){
				var params = {};
				var inputs = Comment.$comment.find('.J-param');
				for(var i = 0; i < inputs.length; i++){
					if(inputs.eq(i).is(':visible')){
						if($.trim(inputs.eq(i).val())){
							params[inputs[i].name] = $.trim(inputs[i].value);
						}else{
							ui.alert(inputs.eq(i).data('error'));
							return false;
						}
					}else{
						params[inputs[i].name] = $.trim(inputs[i].value);
					}					
				}
				params['comment_num'] = Comment.$comment.find('.comment-star .icon-star-active').length;
				if(!params['comment_num']){
					ui.alert(Comment.$comment.find('.comment-star').data('error'));
					return false;
				}
				params['comment_image'] = Comment.$comment.find('.comment-upload img').map(function(){
					return $(this).data('original');
				}).get().join('&');
				$.post('/create_comment',params,function(data){
					if(data.code == 200){
						window.location.href = "/order?param=4";
					}else{
						ui.alert(data.message);
					}
				},'json').fail(function(error){
					ui.alert(error);
				})
			});
		}
	}
	Comment.init();
});