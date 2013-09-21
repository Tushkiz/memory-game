
// js/app.js

var app = app || {};

$(function() {

  // App conf
  app.tilesFlipped = 0;

  // Active Tiles Collection
  app.activeTiles = new app.Tiles(),

  // Start the App
  app.appView = new app.AppView();

  app.reset = function() {
    app.tilesFlipped = 0;
    app.activeTiles.reset();
    app.appView.restart();
  };

  $('#play').on('click', function() {
    app.reset();
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
