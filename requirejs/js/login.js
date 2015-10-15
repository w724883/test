require(["zepto","../common"],function($,Common){
	var $container = $('#login');
	$container.on('tap','.J-submit',function(e){
	    Common.bindLogin($container);
	});
});