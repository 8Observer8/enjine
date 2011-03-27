/**
	Simple demo of the engine.
	Code by Rob Kleffner, 2011
*/

var img = new Image();
img.src = "run.png";

Enjine.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.stateContext = null;
}

Enjine.Application.prototype = {
    Update: function(delta) {
        
        this.stateContext.Update(delta);
        
        this.canvas.BeginDraw();
        
        this.stateContext.Draw(this.canvas.BackBufferContext2D);
        
        this.canvas.EndDraw();
    },
    
    Initialize: function(defaultState) {
        this.canvas = new Enjine.GameCanvas();
        this.timer = new Enjine.GameTimer();
        Enjine.KeyboardInput.Initialize();        
        this.canvas.Initialize("canvas");
        this.timer.UpdateObject = this;
        
        this.stateContext = new Enjine.GameStateContext(defaultState);
        
        this.timer.Start();
    }
}

var app = new Enjine.Application();
app.Initialize((new Enjine.TestState()));