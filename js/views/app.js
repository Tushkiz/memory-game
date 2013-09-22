// js/views/app.js

var app = app || {};

// The Application View
// --------------------

app.AppView = Backbone.View.extend({

  el: '.board',

  // Tiles Collection
  collection : new app.Tiles(),

  events: {
    'click .bttn': 'restartGame'
  },

  //scores view template
  scoresTemplate: _.template('<div class="scores"> <h1>Kudos! You Won!!</h1> <h2>Score = <%= scores %>%</h2> <a class="bttn large" href="#">Play Again</a> </div>'),

  initialize: function() {

    var self = this,
        rndNum = this.randomNum(6,12);

    app.remainingTiles = app.numOfTiles = rndNum * 2;

    // Get data from words.json
    $.getJSON('/game/js/words.json', function(json) {
      for (var i = 0; i < rndNum; i++) {
        // preload images
        self.preloadImage(json.data[i].image);

        // add data into collection
        self.collection.add(json.data[i]);
        self.collection.add(json.data[i]);
      };
      self.postInit();
    });
  },

  postInit: function() {
    this.collection.reset(this.collection.shuffle());
    this.render();
  },

  render: function() {
    this.$el.empty();
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

  restartGame: function() {
    app.totalTries = 0;
    app.activeTiles.reset();
    this.collection.reset();
    $('#wrap').slideDown();
    this.initialize();
  },

  gameComplete: function() {
    this.collection.reset();
    this.render();
    $('#wrap').slideUp();
    $('.message').hide();
    var scores = Math.round((app.numOfTiles / app.totalTries) * 100);
    this.$el.append(this.scoresTemplate({scores: scores}));
  },

  randomNum: function(from, to) {
    return Math.floor((Math.random()*(to - from + 1)) + from);
  },

  preloadImage: function (url) {
    var _img = new Image();
    _img.src = url;
  }
});
