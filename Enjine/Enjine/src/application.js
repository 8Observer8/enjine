﻿(function() {
  /*
  	A basic wrapper to get a game engine setup.
  	Will be fine for most games.
  	Code by Rob Kleffner, 2011
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.module("Enjine", function() {
    return this.Application = (function() {
      Application.prototype.canvas = null;
      Application.prototype.timer = null;
      Application.prototype.stateContext = null;
      function Application() {
        this.initialize = __bind(this.initialize, this);
        this.update = __bind(this.update, this);
        this;
      }
      Application.prototype.update = function(delta) {
        this.stateContext.update(delta);
        this.canvas.beginDraw();
        this.stateContext.draw(this.canvas.betterBuffer);
        return this.canvas.endDraw();
      };
      Application.prototype.initialize = function(canvasId, defaultState, resWidth, resHeight) {
        this.canvas = new Enjine.GameCanvas();
        this.timer = new Enjine.GameTimer();
        Enjine.Keyboard.initialize();
        Enjine.Mouse.initialize(document.getElementById(canvasId));
        this.canvas.initialize(canvasId, resWidth, resHeight);
        this.timer.updateObject = this;
        this.stateContext = new Enjine.GameStateContext(defaultState);
        return this.timer.start();
      };
      return Application;
    })();
  });
}).call(this);
