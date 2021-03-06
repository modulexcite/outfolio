// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'models/cards', 'views/cardsmall_view'], function(App, Cards, CardSmallView) {
    var CardsView;
    return CardsView = (function(_super) {

      __extends(CardsView, _super);

      function CardsView() {
        this.showHideNoCards = __bind(this.showHideNoCards, this);

        this.addAll = __bind(this.addAll, this);

        this.addOne = __bind(this.addOne, this);
        return CardsView.__super__.constructor.apply(this, arguments);
      }

      CardsView.prototype.id = 'js-cards';

      CardsView.prototype.template = jade.templates.cards;

      CardsView.prototype.events = {
        'click a.js-show': 'routerFollow'
      };

      CardsView.prototype.initialize = function() {
        var cardsJson, isNew, loader;
        isNew = (!App.cards) || ((App.cards.demo != null) && !App.cards.demo.fetched);
        this.collection = App.cards = App.cards || new Cards();
        this.collection.on('reset', this.addAll);
        this.collection.on('add', this.addOne);
        this.collection.on('add', this.showHideNoCards);
        this.collection.on('remove', this.showHideNoCards);
        this.$el.html(this.template());
        this.$list = this.$('#js-cardslist');
        this.$noCards = this.$('#js-nocards');
        if (isNew) {
          if (App.demo.active) {
            loader = App.notifications.newLoader();
            return this.collection.demo.fetch({
              complete: function() {
                return App.notifications.remove(loader);
              }
            });
          } else {
            cardsJson = $('#cards-json').remove().text();
            if (cardsJson) {
              return this.collection.reset(JSON.parse(cardsJson));
            } else {
              loader = App.notifications.newLoader();
              return this.collection.fetch({
                complete: function() {
                  return App.notifications.remove(loader);
                }
              });
            }
          }
        } else {
          return this.addAll();
        }
      };

      CardsView.prototype.routerFollow = function(e) {
        return App.router.follow(e);
      };

      CardsView.prototype.addOne = function(card, addMethod) {
        var el;
        el = new CardSmallView({
          model: card
        }).render().$el;
        if (addMethod !== 'append') {
          return this.$list.prepend(el);
        } else {
          return this.$list.append(el);
        }
      };

      CardsView.prototype.addAll = function() {
        var _this = this;
        this.showHideNoCards();
        this.$list.children().remove();
        return this.collection.each(function(card) {
          return _this.addOne(card, 'append');
        });
      };

      CardsView.prototype.showHideNoCards = function() {
        if (this.collection.length) {
          return this.$noCards.hide();
        } else {
          return this.$noCards.show();
        }
      };

      CardsView.prototype.refresh = function() {
        var loader;
        if (App.demo.active) {
          loader = App.notifications.newLoader();
          return this.collection.demo.fetch({
            complete: function() {
              return App.notifications.remove(loader);
            }
          });
        } else {
          loader = App.notifications.newLoader();
          return this.collection.fetch({
            complete: function() {
              return App.notifications.remove(loader);
            }
          });
        }
      };

      return CardsView;

    })(Backbone.View);
  });

}).call(this);
