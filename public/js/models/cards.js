// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['models/card'], function(Card) {
    var Cards;
    return Cards = (function(_super) {

      __extends(Cards, _super);

      function Cards() {
        return Cards.__super__.constructor.apply(this, arguments);
      }

      Cards.prototype.model = Card;

      Cards.prototype.url = '/api/cards';

      return Cards;

    })(Backbone.Collection);
  });

}).call(this);
