import {bricks, renderBricks, createBricks} from './brick.js';
import {renderBall, moveBall, createBall} from './ball.js'
import {renderPlayer, createPlayer} from './player.js'
import {checkKeyboardStatus} from './keyboard.js'
import {checkCollisions} from './collisions.js'
import {canvas, clearCanvas, resetGameScreen, showGameOver} from './canvas.js';

// Variabili per impostare il loop di gioco e lo status
let timePassedSinceLastFrame = 0;
let previousTimeStamp = 0;
let gameOver = false;
let winner = false;
let firstFrame = true;

// Funzione di inizializzazione del gioco
function init() {
	// Creo i mattoncini specificando il colore di ogni riga
	createBricks(['orange', 'teal', 'darkgreen', 'pink', 'darkcyan', 'violet']);
	// Creo il giocatore specificando la posizione sull'asse x, la posizione sull'asse y, la larghezza della racchetta e l'altezza della racchetta
	createPlayer(300,380,80,15);
	// Creo la pallina specificando la posizione sull'asse x, la posizione sull'asse y, il raggio, il colore e la velocità
	createBall(200,200,5,"red",5);
	// Ora faccio partire il loop, con due parametri: un timestamp e un booleano per indicare che stiamo iniziando un nuovo gioco
	window.requestAnimationFrame((timeSincePageLoad) => {gameLoop(timeSincePageLoad, true)});
}

function gameLoop(timeStamp, isFirstFrame) {
	// Calcolo il tempo trascorso dall'ultimo frame: userò questo intervallo di tempo per far muovere a velocità uniforme tutti gli elementi del gioco
	timePassedSinceLastFrame = (timeStamp - previousTimeStamp) / 1000;
	// Imposto il timestamp come valore da confrontare al frame successivo
	previousTimeStamp = timeStamp;
	
	// Se ho appena iniziato una nuova partita, resetto il tempo trascorso
	if(isFirstFrame) {
		timePassedSinceLastFrame = 0;
		firstFrame = false;
	}
	
	// Funzioni fondamentali del loop:
	// Aggiorno gli elementi
	update(timePassedSinceLastFrame);
	// Disegno gli elementi
	draw();
	// Controllo se ho vinto
	checkWinner(bricks);
	
	if(gameOver === false){
		// Se il gioco non è finito, chiedo un nuovo frame
		window.requestAnimationFrame((timeStamp) => {gameLoop(timeStamp)});
	} else {
		// Altrimenti mostro la schermata di game over, specificando se ho vinto oppure no
		showGameOver(winner);
	}
}

// Aggiorniamo le posizioni degli elementi
function update(timePassedSinceLastFrame) {
	// Aggiorno la posizione della pallina
	moveBall(timePassedSinceLastFrame);
	// Controllo se il giocatore sta premendo dei pulsanti
	checkKeyboardStatus(timePassedSinceLastFrame);
	// Controllo le collisioni di pallina, racchetta, etc.
	checkCollisions(canvas.canvasElement)
}

// Funzione per disegnare gli elementi sul canvas
function draw() {
	// Pulisco il canvas
	clearCanvas();
	// Disegno il giocatore
	renderPlayer(canvas.canvasContext);
	// Disegno la pallina
	renderBall(canvas.canvasContext);
	// Disegno i mattoncini
	renderBricks(canvas.canvasContext);
}

// Funzione per far ripartire il gioco
function restart(){
	// Resetto la schermata di gameover (la svuoto e la nascondo)
	resetGameScreen();
	// Imposto un nuovo gioco
	setGameOver(false);
	// Se il gioco sta per iniziare, ovviamente non ho ancora vinto!
	setWinner(false);
	// Inizializzo il gioco
	init();
}

// Controlliamo se abbiamo un vincitore
function checkWinner(){
	// Si vince quando non ci sono più mattoncini, ovvero quando l'array è vuoto
	if(bricks.length < 1) {
		// Game over
		setGameOver(true);
		// Ho vinto!
		setWinner(true);
	}
}

// Qui sotto mettiamo un po' di funzioni per recuperare info sullo stato del gioco

// Funzione per chiedere se il gioco è finito
function isGameOver() {
	return gameOver;
}

// Impostiamo il valore della proprietà gameOver
function setGameOver(val) {
	gameOver = val;
}
// Impostiamo il valore della proprietà winner
function setWinner(val) {
	winner = val;
}

export {init, setGameOver, setWinner, isGameOver, restart}