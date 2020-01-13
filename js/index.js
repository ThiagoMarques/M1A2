var menu = document.querySelector('.nav__list');
var burger = document.querySelector('.burger');
var link = document.querySelector('.nav__link');
var doc = $(document);
var l = $('.scrolly');
var panel = $('.panel');
var vh = $(window).height();

var openMenu = function() {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('nav__list--active');
};
var closeMenu = function() {
  burger.classList.remove('burger--active');
  menu.classList.remove('nav__list--active');
  console.log(item);
};

// reveal content of first panel by default
panel.eq(0).find('.panel__content').addClass('panel__content--active');

var scrollFx = function() {
  var ds = doc.scrollTop();
  var of = vh / 4;
  
  // if the panel is in the viewport, reveal the content, if not, hide it.
  for (var i = 0; i < panel.length; i++) {
    if (panel.eq(i).offset().top < ds+of) {
     panel
       .eq(i)
       .find('.panel__content')
       .addClass('panel__content--active');
    } else {
      panel
        .eq(i)
        .find('.panel__content')
        .removeClass('panel__content--active')
    }
  }
};

var scrolly = function(e) {
  e.preventDefault();
  var target = this.hash;
  var $target = $(target);

  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 300, 'swing', function () {
      window.location.hash = target;
  });
}

var init = function() {
  burger.addEventListener('click', openMenu, false);
  menu.addEventListener('click', closeMenu, false);
  window.addEventListener('scroll', scrollFx, false);
  window.addEventListener('load', scrollFx, false);
  $('a[href^="#"]').on('click',scrolly);
};

doc.on('ready', init);


var current_ancor=0;
$('#current_page').html(current_ancor);


//var url= window.location.href;
var url;
var qtd_menu=0;
var tela;
$('.nav__link').each(function(index){
    url = window.location.href.split("#")[0];
    $('.progress_bar').append('<li class="nav_prog_link"></li>');
     // tela = $('.nav__link').attr('href');
     // url = url+ "tela-"+(qtd_menu+1)+".html";
     // console.log(url);
     //  $('#sections').load(url);
     //  $('#sections').attr('id','loaded'+(qtd_menu+1));
     //  $('#loaded'+(qtd_menu+1)).append('<span id="sections"></span>');
 
    qtd_menu++;
});

for (var m=1;m<=qtd_menu;m++) {
  var waypoint = new Waypoint({
  element: document.getElementById(m),
  handler: function(direction) {
    if(direction=="down"){
      current_ancor++;
      $('.nav__link').removeClass('nav__link--active');
      $("a[href=#"+current_ancor+"]").addClass('nav__link--active');
      $('#current_page').html(current_ancor);
      // console.log($('#current_page').html(current_ancor))
      progresso();
    }else{
      current_ancor--;
      $('.nav__link').removeClass('nav__link--active');
      $("a[href=#"+current_ancor+"]").addClass('nav__link--active');
      $('#current_page').html(current_ancor);
      progresso();
    }
  }
  });
}



$("body").keydown(function(e) {
    if (e.which == 38) { 
       $("a[href=#"+(current_ancor-1)+"]").click();
        progresso();
    }else if (e.which == 40) { 
       $("a[href=#"+(current_ancor+1)+"]").click();
       progresso();
    }
});

var altura_tela = $(window).height();
var altura_burger = $(".burger").height();
var qtd_blocks=0;
$('.nav__list').css('height',altura_tela);
$('.progress_bar').css('height',altura_tela);
$( ".nav_prog_link" ).each(function( index ) {
  qtd_blocks++;
});
  $('.nav_prog_link').css('height',( (altura_tela-altura_burger) /qtd_blocks));



$( "section" ).each(function( index ) {
  var total_section = index + 1;
  $('#total_page').html(total_section);
});





function reload(id){
    var image = $('#'+id).attr('src');
    $('#'+id).attr('src', image);
}


//  NOT WORKING AS WELL
var c=1;
function adjustFrame(frame){
    if(c<=6){
       setTimeout(function(){ 
       var getIframeSrc=$('#'+frame).attr('src');
       //console.log(frame);
       myIframe = $("#"+frame).attr("src",getIframeSrc+"?" + new Date().getTime());
          $(myIframe).load(function() {          
            var myDoc = (myIframe.get(0).contentDocument) ? myIframe.get(0).contentDocument : myIframe.get(0).contentWindow.document;
            myIframe.height(myDoc.body.scrollHeight+200);
          });
       }, 1000);
    
    }
   c++;
}
// ====================================

$('.nav__link').click( function (){
  $('.nav__link').removeClass('nav__link--active');
  $(this).addClass('nav__link--active');
});


function prev(){
  if(current_ancor!=1){
    $("a[href=#"+(current_ancor-1)+"]").click();  
    progresso();
  }
}

function next(){
  $("a[href=#"+(current_ancor+1)+"]").click();
  progresso();
}


function progresso(){
  $( ".nav_prog_link" ).each(function( index ) {
    var pag = index+1;
    if (pag<=current_ancor) {
        $(this).addClass('nav_prog_link--active');
    }else{
        $(this).removeClass('nav_prog_link--active');
    }
  });  
}

