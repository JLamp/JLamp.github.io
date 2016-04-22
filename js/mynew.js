(function($){


$(".section1 .banner button").click(function(){

$("html, body").animate({scrollTop:$(".section9").offset().top},1000);

});
var t=true;
$(".navbar-default .navbar-toggle").click(function(){
if(t){
$(".drop2down").css("opacity",1);
$(".drop2down").css("height","auto");
 t=false;
}
else if(!t) {
$(".drop2down").css("opacity",0);
$(".drop2down").css("height",0);
t=true;
}
});

if($(window).width() < 800)
{
 	$(".section7 .left").before($(".section7 .right"));
}

	$("input[name='ccr-calc']").blur(function(){
		var text=$(this).val();
		if(text.indexOf("%")==-1 && text!='')
		{
			var theText=Math.round(parseFloat(text)*10)/10;
			$(this).val(theText+"%");
			ccr=theText/100;
		}
		else if(text.indexOf("%")!=-1)
		{
			var theText=Math.round(parseFloat(text.split("%")[0]+text.split("%")[1])*10)/10;
			$(this).val(theText+"%");
			ccr=theText/100;
		}
		
	});
	
	$("input[name='clv-calc']").blur(function(){
		var text=$(this).val();
		if(text.indexOf("$")==-1 && text!='')
		{
			$(this).val("$"+parseInt(text).toLocaleString());
		}
		else if(text.indexOf("$")!=-1)
		{
			var theText=parseInt(text.split("$")[0]+text.split("$")[1]).toLocaleString();
			$(this).val("$"+theText);
		}
	});
	$("input[name='vpm-calc']").blur(function(){
		$(this).val(parseInt($(this).val()).toLocaleString());
	});
	$("input[name='vpm-calc']").keyup(function(){
		var text=$(this).val();
		if(text!='')
		{
			vpm=parseInt(text);
			calculateThat();
		}
	});
	$("input[name='ccr-calc']").keyup(function(){
		var text=$(this).val();
		if(text!='')
		{
			ccr=parseFloat(text)/100;
			calculateThat();
		}
	});
	$("input[name='clv-calc']").keyup(function(){
		var text=$(this).val();
		if(text!='')
		{
			if(text.indexOf("$")!=-1)
			clv=parseInt(text.split("$")[1]);
			else
			clv=parseInt(text);
			calculateThat();
		}
	});
	$("input[name='vpm-calc'], input[name='ccr-calc'], input[name='clv-calc']").focusin(function(){
		$(this).val($(this).val().replace(',',''));
		$(this).removeAttr("placeholder");
	});
	var vpm=10000;
	var ccr=0.02;
	var clv=1000;
	var cb=0.5;
	
	
	
	function calculateThat()
	{
		$(".ncr").text(parseInt((ccr*(1+cb))*100).toLocaleString()+"%");
		$(".ar").text("$"+parseInt(12*ccr*clv*cb*vpm).toLocaleString());
	}
	
	$(".calcbox").keypress(function(evt){
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=46){
		return false;
		}
		
		return true;
	});
	
	$(".line-blue").draggable({ containment: ".slider", scroll: false, snap: ".line1, .line2, .line3",snapMode: "inner",stop: function( event, ui ) {
		//console.log($(".line-blue").draggable( "option", "snap" ));
		//console.log($(this));
		//console.log(ui);
                var tf=(($(".slider").width()*25)/100)+10;
		if(parseInt($(this).css("left"))>parseInt($(".line2").css("left"))-tf && parseInt($(this).css("left"))<parseInt($(".line2").css("left"))+tf)
		{
			cb=1;
			calculateThat();
			var theLeft=$(".line2").offset().left-$(".slider").offset().left;
			$(".line-blue").css("left",theLeft+"px");

		}
		else if(parseInt($(this).css("left"))<tf)
		{
			cb=0.5;
			calculateThat();
			$(".line-blue").css("left",0);
		}
		else if(parseInt($(this).css("left"))>parseInt($(".line3").css("left"))-tf)
		{
			cb=1.5;
			calculateThat();
			var theLeft=($(".line3").offset().left-$(".slider").offset().left)-$(".line-blue").width();
			$(".line-blue").css("left",theLeft+"px");
		}
	} });
	
	$(".slider").click(function(e){
		$(".line-blue").css("left",e.pageX-$(".slider").offset().left);
		var tf=(($(".slider").width()*25)/100)+10;
		if(parseInt($(".line-blue").css("left"))>parseInt($(".line2").css("left"))-tf && parseInt($(".line-blue").css("left"))<parseInt($(".line2").css("left"))+tf)
		{
			cb=1;
			calculateThat();
			var theLeft=$(".line2").offset().left-$(".slider").offset().left;
			$(".line-blue").css("left",theLeft+"px");

		}
		else if(parseInt($(".line-blue").css("left"))<tf)
		{
			cb=0.5;
			calculateThat();
			$(".line-blue").css("left",0);
		}
		else if(parseInt($(".line-blue").css("left"))>parseInt($(".line3").css("left"))-tf)
		{
			cb=1.5;
			calculateThat();
			var theLeft=($(".line3").offset().left-$(".slider").offset().left)-$(".line-blue").width();
			$(".line-blue").css("left",theLeft+"px");
		}
 	});
 	
 	$(".blackbox").hide();
 	
 	if($(window).width() < 800)
 	{
 		$(".hover-box").hide();
 	}
 	
 	$(".iicon").click(function(){
 		if($(window).width() < 800)
 		{
 			$(".blackbox").show();
 			$(".blackbox p").text($(this).find(".hover-box").text());
 			
 		}
 	});
 	
 	$(".blackbox img").click(function(){
 				$(".blackbox").hide();
 			});
 			
 	$.event.special.tap = {
    setup: function(data, namespaces) {
        var $elem = $(this);
        $elem.bind('touchstart', $.event.special.tap.handler)
             .bind('touchmove', $.event.special.tap.handler)
             .bind('touchend', $.event.special.tap.handler);
    },

    teardown: function(namespaces) {
        var $elem = $(this);
        $elem.unbind('touchstart', $.event.special.tap.handler)
             .unbind('touchmove', $.event.special.tap.handler)
             .unbind('touchend', $.event.special.tap.handler);
    },

    handler: function(event) {
        event.preventDefault();
        var $elem = $(this);
        $elem.data(event.type, 1);
        if (event.type === 'touchend' && !$elem.data('touchmove')) {
            event.type = 'tap';
            $.event.handle.apply(this, arguments);
        } else if ($elem.data('touchend')) {
            $elem.removeData('touchstart touchmove touchend');
        }
    }
};

$(".slider").mousedown(function() {
    $(".line-blue").css("left",e.pageX-$(".slider").offset().left);
		var tf=(($(".slider").width()*25)/100)+10;
		if(parseInt($(".line-blue").css("left"))>parseInt($(".line2").css("left"))-tf && parseInt($(".line-blue").css("left"))<parseInt($(".line2").css("left"))+tf)
		{
			cb=1;
			calculateThat();
			var theLeft=$(".line2").offset().left-$(".slider").offset().left;
			$(".line-blue").css("left",theLeft+"px");

		}
		else if(parseInt($(".line-blue").css("left"))<tf)
		{
			cb=0.5;
			calculateThat();
			$(".line-blue").css("left",0);
		}
		else if(parseInt($(".line-blue").css("left"))>parseInt($(".line3").css("left"))-tf)
		{
			cb=1.5;
			calculateThat();
			var theLeft=($(".line3").offset().left-$(".slider").offset().left)-$(".line-blue").width();
			$(".line-blue").css("left",theLeft+"px");
		}
});

})(jQuery);