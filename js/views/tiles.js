// js/views/tiles.js

var app = app || {};

// Tiles View
// ----------

app.TileView = Backbone.View.extend({

  tagName: 'div',
  className: 'tile',

  // Template
  template: _.template( '<img src="<%= flipped ? image : overlayImage %>" alt="<%= flipped ? phrase : "Guess?" %>">' ),

  // Events
  events: {
    'click .tile img': 'revealTile'
  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    if(this.model.get('matchFound')) {
      this.$el.empty();
      this.$el.toggleClass('hidden');
    }
    return this;
  },

  revealTile: function() {
    if (app.activeTiles.length < 2) {
      this.model.set('flipped', true);
      this.$el.toggleClass('active');
      this.render();

      app.activeTiles.add(this.model); // add the model to active tiles collection

      app.totalTries = app.totalTries + 1;

      var phrase = app.activeTiles.pluck('phrase');

      if (phrase.length === 2) {
        if (phrase[0] == phrase[1]) {
          this.success();
        } else {
          this.failure();
        }
      }
    };

  },

  success: function() {
    app.activeTiles.each(function (tile) {
      tile.set('matchFound', true);
    });

    $('.message').hide().text('Match Found!').slideDown(100);
    var self = this;
    setTimeout(function() {
        $('.message').text('Removed Matching tiles!').delay(1000).fadeOut(500);
          self.finalize();
          if(app.remainingTiles === 0) {
            app.appView.gameComplete();
          }
      }, 1500);

    app.remainingTiles = app.remainingTiles - 2;
  },

  failure: function() {
    app.activeTiles.each(function (tile) {
      tile.set('flipped', false);
    });
    $('.message').text('Tiles do not match!');
    app.appView.collection.add(app.activeTiles.toArray());
    $('.message').hide().slideDown(100).delay(1000).fadeOut(500);
    var self = this;
    setTimeout(function() {
        self.finalize();
      }, 1500);
  },

  finalize: function() {
    app.appView.render();
    app.activeTiles.reset();
  }
});
