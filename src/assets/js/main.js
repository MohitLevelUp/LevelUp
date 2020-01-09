
//NAVBAR RESPONSIVE======================================
$(document).ready(function() {
$(window).scroll(function(){
    if ($(this).scrollTop() > 50) {
       $('#hit-nav-wrapper').addClass('stick');
    } else {
       $('#hit-nav-wrapper').removeClass('stick');
    }
});
});


//NAV ICON & SLIDE NAV==================================
$(document).ready(function() {
	$('#nav-icon').click(function() {
		$(this).toggleClass('open');
		if ($('.nav-warp').hasClass('navi')) {
			$('.nav-warp').animate({
				right: '0px'
			}, 500).removeClass('navi');
		} else {
			$('.nav-warp').animate({
				right: -270
			}, 500).addClass('navi');
		}
	});
});

//Categories NAV==================================
$(document).ready(function() {
	$('#cate').click(function() {
	$('#sidebar-menu').toggleClass('sidebar-shwo')
        
	});
});



//SIDEBAR MENU=========================================
(function($){
$(document).ready(function(){

$('#sidebar-menu li.active').addClass('open').children('ul').show();
	$('#sidebar-menu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp(200);
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown(200);
			element.siblings('li').children('ul').slideUp(200);
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp(200);
		}
	});

});
})(jQuery);



//SEARCH ANIMATION=============================================

$(document).ready(function(){
	$(".search-icon").on('click', function(event) {
		return $(this).toggleClass('active');
	});
	});
   


//DIV BOX SHWO WHEN CHECKED=============================================

    $(document).ready(function(){
        $('#optional_form').css("display", "none");
  $('#checkbox1').change(function(){
    if($(this).is(":checked"))
    $('#optional_form').fadeIn('slow');
    else
    $('#optional_form').fadeOut('slow');

    });
  });

 

//DROP DOWN SELECT==========================


function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function () {
        var obj = this;
        obj.dd.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            opt.siblings().removeClass('selected');
            opt.filter(':contains("' + obj.val + '")').addClass('selected');
        }).change();
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
};

$(function () {
    // create new variable for each menu
    var dd1 = new DropDown($('#noble-gases'));
    // var dd2 = new DropDown($('#other-gases'));
    $(document).click(function () {
        // close menu on document click
        $('.wrap-drop').removeClass('active');
    });
});




//PROGRESS BAR ////////////////////////////////////

$(function () {
	var forEach = function (array, callback, scope) {
		for (var i = 0; i < array.length; i++) {
			callback.call(scope, i, array[i]);
		}
	};
	window.onload = function(){
		var max = -219.99078369140625;
		forEach(document.querySelectorAll('.progress'), function (index, value) {
		percent = value.getAttribute('data-progress');
			value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
			value.querySelector('.value').innerHTML = percent + '%';
		});
	}
});


//FUNCTION FOR CONTAST////////////////////////////
$(function () {
    	$('.SeeMore2').click(function(){
        $(".add_point_contest").toggle(500);
		var $this = $(this);
		$this.toggleClass('SeeMore2');
		if($this.hasClass('SeeMore2')){
			$this.text('Click to set a shared target for all participants of this contest');			
		} else {
			$this.text('Click to remove this target');
		}
	});

});


//VIDEO PLAY////////////////////////////////////

$(document).ready(function(){
	// $(document).on('click', '.ameer', function() { 
   	
 //   	var id    = $(this).closest('.video_card').find('.play-button').attr('rel');
 //   	var videoSrc    = $(this).closest('.video_card').find('.buttons').attr('link');
 //   	 $('.video_modal').attr('id',id);
 //   	 // $('.video_modal source').attr('src','./assets/video/annual-party-2018.mp4');
 //   	$('#' + id).modal('show');
 //   	$('video').trigger('play');

 //   });
   $(document).on('click', '#video_stop', function() { 
	$('video').trigger('pause');
	});

   $(document).on('click', '.quick_result_top_team', function() { 
	$(".team_high_light").toggleClass("opacity_1");
	});

});


// 	// pass the YouTube video ID into the iframe template on click/tap
// 	$('a.video-thumb').click(function () {
		
// 		// Grab the video ID from the element clicked
// 		var id = $(this).attr('data-youtube-id');

	
// 		var autoplay = '?autoplay=1';
		
// 		// Don't show the 'Related Videos' when the video ends
// 		var related_no = '&rel=0';
		
// 		// String the ID and param variables together
// 		var src = '//www.youtube.com/embed/'+id+autoplay+related_no;
		
// 		$("#youtube").attr('src', src);
// 		return false;
	
// 	});


// 	/* Modal View
// 	-------------------------------------------------------------------------------*/
// 	function toggle_video_modal() {
	    
// 	    // Open the Video Modal
// 	    $(".js-trigger-modal").on("click", function(event){
// 	        event.preventDefault();
// 	        $("body").addClass("show-video-modal");
// 	    });

// 	    // Close and Reset the Video Modal
// 	    $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {
// 	        event.preventDefault();
	        
// 	        $("body").removeClass("show-video-modal");
			
	
// 			$("#youtube").attr('src', '');
// 	    });
// 	}
// 	toggle_video_modal();

    
    
// $(".close-video-modal").click(function(){
//   $("#myVid")[0].pause();
// });
   
    
// $(".js-trigger-modal").click(function(){
//   $("#myVid")[0].play();
// });
   
    





