// js/collections/tiles.js

var app = app || {};

// Tiles Collection
// -----------------------

var Tiles = Backbone.Collection.extend({
  model: app.Tile
});


app.Tiles = new Tiles();
