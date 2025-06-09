// Game elements
const holes = document.querySelectorAll('.dungeon-hole');
const scoreBoard = document.querySelector('.score');
const monsters = document.querySelectorAll('.monster');
const startButton = document.querySelector('#start');
const healthBar = document.querySelector('.health-fill');
const timerDisplay = document.querySelector('.time');

// Game variables
let lastHole;
let timeUp = false;
let score = 0;
let health = 100;
let timeLeft = 60;
let gameInterval;
let monsterTypes = ['goblin', 'orc', 'skeleton'];
let currentMonsters = [];

// Sound effects
const sounds = {
    hit: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sword-cutting-flesh-2780.mp3'),
    appear: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-monster-demon-roar-11.mp3'),
    background: new Audio('https://assets.mixkit.co/music/preview/mixkit-fantasy-game-background-208.mp3')
};

// Random time between monster appearances
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Select random hole
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    
    if (hole === lastHole) {
        return randomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

// Assign random monster type
function randomMonster() {
    const type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    return type;
}

// Monster appears
function peep() {
    if (timeUp) return;
    
    const time = randomTime(500, 1500);
    const hole = randomHole(holes);
    const monsterType = randomMonster();
    const monster = hole.querySelector('.monster');
    
    monster.className = 'monster ' + monsterType;
    hole.classList.add('up');
    sounds.appear.currentTime = 0;
    sounds.appear.play();
    
    currentMonsters.push({
        hole: hole,
        timeout: setTimeout(() => {
            if (!hole.classList.contains('hit')) {
                decreaseHealth();
            }
            hole.classList.remove('up');
            currentMonsters = currentMonsters.filter(m => m.hole !== hole);
        }, time)
    });
    
    if (!timeUp) {
        setTimeout(peep, time);
    }
}

// Start the game
function startGame() {
    // Reset game state
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    health = 100;
    timeLeft = 60;
    healthBar.style.width = '100%';
    startButton.style.display = 'none';
    
    // Clear any existing monsters
    currentMonsters.forEach(monster => {
        clearTimeout(monster.timeout);
        monster.hole.classList.remove('up');
    });
    currentMonsters = [];
    
    // Start background music
    sounds.background.loop = true;
    sounds.background.volume = 0.3;
    sounds.background.play();
    
    // Start timer
    updateTimer();
    const timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    
    // Start monster appearances
    peep();
}

// Update timer display
function updateTimer() {
    timerDisplay.textContent = timeLeft;
}

// End the game
function endGame() {
    timeUp = true;
    sounds.background.pause();
    
    setTimeout(() => {
        startButton.textContent = 'Quest Again?';
        startButton.style.display = 'inline-block';
    }, 2000);
}

// Player hits a monster
function bonk(e) {
    if (!e.isTrusted || !this.parentElement.classList.contains('up')) return;
    
    // Mark as hit
    this.classList.add('hit');
    sounds.hit.currentTime = 0;
    sounds.hit.play();
    
    // Increase score
    score++;
    scoreBoard.textContent = score;
    
    // Remove monster
    setTimeout(() => {
        this.parentElement.classList.remove('up');
        this.classList.remove('hit');
    }, 300);
}

// Decrease health when monster escapes
function decreaseHealth() {
    health -= 10;
    healthBar.style.width = `${health}%`;
    
    if (health <= 0) {
        health = 0;
        endGame();
    }
}

// Event listeners
startButton.addEventListener('click', startGame);
monsters.forEach(monster => monster.addEventListener('click', bonk));

// Initialize monsters with random types
monsters.forEach(monster => {
    monster.className = 'monster ' + randomMonster();
});