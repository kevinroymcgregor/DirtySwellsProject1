







// anything after this is for materilize... DO NOT TOUCH

$(document).ready(function(){
    $('.carousel').carousel();
  });

  var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });

  // Or with jQuery

  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
        
