// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app'], function(App) {
    var SubnavView;
    return SubnavView = (function(_super) {

      __extends(SubnavView, _super);

      function SubnavView() {
        return SubnavView.__super__.constructor.apply(this, arguments);
      }

      SubnavView.prototype.id = 'js-subnav';

      SubnavView.prototype.currentView = null;

      SubnavView.prototype.initialize = function() {
        return console.debug('SubnavView#initialize');
      };

      SubnavView.prototype.show = function(view) {
        if (view !== this.currentView) {
          this.close();
          view.delegateEvents();
          console.debug('SubnavView#show');
          this.$el.html(view.$el);
          this.currentView = view;
        }
        return this;
      };

      SubnavView.prototype.close = function() {
        if (this.currentView) {
          console.debug('SubnavView#close');
          this.currentView.undelegateEvents();
          this.currentView.remove();
          this.currentView = null;
        }
        return this;
      };

      return SubnavView;

    })(Backbone.View);
  });

}).call(this);
