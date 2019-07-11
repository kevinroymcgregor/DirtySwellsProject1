// animates addEvents-wrapper in and out
<<<<<<< HEAD
  $("#addEvent-toggle").click(function(){
    event.preventDefault();
    $("#addEvents-wrapper").slideToggle("slow");
    $("#mapDiv").slideToggle("slow");
  });






=======
$("#addEvent-toggle").click(function () {
  $("#addEvents-wrapper").slideToggle("slow");
  $("#mapDiv").slideToggle("slow");
});
>>>>>>> 9cc51e39f73fefe6480a8be87ddf73dc046c9c49

// anything after this is for materilize... DO NOT TOUCH
$(document).ready(function () {
  $('.carousel').carousel();
});

$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: false
});