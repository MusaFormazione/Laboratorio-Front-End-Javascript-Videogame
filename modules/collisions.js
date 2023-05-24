import { getBallInfo, setBallInfo } from "./ball.js";
import { getPlayerInfo, setPlayerInfo } from "./player.js";
import { getBricksInfo, removeBrick } from "./brick.js";
import { setGameOver, setWinner } from "./game.js";

/* Qui troviamo una serie di funzioni per controllare le varie tipologie di collisione: */

// Collisione tra pallina e pareti della schermata di gioco
function checkBall_BoundsCollision(canvas){
	// Recupero le informazioni sulla pallina
	let ball = getBallInfo();
	// Calcolo correttamente le zone di impatto della pallina
	let {ballLeftBound,ballRightBound,ballTopBound,ballBottomBound} = getBallBounds(ball);

	// Se tocco la parete destra o sinistra, inverto la direzione x
	if(ballLeftBound < 0 || ballRightBound > canvas.width){
		setBallInfo('xDirection', -ball.xDirection);
	}
	// Se tocco la parete superiore, inverto la direzione y
	if(ballTopBound < 0){
		setBallInfo('yDirection', -ball.yDirection);
	} 
	// Se la pallina cade...
	if(ballTopBound  > canvas.height){
		// Ho perso! Game over... 
		setGameOver(true);
		setWinner(false);
	}
}

// Collisione tra pallina e racchetta del giocatore
function checkBall_PlayerCollision(){
	// Recupero le info sulla racchetta del giocatore e sulla pallina
	let player = getPlayerInfo();
	let ball = getBallInfo();

	// Calcolo esattamente i bordi della racchetta del giocatore
	let playerLeftBound = player.xPosition;
	let playerBottomBound = player.yPosition+player.height;
	let playerRightBound = player.xPosition+player.width;
	let playerTopBound = player.yPosition;

	// Calcolo correttamente le zone di impatto della pallina
	let {ballLeftBound,ballRightBound,ballTopBound,ballBottomBound} = getBallBounds(ball);

	/* Se la pallina si trova tra il margine destro e il margine sinistro della racchetta
	e se la parte infere della pallina è entrata in collisione con la parte superiore della racchetta... */
	if(
		ballRightBound > playerLeftBound && ballLeftBound < playerRightBound && 
		ballBottomBound > playerTopBound
	){
		// Inverto la direzione (faccio rimbalzare la pallina verso l'alto)
		setBallInfo('yDirection', -ball.yDirection);
	}
}
	
// Collisione tra racchetta del giocatore e pareti della schermata di gioco
function checkPlayer_BoundsCollision(canvas){
	// Recupero le info sulla racchetta del giocatore
	let player = getPlayerInfo();
	// Se vado contro il margine sinistro della schermata
	if(player.xPosition < 0){
		// Fermo la racchetta contro la parete
		setPlayerInfo('xPosition', 0)
		setPlayerInfo('xVelocity', 0)
	}
	// Se vado contro il margine destro della schermata
	if(player.xPosition + player.width > canvas.width){
		// Fermo la racchetta contro la parete
		setPlayerInfo('xPosition', canvas.width - player.width)
		setPlayerInfo('xVelocity', 0)
	}
}

// Collisione tra pallina e mattoncini
function checkBall_BrickCollision(){
	// Recupero le info sulla pallina e sui mattoncini
	let ball = getBallInfo();
	let {bricks, brickWidth, brickHeight} = getBricksInfo();

	// Calcolo correttamente le zone di impatto della pallina
	let {ballLeftBound,ballRightBound,ballTopBound,ballBottomBound} = getBallBounds(ball);
	
	// Calcolo i bordi di ogni mattoncino
	bricks.forEach((brick, index) => {
		let brickLeftBound = brick.xPosition;
		let brickBottomBound = brick.yPosition+brickHeight;
		let brickRightBound = brick.xPosition+brickWidth;
		let brickTopBound = brick.yPosition;

		// Se c'è una collisione (ovvero se la pallina "entra" nell'area del mattoncino)
		if(
			ballRightBound > brickLeftBound && ballLeftBound < brickRightBound && 
			ballTopBound < brickBottomBound && ballBottomBound > brickTopBound
		){
			// Inverto la direzione y della pallina
			setBallInfo('yDirection', -ball.yDirection);
			// Cancello il mattone colpito (specificando la sua posizione nell'arrray per poterlo eliminare)
			removeBrick(index);
		}
	})
}

/* Siccome xPosition e yPosition rappresentano il centro della pallina, uso il raggio per calcolare esattamente i margini della pallina stessa:
questo mi aiuta ad avere un'area di impatto più accurata! */
function getBallBounds(ball) {
	return {
		ballLeftBound: ball.xPosition - ball.radius,
		ballRightBound: ball.xPosition + ball.radius,
		ballTopBound: ball.yPosition - ball.radius,
		ballBottomBound: ball.yPosition + ball.radius,
	}
}

// Prepariamo una funzione che richiama tutte le collisioni
function checkCollisions(canvas) {
	checkPlayer_BoundsCollision(canvas);
	checkBall_PlayerCollision();
	checkBall_BoundsCollision(canvas);
	checkBall_BrickCollision();
}

export {checkCollisions}