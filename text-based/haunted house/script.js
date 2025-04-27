const ng = new TextGameEngine();

let Start = function () {
  ng.characterDelay = 20;
  ng.setText(
    "You wake up from a dream...but cannot remember what it was about...Once you come to your senses you realize you're outside in the woods..."
  );
  ng.setImage("Images/haunted-house-woods.png");
  ng.setAudio("Music/mystic-forest-music.mp3");
  ng.setOptions([
    new GameOption("CONTINUE", () => ng.setScene(Look_For_Way_Out)),
  ]);
};

let Look_For_Way_Out = new Scene({
  text: "The woods are quiet and you feel uneasy. You see only one path out of the woods. Will you go forward or lay back down and give up?",
  options: [
    new GameOption("MOVE FORWARD", () => ng.setScene(House_Exterior)),
    new GameOption("GIVE UP", () => {
      ng.setText(
        "Wait...what? Are you sure you want to just lay back down in the cold, dark woods?"
      );
      const newOptions = [
        new GameOption("NO! I'LL GET UP!", () => ng.setScene(House_Exterior)),
        new GameOption("YES...I GIVE UP.", () => {
          ng.setText(
            "You lay back down in darkness and close your eyes...You question whether napping will solve all your problems..."
          );
          ng.setAudio("");
          ng.setOptions([new GameOption("START OVER", () => Start())]);
        }),
      ];
      ng.setOptions(newOptions);
    }),
  ],
});

let House_Exterior = new Scene({
  text: "You walk out of the woods to find a mansion before you. There's also a carriage out front... but no horse in sight though. Maybe you can find help in the mansion?",
  image: "Images/haunted-house-mansion-exterior.png",
  options: [
    new GameOption("CHECK OUT THE MANSION", () => ng.setScene(Mansion_Foyer)),
    new GameOption("NAH...I'M GOOD", () => {
      ng.setText(
        "Uhh...but there's no one else around. Going to the mansion may be your only choice."
      );
      const mansionExteriorOptions = [
        new GameOption("EXPLORE THE MANSION", () => ng.setScene(Mansion_Foyer)),
        new GameOption("GIVE UP AND CRY", () => {
          ng.setText(
            "You sit outside the mansion and begin to cry uncontrollably, while crying can be good for you your situation won't change this way."
          );
          ng.setAudio("");
          ng.setOptions([new GameOption("START OVER", () => Start())]);
        }),
      ];
      ng.setOptions(mansionExteriorOptions);
    }),
  ],
});

let Mansion_Foyer = new Scene({
  text: "You open the door to the mansion and see various paths, but no other living beings. You see a set of stairs and some hallways... Where will you go?",
  audio: "Music/mansion-foyer.mp3",
  image: "Images/haunted-house-mansion-foyer.png",
  options: [
    new GameOption("SOUND OF CRACKLING", () => ng.setScene(Mansion_Den)),
    new GameOption("SMELL OF BURNT TOAST", () => ng.setScene(Mansion_Kitchen)),
    new GameOption("DARKEST PATH", () => ng.setScene(Mansion_Library)),
  ],
});

let Mansion_Den = new Scene({
  text: "You follow the hallway on the left and end up in a den. The fireplace is running and despite the warmth of the fire a slight chill runs down your spine... Someone must've set this fire...",
  image: "Images/haunted-house-mansion-den.png",
  audio: "Music/den-fireplace.mp3",
  options: [
    new GameOption("BACK TO THE FOYER!", () => ng.setScene(Mansion_Foyer)),
    new GameOption("LOOK AROUND", () => {
      ng.setText(
        "Looking around you also notice a bookshelf, a cozy chair, and a horse painting...which will you inspect?"
      );
      const denOptions = [
        new GameOption("BOOKSHELF", () => ng.setScene(Den_Bookshelf)),
        new GameOption("CHAIR", () => ng.setScene(Den_Chair)),
        new GameOption("HORSE PAINTING", () => ng.setScene(Den_Painting)),
      ];
      ng.setOptions(denOptions);
    }),
  ],
});

let Den_Bookshelf = new Scene({
  text: "You check out the bookshelf and pull out a random cookbook...'1001 Recipes For Potatoes'. Mmm...classy, nothing beats a good potato! So, what will you do now?",
  options: [
    new GameOption("BACK TO THE FOYER", () => ng.setScene(Mansion_Foyer)),
    new GameOption("CHECK THE CHAIR", () => ng.setScene(Den_Chair)),
    new GameOption("HORSE PAINTING", () => ng.setScene(Den_Painting)),
  ],
});

let Den_Chair = new Scene({
  text: "You touch the chair making sure it's not booby trapped then carefully take a seat. You sink in, it's peaceful. But, from what you can tell nothing is happening... What now?",
  options: [
    new GameOption("FOYER", () => ng.setScene(Mansion_Foyer)),
    new GameOption("BOOKSHELF", () => ng.setScene(Den_Bookshelf)),
    new GameOption("PAINTING", () => ng.setScene(Den_Painting)),
  ],
});

