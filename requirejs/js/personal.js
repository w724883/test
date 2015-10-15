require(["zepto","serialize","ui","../common","area","lazyload"],function($,Serialize,ui,Common,Area){
    var Personal = {
        init:function(){
            this.$changePassword = $('#changePassword');
            this.$addAddress = $('#addAddress');
            this.$editAddress = $('#editAddress');
            this.$listAddress = $('#listAddress');
            this.$my = $('#my');
            this.$showMy = $('#showMy');
            this.region = $.parseJSON($('#region').html());
            this.bindEvent();
            Common.init();
            Common.bindSelect();
        },
        bindEvent:function(){
        	//设置默认地址
        	Personal.$listAddress.on('tap','.J-default',function(e){
        		if(!$(this).find('.icon-infok').length){
        			Personal.setDefaultAddress($(this).closest('.info-section'));
        		}
        		return false;
        	});
        	//删除默认地址
        	Personal.$listAddress.on('tap','.J-delete',function(e){
        		var $this = $(this);
        		ui.confirm('您确定要删除？',function(value){
        			if(value){
        				Personal.deleteAddress($this.closest('.info-section'));
        			}
        		});
        	});
            //select
            Common.bindSelect();
            //修改密码
            this.$changePassword.on('tap','.btn',function(e){
                var params = Serialize.init(Personal.$changePassword);
                Personal.changePassword(params);
            });
            //新建地址
            this.$addAddress.on('tap','.btn',function(e){
                var params = Serialize.init(Personal.$addAddress);
                Personal.createAddress(params);
            });
            //编辑地址
            this.$editAddress.on('tap','.btn',function(e){
                var params = Serialize.init(Personal.$editAddress);
                Personal.editAddress(params);
            });
            //上传头像
            this.$my.on('change', '.J-upload input[type=file]', function(e) {
                Personal.uploadFace(this);
            });
            //编辑个人资料
            this.$showMy.on('tap','.btn',function(e){
                var params = Serialize.init(Personal.$showMy);
                Personal.setShowMy(params);
            });
            // 地区联动选择
            this.region && this.selectRegion(this.region);
        },
        setDefaultAddress:function(parent){
        	var id = parent.data('id');
        	var uid = parent.data('uid');
        	$.post('/set_default_address','id='+id+'&user_id='+uid,function(data){
        		if(data.code == 200){
        			parent.siblings('.info-section').find('.icon-infok').removeClass('icon-infok');
        			parent.find('.icon-info').addClass('icon-infok');
        		}else{
        			ui.alert(data.message);
        		}
        	},'json').fail(function(error){
        		ui.alert(error);
        	});
        },
        deleteAddress:function(parent){
        	var id = parent.data('id');
        	$.post('/delete_address','id='+id,function(data){
        		parent.fadeOut('400',function(){
        			parent.remove();
        			if(data.code != 200){
        				ui.alert(data.message);
        			}
        		});
        	},'json').fail(function(error){
        		ui.alert(error);
        	});
        },
        selectRegion:function(data){
            var selectArea = new Area();
            selectArea.init({trigger:'#txt_area',value:$('#hd_area').val(),data:data,level:4,name:'region_name',callback:function(el){
            	if(el.find('.focus[ref="0"]').siblings('dd').length){
            		ui.alert('请补全所在地区');
            		$('#hd_area').val('');
            		$('#txt_area').val('');
            	}
            }});
        },
        changePassword:function(params){
        	if(params.error.length){
        	    ui.alert(params.error[0].error);
        	}else{
        	    $.post('/passwd',params.data,function(data){
        	        if(data.code == 200){
        	            window.location.href = '/login';
        	        }else if(data.code == 201){
        	            window.location.href = '/my';
        	        }else{
        	            ui.alert(data.message);
        	        }
        	    },'json').fail(function(error){
        	        ui.alert(error);
        	    });
        	}
        },
        createAddress:function(params){
        	if(params.error.length){
        	    ui.alert(params.error[0].error);
        	}else{
        	    $.post('/create_address',params.data,function(data){
        	        if(data.code == 200){
        	            window.location.href = '/address';
        	        }else{
        	            ui.alert(data.message);
        	        }
        	    },'json').fail(function(error){
        	        ui.alert(error);
        	    });
        	}
        },
        editAddress:function(params){
        	if(params.error.length){
        	    ui.alert(params.error[0].error);
        	}else{
        	    $.post('/execute_edit_address',params.data,function(data){
        	        if(data.code == 200){
        	            window.location.href = '/address';
        	        }else{
        	            ui.alert(data.message);
        	        }
        	    },'json').fail(function(error){
        	        ui.alert(error);
        	    });
        	}
        },
        uploadFace:function(that){
            Common.upload(that,'/upload_face_edit',{
                success:function(data){
                    if(data.code == 200){
                        var uploadContainer = Personal.$my.find('.J-upload');
                        if(uploadContainer.find('.icons').length){
                            uploadContainer.find('.icons').replaceWith('<img class="center" data-original='+ data.data +' />');
                        }else if(uploadContainer.find('img').length){
                            uploadContainer.find('img').replaceWith('<img class="center" data-original='+ data.data +' />');
                        }
                        uploadContainer.find('.center').center();
                    }
                },
                tips:function(error){
                    ui.alert(error);
                }
            });
        },
        setShowMy:function(params){
            if(params.error.length){
                ui.alert(params.error[0].error);
            }else{
                $.post('/edit_my',params.data,function(data){
                    if(data.code == 200){
                        window.location.href = '/address';
                    }else{
                        ui.alert(data.message);
                    }
                },'json').fail(function(error){
                    ui.alert(error);
                });
            }

        }
    }
	Personal.init();
});