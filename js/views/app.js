// js/views/app.js

var app = app || {};

// The Application View
// --------------------

app.AppView = Backbone.View.extend({

  el: '.board',

  collection : app.Tiles,

  // Events.
  events: {

  },

  initialize: function() {
    var self = this;
    var numOfTiles = this.randomNum(6,12);
    console.log('Num of Tiles: ' + numOfTiles);

    // Get data from words.json
    $.getJSON('/game/js/test.json', function(json) {
      self.collection.drop();
      for (var i = 0; i < numOfTiles; i++) {
        self.collection.add(json.data[i]);
        self.collection.add(json.data[i]);
      };
      self.postInit();
    });

    //this.listenTo(app.Tiles, 'reset', this.render);
  },

  postInit: function() {
    this.collection.reset(this.collection.shuffle());
    this.render();
  },

  render: function() {
    _.each(this.collection.models, function(tile) {
      this.renderTile(tile);
    },this);
  },

  renderTile: function(tile) {
    var tileView = new app.TileView({
        model: tile
    });

    this.$el.append(tileView.render().el);
  },

  randomNum: function(from, to) {
    return Math.floor((Math.random()*(to - from + 1)) + from);
  }

});
