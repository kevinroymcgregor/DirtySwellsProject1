$(document).ready(function(){
    $('.parallax').parallax();
});


// animates addEvents-wrapper in and out
  $("#addEvent-toggle").click(function(){
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
        
