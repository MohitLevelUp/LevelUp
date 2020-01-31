// $(document).ready(function() {
	$(document).on('click', '#menu_icon', function() { 
   // $('#menu_icon').click(function() {

      if ($('.page-sidebar').hasClass('expandit')){
          $('.page-sidebar').addClass('collapseit');
          $('.page-sidebar').removeClass('expandit');
          $('.profile-info').addClass('short-profile');
          $('.logo-area').addClass('logo-icon');
          $('.main-content').addClass('sidebar_shift');
          $('.menu-title').css("display", "none");
      } else {
        $('.page-sidebar').addClass('expandit');
        $('.page-sidebar').removeClass('collapseit');
        $('.profile-info').removeClass('short-profile');
          $('.logo-area').removeClass('logo-icon');
          $('.main-content').removeClass('sidebar_shift');
          $('.menu-title').css("display", "inline-block");
      }
// });

});

$(document).on('click', '.cta', function () {
    $(this).toggleClass('active')
})

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

$(document).on('click', '.ameer', function() { 
	
   	var id          = $(this).closest('.video_card').find('.play-button').attr('rel');
   	var videoSrc    = $(this).closest('.video_card').find('.buttons').attr('link');

   	$('.video_modal').attr('id',id);
   	$('.video_modal iframe').attr('src','https://www.youtube.com/embed/'+videoSrc + '?autoplay=1');
   	$('#' + id).modal('show');
   	$('.video_modal iframe').trigger('play');

});

$(document).on('click', '#video_stop', function() { 
	$('.video_modal iframe').attr('src','');
});

// for trophy click

$(document).on('click', '.quick_result_top_team', function() { 
  $(".team_high_light").toggleClass("opacity_1");
  });


// for live dashboard
$(document).on('click', '.cog_btn', function() { 
    $('#night_slid').toggleClass("night_slid_wrap");
});

    
$(document).on('click', '.toggle_btn', function() {         
    $('#livedashboards_body').toggleClass("body_bg");
    $('.dashboarditem').toggleClass("dashboarditem-2");
}); 
    

//BREAKING NEWS SLIDER START/////////////////////////////
$(document).on('click', '#cross', function() {

			$("#hed").hide(500);
		});





