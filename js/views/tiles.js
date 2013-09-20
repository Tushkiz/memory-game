// js/views/tiles.js

var app = app || {};

// Tile Item View
// --------------

app.TileView = Backbone.View.extend({

  tagName: 'div',
  className: 'tile',

  // Template
  template: _.template( '<img src="<%= flipped ? image : overlayImage %>" alt="<%= phrase %>">' ),

  // Events
  events: {
    //'click .tile img': 'revealTile'
  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  },

  revealTile: function() {
    this.model.set('flipped', !this.model.get('flipped'));
    this.render();
  }
});
