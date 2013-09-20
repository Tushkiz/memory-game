
// js/app.js

var app = app || {};

$(function() {

  // Start the App
  appView = new app.AppView();

  $('#play').on('click', function() {
    appView.restart();
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
