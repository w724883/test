define(["zepto"],function(e){var t=e("body"),n={pop:function(n,r){return t.addClass("open-pop"),this.html=this.html?this.html:e('<div class="pop">'+(n?n:"")+"</div>"),this.html.appendTo("body").fadeIn(300,function(){var n=e(this);n.off("tap").on("tap",function(i){if(e(i.target).is(".pop-select"))return!1;e(i.target).closest(".pop-body").length||(r&&typeof r=="function"&&r(i),n.fadeOut(400,function(){t.removeClass("open-pop"),n.remove()}))}).find(".pop-close,.pop-no,.pop-ok").off("tap").on("tap",function(i){r&&typeof r=="function"&&r(e(this).is(".pop-ok")),n.fadeOut(400,function(){t.removeClass("open-pop"),n.remove()})})})},alert:function(t,n){return this.html=e('<div class="pop"><div class="c-858484 pop-body"><div class="pop-content">'+(t?t:"")+"</div>"+'<div class="pop-btn"><a class="c-858484 pop-ok" href="javascript:;">确定</a></div>'+"</div>"+"</div>"),this.pop(t,n)},confirm:function(t,n){return this.html=e('<div class="pop"><div class="c-858484 pop-body"><div class="pop-content">'+(t?t:"")+"</div>"+'<div class="pop-btn">'+'<a class="c-858484 pop-close" href="javascript:;">取消</a>'+'<a class="c-858484 pop-ok" href="javascript:;">确定</a>'+"</div>"+"</div>"+"</div>"),this.pop(t,n)},modal:function(n){if(n)return t.addClass("open-pop"),n.fadeIn(300,function(){var n=e(this);n.on("tap",function(r){e(r.target).closest(".pop-body").length||n.fadeOut(400,function(){t.removeClass("open-pop")})}).on("tap",".pop-close",function(e){n.fadeOut(400,function(){t.removeClass("open-pop")})})}),n},destroy:function(e){this.html.trigger("tap"),e&&typeof e=="function"&&e()}};return{pop:n.pop,alert:n.alert,confirm:n.confirm,modal:n.modal,destroy:n.destroy}});