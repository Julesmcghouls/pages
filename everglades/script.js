const animals = [
    { type: "croc", points: 1, image: "🐊" },
    { type: "heron", points: -1, image: "🦩" },
    { type: "turtle", points: -1, image: "🐢" },
    { type: "panther", points: -1, image: "🐆" }
];
const facts = [
    "The Everglades is the only place on Earth where alligators and crocodiles coexist!",
    "Over 350 species of birds live in the Everglades!",
    "The Everglades is home to the endangered Florida panther.",
    "The sawgrass in the Everglades can grow up to 6 feet tall!"
];

let score = 0;
let gameInterval;

document.getElementById("start-button").addEventListener("click", startGame);

function startGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    gameInterval = setInterval(spawnAnimal, 1000);
    setTimeout(endGame, 15000);
}

function spawnAnimal() {
    const holes = document.querySelectorAll(".hole .animal");
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    randomHole.innerText = randomAnimal.image;
    randomHole.dataset.type = randomAnimal.type;
    randomHole.classList.add("show");
    setTimeout(() => randomHole.classList.remove("show"), 800);
}

document.querySelectorAll(".animal").forEach(animal => {
    animal.addEventListener("click", function () {
        if (this.classList.contains("show")) {
            score += animals.find(a => a.type === this.dataset.type).points;
            document.getElementById("score").innerText = score;
            this.classList.remove("show");
        }
    });
});

function endGame() {
    clearInterval(gameInterval);
    document.getElementById("fact").innerText = facts[Math.floor(Math.random() * facts.length)];
}