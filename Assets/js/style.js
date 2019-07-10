
// animates addEvents-wrapper in and out
  $("#addEvent-toggle").click(function(){
    event.preventDefault();
    $("#addEvents-wrapper").slideToggle("slow");
    $("#mapDiv").slideToggle("slow");
  });







// anything after this is for materilize... DO NOT TOUCH

$(document).ready(function(){
    $('.carousel').carousel();
  });


  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: false
  });
        
