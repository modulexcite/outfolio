// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'models/sharedcards', 'views/sharedcardsmall_view'], function(App, SharedCards, SharedCardSmallView) {
    var SharedCardsView;
    return SharedCardsView = (function(_super) {

      __extends(SharedCardsView, _super);

      function SharedCardsView() {
        this.showHideNoCards = __bind(this.showHideNoCards, this);

        this.addAll = __bind(this.addAll, this);

        this.addOne = __bind(this.addOne, this);
        return SharedCardsView.__super__.constructor.apply(this, arguments);
      }

      SharedCardsView.prototype.id = 'js-sharedcards';

      SharedCardsView.prototype.template = jade.templates.sharedcards;

      SharedCardsView.prototype.events = {
        'click a.js-show': 'routerFollow'
      };

      SharedCardsView.prototype.shareId = null;

      SharedCardsView.prototype.initialize = function(shareId) {
        var sharedCardsJson;
        console.debug('SharedCardsView#initialize');
        this.collection = App.sharedCards = App.sharedCards || new SharedCards();
        this.collection.on('reset', this.addAll);
        this.$el.html(this.template());
        this.$list = this.$('#js-cardslist');
        this.$noCards = this.$('#js-nocards');
        sharedCardsJson = $('#sharedcards-json').remove().text();
        if (sharedCardsJson) {
          this.shareId = shareId;
          return this.collection.reset(JSON.parse(sharedCardsJson));
        }
      };

      SharedCardsView.prototype.routerFollow = function(e) {
        return App.router.follow(e);
      };

      SharedCardsView.prototype.addOne = function(card, addMethod) {
        var el;
        console.debug('SharedCardsView#addOne', card.get('name'));
        el = new SharedCardSmallView({
          model: card
        }).render().$el;
        if (addMethod !== 'append') {
          return this.$list.prepend(el);
        } else {
          return this.$list.append(el);
        }
      };

      SharedCardsView.prototype.addAll = function() {
        var _this = this;
        console.debug('SharedCardsView#addAll');
        this.showHideNoCards();
        this.$list.children().remove();
        return this.collection.each(function(card) {
          return _this.addOne(card, 'append');
        });
      };

      SharedCardsView.prototype.showHideNoCards = function() {
        if (this.collection.length) {
          return this.$noCards.hide();
        } else {
          return this.$noCards.show();
        }
      };

      SharedCardsView.prototype.refresh = function() {
        var loader;
        console.debug('----- SharedCardsView#refresh -----');
        if (App.demo.active) {
          loader = App.notifications.newLoader();
          return this.collection.demo.fetch({
            complete: function() {
              return App.notifications.remove(loader);
            }
          });
        } else {
          this.collection.shareId = this.shareId;
          loader = App.notifications.newLoader();
          return this.collection.fetch({
            complete: function() {
              return App.notifications.remove(loader);
            }
          });
        }
      };

      SharedCardsView.prototype.index = function(shareId) {
        console.debug('SharedCardsView#index', shareId);
        if (this.shareId !== shareId) {
          this.shareId = shareId;
          this.refresh();
        }
        return this;
      };

      return SharedCardsView;

    })(Backbone.View);
  });

}).call(this);
