/**
	Subclass that extends the regular sprite with animation capability.
	Code by Rob Kleffner, 2011
*/

Enjine.AnimationSequence = function(startRow, startColumn, endRow, endColumn) {
    this.StartRow = startRow;
    this.StartColumn = startColumn;
    this.EndRow = endRow;
    this.EndColumn = endColumn;
    
    //sometimes in an animated sprite, we want it to behave like a regular sprite (static)
    //this variable will keep it from wasting time updating animation when the sequence
    //is only a single frame long, for things like standing or pausing action
    this.SingleFrame = false;
    
    if ((this.StartRow == this.EndRow) && (this.StartColumn == this.EndColumn)) {
        this.SingleFrame = true;
    }
}

Enjine.AnimatedSprite = function() {
    this.CurrentFrameX = 0;
    this.CurrentFrameY = 0;
    this.LastElapsed = 0;
    this.FramesPerSecond = 1 / 20;
    this.FrameWidth = 0;
    this.FrameHeight = 0;
    this.CurrentSequence = null;
    this.Playing = false;
    this.Looping = false;
    this.Rows = 0;
    this.Columns = 0;
    
    //cheesy dictionary hack to make animation sequences more accessible
    this.Sequences = new Object();
}

Enjine.AnimatedSprite.prototype = new Enjine.Sprite();

Enjine.AnimatedSprite.prototype.Update = function(delta) {
    if (this.CurrentSequence.SingleFrame) {
        return;
    }
    if (!this.Playing) {
        return;
    }

    this.LastElapsed -= delta;
    
    if (this.LastElapsed > 0) {
        return;
    }
    
    this.LastElapsed = this.FramesPerSecond;
    this.CurrentFrameX += this.FrameWidth;
    
    //increment the frame
    if (this.CurrentFrameX > (this.Image.width - this.FrameWidth)) {
        this.CurrentFrameX = 0;
        this.CurrentFrameY += this.FrameHeight;
        
        if (this.CurrentFrameY > (this.Image.height - this.FrameHeight)) {
            this.CurrentFrameY = 0;
        }
    }
    
    //check if it's at the end of the animation sequence
    var seqEnd = false;
    if ((this.CurrentFrameX > (this.CurrentSequence.EndColumn * this.FrameWidth)) && (this.CurrentFrameY == (this.CurrentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    } else if (this.CurrentFrameX == 0 && (this.CurrentFrameY > (this.CurrentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    }
    
    //go back to the beginning if looping, otherwise stop playing
    if (seqEnd) {
        if (this.Looping) {
            this.CurrentFrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
            this.CurrentFrameY = this.CurrentSequence.StartRow * this.FrameHeight;
        } else {
            this.Playing = false;
        }
    }
}

Enjine.AnimatedSprite.prototype.Draw = function(context, camera) {
    context.drawImage(this.Image, this.CurrentFrameX, this.CurrentFrameY, this.FrameWidth, this.FrameHeight, this.X - camera.X, this.Y - camera.Y, this.FrameWidth, this.FrameHeight);
}

Enjine.AnimatedSprite.prototype.PlaySequence = function(seqName, loop) {
    this.Playing = true;
    this.Looping = loop;
    this.CurrentSequence = this.Sequences["seq_" + seqName];
    this.CurrentFrameX = this.CurrentSequence.StartColumn;
    this.CurrentFrameY = this.CurrentSequence.StartRow;
}

Enjine.AnimatedSprite.prototype.StopLooping = function() {
    this.Looping = false;
}

Enjine.AnimatedSprite.prototype.StopPlaying = function() {
    this.Playing = false;
}

Enjine.AnimatedSprite.prototype.SetFrameWidth = function(width) {
    this.FrameWidth = width;
    this.Rows = this.Image.width / this.FrameWidth;
}

Enjine.AnimatedSprite.prototype.SetFrameHeight = function(height) {
    this.FrameHeight = height;
    this.Columns = this.Image.height / this.FrameHeight;
}

Enjine.AnimatedSprite.prototype.SetColumnCount = function(columnCount) {
    this.FrameWidth = this.Image.width / columnCount;
    this.Columns = columnCount;
}

Enjine.AnimatedSprite.prototype.SetRowCount = function(rowCount) {
    this.FrameHeight = this.Image.height / rowCount;
    this.Rows = rowCount;
}

Enjine.AnimatedSprite.prototype.AddExistingSequence = function(name, sequence) {
    this.Sequences["seq_" + name] = sequence;
}

Enjine.AnimatedSprite.prototype.AddNewSequence = function(name, startRow, startColumn, endRow, endColumn) {
    this.Sequences["seq_" + name] = new Enjine.AnimationSequence(startRow, startColumn, endRow, endColumn);
}

Enjine.AnimatedSprite.prototype.DeleteSequence = function(name) {
    if (this.Sequences["seq_" + name]  != null) {
        delete this.Sequences["seq_" + name];
    }
}

Enjine.AnimatedSprite.prototype.ClearSequences = function() {
    delete this.Sequences;
}