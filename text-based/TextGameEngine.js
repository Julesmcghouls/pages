class TextGameEngine {
    constructor() {
      this.bodyNode = document.body;
      this.imageNode = document.getElementById("Image");
      this.textNode = document.getElementById("Text");
      this.textboxNode = document.getElementById("TextAndOptionsContainer");
      this.optionsNode = document.getElementById("Options");
      this.optionNodes = [];
      this.audioPlayerNode = document.getElementById("AudioPlayer");
      this.exitButtonNode = document.getElementById("ExitButton");
      this.exitConfirmation = document.getElementById("ExitConfirmation");
      this.exitGameNode = document.getElementById("ExitGame");
      this.closeConfirmationNode = document.getElementById("CloseConfirmation");
      this.text = "";
      this.characterDelay = 50; // TODO: Consider settings object?
      document.addEventListener('click', 
        () => {
          this.textNode.innerHTML = this.text;
        });
      this._render();
    }
  
    setText(text) {
      if (typeof text !== "string") { return console.error("Expected string passed into setText. Instead found " + typeof text) };
      this.text = text;
      this.textNode.innerHTML = "";
      this.optionsNode.style.display = 'none';
    }
    
    setImage(imageSrc) {
      this.imageNode.src = imageSrc;
    }
    
    setAudio(audioSrc) {
      if (!audioSrc) return this.audioPlayerNode.pause();
      this.audioPlayerNode.src = audioSrc;
      this.audioPlayerNode.play();
    }
    
    setOptions(options) {
      this.optionNodes.forEach((node) => this.optionsNode.removeChild(node));
      if (Array.isArray(options.length)) { return console.error("Expected array of options passed into setOptions. Instead found: " + options) };
      if (!options.length) { return console.error("Expected at least one option in array.") };
      this.optionNodes = options.map(o => {
        const btn = document.createElement('button');
        btn.innerHTML = o.text;
        btn.style.backgroundColor = o.color;
        btn.addEventListener('click', (e) => {
          e.preventDefault(); 
          e.stopPropagation();
          o.callback()
        });
        this.optionsNode.appendChild(btn);
        return btn;
      });
    }
  
    setScene({text, image, audio, options}) {
      if (text) this.setText(text);
      if (image) this.setImage(image);
      if (audio) this.setAudio(audio);
      if (options) this.setOptions([...options]);
    }
  
    setStyles(textColor, font) {
      //this.bodyNode.style.background = UIColor;
      //this.textboxNode.style.background = UIColor;
      this.textNode.style.color = textColor;
      this.textNode.style.fontFamily = font;
    }
  
    _renderExit() {
      this.exitButtonNode.onclick = function() {
        this.exitConfirmation.style.display = "block";
      }
    }
  
    _renderText() {
      // Get current text and see if any characters are missing.
      let currentText = this.textNode.innerHTML;
      const currentCharIndex = currentText.length;
  
      // When the end of the text is reached, display options.
      if (currentCharIndex >= this.text.length) {
        this.optionsNode.style.display = 'flex';
      }
      
      // Set the next character
      currentText += this.text.charAt(currentCharIndex);
      this.textNode.innerHTML = currentText;
  
      // For more natural pacing, commas and periods increase delay.
      switch(currentText.charAt(currentCharIndex)) {
        case '.':
          return this.characterDelay * 8;
        case ',':
          return this.characterDelay * 4;
        default: 
          return this.characterDelay;
      }
    }
    
    _render() {
      const timeUntilNextFrame = this._renderText();
      // Loop the render
      setTimeout(() => this._render(), timeUntilNextFrame);
    }
  }
  
  class GameOption {
    constructor(text, callback) {
      this.text = text || "";
      this.callback = callback;
    }
  }
  
  class Scene {
    constructor({ text, image, audio, options}) {
      this.text = text || "";
      this.options = options || [];
      this.image = image || '';
      this.audio = audio || '';
    }
  }
  