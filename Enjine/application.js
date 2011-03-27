/**
	Simple demo of the engine.
	Code by Rob Kleffner, 2011
*/

var img = new Image();
img.src = "run.png";

Enjine.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.spriteManager = null;
    this.input = null;
    this.mainSprite = null;
    this.xDirection = 1;
    this.yDirection = 1;
    this.camera = null;
}

Enjine.Application.prototype = {
    Update: function(delta) {
        
        this.spriteManager.Update(delta);
        
        this.xDirection = 0;
        this.yDirection = 0;
        
        if (this.input.IsKeyDown(Enjine.Keys.Left)) {
            this.xDirection = -1;
        }
        if (this.input.IsKeyDown(Enjine.Keys.Right)) {
            this.xDirection = 1;
        }
        if (this.input.IsKeyDown(Enjine.Keys.Up)) {
            this.yDirection = -1;
        }
        if (this.input.IsKeyDown(Enjine.Keys.Down)) {
            this.yDirection = 1;
        }
        
        this.mainSprite.X += delta * 50 * this.xDirection;
        this.mainSprite.Y += delta * 50 * this.yDirection;
        
        
        if (this.mainSprite.X >= 450) {
            this.mainSprite.X = 450;
        } else if (this.mainSprite.X <= 0) {
            this.mainSprite.X = 0;
        }

        if (this.mainSprite.Y >= 250) {
            this.mainSprite.Y = 250;
        } else if (this.mainSprite.Y <= 0) {
            this.mainSprite.Y = 0;
        }
       
        this.canvas.BeginDraw();
        
        this.spriteManager.Draw(this.canvas.BackBufferContext2D, this.camera);
        
        this.canvas.EndDraw();
    },
    
    Initialize: function() {
        this.canvas = new Enjine.GameCanvas();
        this.timer = new Enjine.GameTimer();
        this.spriteManager = new Enjine.SpriteManager();
        this.camera = new Enjine.Camera();
        this.input = new Enjine.KeyboardInput();
        this.input.Initialize();
        
        this.canvas.Initialize("canvas");
        this.timer.UpdateObject = this;
        
        //this.SetupAnimatedSprite();
        this.mainSprite = new Enjine.Sprite();
        this.mainSprite.Image = img;
        
        this.spriteManager.Add(this.mainSprite);
        
        this.timer.Start();
    },
    
    SetupAnimatedSprite: function() {
        
        this.mainSprite = new Enjine.AnimatedSprite();
        this.mainSprite.Image = img;
        this.mainSprite.SetColumnCount(12);
        this.mainSprite.SetRowCount(1);
        this.mainSprite.AddNewSequence("standing", 0, 0, 0, 0);
        this.mainSprite.AddNewSequence("running", 0, 0, 0, 11);
        this.mainSprite.PlaySequence("standing", false);
        
        this.spriteManager.Add(this.mainSprite);
    }
}

var app = new Enjine.Application();
app.Initialize();