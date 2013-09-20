
// js/models/tile.js

var app = app || {};

// Tile Model
// ----------


app.Tile = Backbone.Model.extend({
  defaults: {
    phrase: '',
    image: '',
    overlayImage: 'img/default_overlay.gif',
    flipped: false,
    matchFound: false
  }
});
