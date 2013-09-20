
// js/app.js

var app = app || {};

$(function() {

  // Start the App

  $('#play').on('click', function() {
    new app.AppView();
  });


  /* Parallax Effect */
  var floor = Math.floor;
  if (window.screen.availWidth > 35*16) {
    $('html').on('mousemove', function(e) {
      $('body').css({
        'background-position': floor(e.pageX/-20) + 'px ' + floor(e.pageY/-20) + 'px'
      });
    });
  }
  /* --------------- */

});