let Den_Painting = new Scene({
  text: "You look around at the painting above the fireplace, it's a horse that looks a bit odd to you for some reason...",
  image: "Images/haunted-house-painting.png",
  options: [
    new GameOption("STOP EXAMINING THE PAINTING", () =>
      ng.setScene(Mansion_Den)
    ),
    new GameOption("STARE AT THE PAINTING", () => {
      ng.setText(
        "Uhh... It's very strange, but the more you stare at the horse the more you feel it almost staring back...Will you continue to stare?"
      );
      ng.setImage("Images/haunted-house-painting-blushing.png");
      const denPaintingOptions = [
        new GameOption("STOP STARING!", () => ng.setScene(Mansion_Den)),
        new GameOption("CONTINUE STARING!", () => ng.setScene(Horse_Ending)),
      ];
      ng.setOptions(denPaintingOptions);
    }),
  ],
});

let Mansion_Kitchen = new Scene({
  text: "You make your way down the hallway on the right to the smell of burnt toast and realize that you've made your way to the kitchen. What will you do?",
  image: "Images/haunted-house-mansion-kitchen.png",
  audio: "Music/kitchen-hum.mp3",
  options: [
    new GameOption("BACK TO THE FOYER", () => ng.setScene(Mansion_Foyer)),
    new GameOption("CHECK CABINETS", () => {
      ng.setText(
        "You check the cabinets and find a ton of potatoes...Mmm you're favorite!"
      );
      ng.setOptions([
        new GameOption("STOP CHECKING CABINETS", () =>
          ng.setScene(Mansion_Kitchen)
        ),
      ]);
    }),
    new GameOption("CHECK THE FRIDGE", () => {
      ng.setText(
        "You check the fridge and find a piece of burnt toast and potato based meals! Jeez not a very talented chef..."
      );
      ng.setOptions([
        new GameOption("STOP CHECKING FRIDGE", () =>
          ng.setScene(Mansion_Kitchen)
        ),
      ]);
    }),
  ],
});

let Mansion_Library = new Scene({
  text: "You make your way up the stairs and realize you've reached some sort of library! Immediately you notice something looks a little off in the flooring... Step on the unique tile?",
  image: "Images/haunted-house-library.png",
  options: [
    new GameOption("BACK TO THE FOYER", () => ng.setScene(Mansion_Foyer)),
    new GameOption("STEP ON TILE", () => {
      ng.setText(
        "The door opens up to reveal a hidden room...Would you like to check it out?"
      );
      ng.setImage("Images/haunted-house-library-hidden-room-reveal.png");
      const libraryOptions = [
        new GameOption("CHECK HIDDEN ROOM", () => ng.setScene(Hidden_Room)),
        new GameOption("NO WAY!", () => ng.setScene(Mansion_Foyer)),
      ];
      ng.setOptions(libraryOptions);
    }),
  ],
});

let Hidden_Room = new Scene({
  text: "You slowly enter then hidden passageway to reveal a hidden room...a very familiar room...and then suddenly your memories come back! THIS IS YOUR MANSION! Realization hits you all at once... Do you want to confront it?",
  image: "Images/haunted-house-hidden-room.png",
  options: [
    new GameOption("CONFRONT THE TRUTH", () => ng.setScene(Truth_Ending)),
    new GameOption("IGNORE THE TRUTH", () => ng.setScene(Ignore_Ending)),
  ],
});

let Truth_Ending = new Scene({
  text: "Your realize the truth... You came here after the town ran you out because you kept \"borrowing\" everyone's potatoes... This morning you were searching around the woods for more sweet spuds and must've slipped and hit your head...",
  audio: "Music/truth-ending.mp3",
  options: [
    new GameOption("CONTINUE", () => {
      ng.setText(
        "You feel bad for what you've done in the past; despite how much you like them potatoes aren't just yours to take...maybe you can practice a little self-control this time."
      );
      const truthOptions = [
        new GameOption("RETURN TO SOCIETY", () => {
          ng.setText(
            "With an understanding of what needs to be done you're ready to head back understanding that your love for potato based goods must be contained."
          );
          ng.setImage("Images/haunted-house-horse-ending.png");
          ng.setOptions([
            new GameOption("START OVER", () => ng.setScene(Start())),
          ]);
        }),
        new GameOption("KEEP TO YOURSELF FOREVER", () => {
          ng.setText(
            "Well...that is one option, but staying away from the rest of the world can't last forever..."
          );
          ng.setAudio("");
          ng.setOptions([
            new GameOption("START OVER", () => ng.setScene(Start())),
          ]);
        }),
      ];
      ng.setOptions(truthOptions);
    }),
  ],
});

let Ignore_Ending = new Scene({
  text: "Hey who needs the truth?! No! Not you! You're fine with whatever happened in the past staying in the past! This is your mansion and you'll make the most of it on your own...",
  audio: "Music/ignore-ending.mp3",
  options: [
    new GameOption("CONTINE", () => {
      ng.setText(
        "As you play the piano happily you can't help but wonder... is it ok to just ignore the truth? Life is full of unanswered questions, right? You don't know if this ending sits well with you, but that's that..."
      );
      ng.setOptions([new GameOption("START OVER", () => ng.setScene(Start()))]);
    }),
  ],
});

let Horse_Ending = new Scene({
  text: "Next thing you know you're in a horse drawn carriage heading along a empty road...You're unsure if this is the right way, but no matter what you've reached the end of this particular journey.",
  image: "Images/haunted-house-horse-ending.png",
  audio: "Music/horse-drawn-carriage.mp3",
  options: [new GameOption("START OVER", () => Start())],
});

Start();
ng.render();
